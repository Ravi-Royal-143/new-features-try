import { HttpClient } from '@angular/common/http';
import { Injectable, signal, computed, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { APP_CONFIG } from '../shared/config/app-config';

import { STOCK_CONSTANTS } from './stock.constants';
import { ChartData, MetalRate, StockData, ChartPeriod } from './stock.types';

@Injectable({
  providedIn: 'root',
})
export class StockService implements OnDestroy {
  private readonly metalRatesSubject = new BehaviorSubject<MetalRate | null>(null);
  private readonly stockDataSubject = new BehaviorSubject<StockData | null>(null);
  private readonly chartDataSubject = new BehaviorSubject<ChartData[]>([]);
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  private readonly errorSubject = new BehaviorSubject<string | null>(null);

  // Signals for reactive state management
  readonly metalRates = signal<MetalRate | null>(null);
  readonly stockData = signal<StockData | null>(null);
  readonly chartData = signal<ChartData[]>([]);
  readonly isLoading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  readonly hasData = computed(() => this.stockData() !== null);
  readonly hasError = computed(() => this.error() !== null);

  private metalsInterval?: ReturnType<typeof setInterval>;
  private stockInterval?: ReturnType<typeof setInterval>;
  private lastSymbol: string | null = null;
  private lastPeriod: string = STOCK_CONSTANTS.chart.defaultPeriod;

  constructor(private readonly httpClient: HttpClient) {
    // Subscribe to subjects and update signals
    this.metalRatesSubject.subscribe((rates) => {
      this.metalRates.set(rates);
    });
    this.stockDataSubject.subscribe((data) => {
      this.stockData.set(data);
    });
    this.chartDataSubject.subscribe((data) => {
      this.chartData.set(data);
    });
    this.loadingSubject.subscribe((loading) => {
      this.isLoading.set(loading);
    });
    this.errorSubject.subscribe((error) => {
      this.error.set(error);
    });

    // Load initial metal rates and start polling
    this.loadMetalRates();
    this.startMetalsPolling();
  }

  ngOnDestroy(): void {
    if (this.metalsInterval) clearInterval(this.metalsInterval);
    if (this.stockInterval) clearInterval(this.stockInterval);
  }

  loadMetalRates(): void {
    this.setLoading(true);
    this.clearError();

    const useRealApi = Boolean(APP_CONFIG.metalsApiKey);

    if (useRealApi) {
      // Example endpoint (documented at metals-api.com). Adjust if your API differs.
      // We'll request in USD and convert to INR per gram.
      type MetalsResponse = {
        rates?: Record<string, number>;
        conversion_rates?: Record<string, number>;
      };
      const url = `https://metals-api.com/api/latest?access_key=${APP_CONFIG.metalsApiKey}&base=USD&symbols=XAU,XAG`;
      this.httpClient.get<unknown>(url).subscribe({
        next: (respUnknown) => {
          try {
            const resp = respUnknown as MetalsResponse;
            const ratesRec = resp.rates ?? {};
            const xau = ratesRec['XAU'];
            const xag = ratesRec['XAG'];
            if (typeof xau !== 'number' || typeof xag !== 'number')
              throw new Error('Invalid metals API response');

            const conv = (resp.conversion_rates ?? {})['INR'];
            const usdToInr = typeof conv === 'number' ? conv : STOCK_CONSTANTS.api.usdToInrFallback;

            const perGramINR = (usdPerOunce: number) =>
              (usdPerOunce * usdToInr) / STOCK_CONSTANTS.api.ouncesToGrams;

            const rates: MetalRate = {
              gold: perGramINR(xau),
              silver: perGramINR(xag),
              timestamp: new Date(),
              currency: 'INR',
            };
            this.metalRatesSubject.next(rates);
          } catch {
            this.setError(STOCK_CONSTANTS.errors.parseMetalRates);
          } finally {
            this.setLoading(false);
          }
        },
        error: () => {
          this.setError(STOCK_CONSTANTS.errors.loadMetalRates);
          this.setLoading(false);
        },
      });
    } else {
      // Mock API fallback in INR per gram
      const mockRates: MetalRate = {
        gold: 6_200 + Math.random() * 50, // approx ₹/g
        silver: 75 + Math.random() * 2, // approx ₹/g
        timestamp: new Date(),
        currency: 'INR',
      };
      setTimeout(() => {
        this.metalRatesSubject.next(mockRates);
        this.setLoading(false);
      }, 400);
    }
  }

  searchStock(symbol: string): void {
    if (!symbol.trim()) {
      this.setError(STOCK_CONSTANTS.messages.searchRequired);
      return;
    }

    this.setLoading(true);
    this.clearError();

    this.lastSymbol = symbol.toUpperCase();

    const useRealApi = Boolean(APP_CONFIG.alphaVantageApiKey);
    if (useRealApi) {
      // Alpha Vantage demo: TIME_SERIES_INTRADAY for near-real-time (free tier is limited/minutely)
      const mapped = this.mapToGlobalSymbol(this.lastSymbol);
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${mapped}&interval=30min&apikey=${APP_CONFIG.alphaVantageApiKey}`;
      this.httpClient.get<unknown>(url).subscribe({
        next: (respUnknown) => {
          try {
            if (typeof respUnknown !== 'object' || respUnknown === null) throw new Error('Invalid');
            const meta = (respUnknown as Record<string, unknown>)['Meta Data'];
            const series = (respUnknown as Record<string, unknown>)['Time Series (30min)'];
            if (!meta || !series || typeof series !== 'object') throw new Error('Invalid series');
            const keys = Object.keys(series as Record<string, unknown>);
            const latestKey = keys[0];
            const latest = (series as Record<string, unknown>)[latestKey];
            if (typeof latest !== 'object' || latest === null)
              throw new Error('Invalid latest point');
            const latestRec = latest as Record<string, string>;
            const priceUSD = parseFloat(latestRec['4. close']);
            const openUSD = parseFloat(latestRec['1. open']);
            if (!isFinite(priceUSD) || !isFinite(openUSD)) throw new Error('Invalid numbers');
            const inr = this.usdToInr(priceUSD);
            const change = this.usdToInr(priceUSD - openUSD);
            const changePercent = ((priceUSD - openUSD) / openUSD) * 100;

            const currentSymbol = this.lastSymbol ?? symbol;
            const data: StockData = {
              symbol: currentSymbol,
              name: this.getCompanyName(currentSymbol),
              price: inr,
              change,
              changePercent,
              timestamp: new Date(latestKey),
            };
            this.stockDataSubject.next(data);
            this.loadChartData(currentSymbol, this.lastPeriod);
            this.startStockPolling();
          } catch {
            this.setError('Unable to parse stock data');
          } finally {
            this.setLoading(false);
          }
        },
        error: () => {
          this.setError('Unable to load stock data');
          this.setLoading(false);
        },
      });
    } else {
      // Free source attempt: Yahoo Finance (no key). Subject to CORS by the browser.
      // If blocked, we fall back to mock values.
      const yahooSymbol = this.mapToYahooSymbol(this.lastSymbol);
      const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(yahooSymbol)}`;
      this.httpClient.get<unknown>(url).subscribe({
        next: (respUnknown) => {
          try {
            const qResp = (
              respUnknown as { ['quoteResponse']?: { ['result']?: Array<Record<string, unknown>> } }
            )['quoteResponse'];
            const resultArr = qResp?.['result'];
            if (!Array.isArray(resultArr) || resultArr.length === 0)
              throw new Error('Invalid quote');
            const q = resultArr[0];
            const price = Number(q['regularMarketPrice']);
            const change = Number(q['regularMarketChange']);
            const changePercent = Number(q['regularMarketChangePercent']);
            const timeSec = Number(q['regularMarketTime']);
            if (!isFinite(price)) throw new Error('Invalid price');

            const currentSymbol = this.lastSymbol || symbol;
            const data: StockData = {
              symbol: currentSymbol,
              name: (q['longName'] as string) || this.getCompanyName(currentSymbol),
              price,
              change: isFinite(change) ? change : 0,
              changePercent: isFinite(changePercent) ? changePercent : 0,
              timestamp: isFinite(timeSec) ? new Date(timeSec * 1000) : new Date(),
            };
            this.stockDataSubject.next(data);
            this.loadChartData(currentSymbol, this.lastPeriod);
            this.setLoading(false);
            this.startStockPolling();
          } catch {
            this.applyMockStock(symbol);
          }
        },
        error: () => {
          this.applyMockStock(symbol);
        },
      });
    }
  }

  loadChartData(symbol: string, period: string): void {
    this.lastPeriod = period;
    const useRealApi = Boolean(APP_CONFIG.alphaVantageApiKey);
    if (useRealApi) {
      const mapped = this.mapToGlobalSymbol(symbol.toUpperCase());
      // Use DAILY/INTRADAY based on period
      const isIntraday = period === '1D';
      const func = isIntraday ? 'TIME_SERIES_INTRADAY' : 'TIME_SERIES_DAILY';
      const extra = isIntraday ? '&interval=30min' : '';
      const url = `https://www.alphavantage.co/query?function=${func}&symbol=${mapped}${extra}&apikey=${APP_CONFIG.alphaVantageApiKey}`;
      this.httpClient.get<unknown>(url).subscribe({
        next: (respUnknown) => {
          try {
            if (typeof respUnknown !== 'object' || respUnknown === null) throw new Error('Invalid');
            const key = isIntraday ? 'Time Series (30min)' : 'Time Series (Daily)';
            const series = (respUnknown as Record<string, unknown>)[key];
            if (!series || typeof series !== 'object') throw new Error('Invalid chart series');
            const seriesRec = series as Record<string, Record<string, string>>;
            const points = Object.keys(seriesRec)
              .slice(0, this.getDataPointsForPeriod(period as ChartPeriod))
              .map((dateKey) => {
                const value = seriesRec[dateKey];
                const open = this.usdToInr(parseFloat(value['1. open']));
                const high = this.usdToInr(parseFloat(value['2. high']));
                const low = this.usdToInr(parseFloat(value['3. low']));
                const close = this.usdToInr(parseFloat(value['4. close']));
                const volume = parseFloat(value['5. volume']);
                const item: ChartData = {
                  timestamp: new Date(dateKey),
                  open,
                  high,
                  low,
                  close,
                  volume,
                };
                return item;
              })
              .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
            this.chartDataSubject.next(points);
          } catch {
            this.setError('Unable to parse chart data');
          }
        },
        error: () => {
          this.setError('Unable to load chart data');
        },
      });
    } else {
      // Yahoo Finance chart (no key), else fallback to mock
      const yahooSymbol = this.mapToYahooSymbol(symbol);
      const { yfPeriod, yfInterval } = this.mapChartPeriod(period);
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(yahooSymbol)}?range=${yfPeriod}&interval=${yfInterval}`;
      this.httpClient.get<unknown>(url).subscribe({
        next: (respUnknown) => {
          try {
            const chart = (respUnknown as { ['chart']?: { ['result']?: unknown[] } })['chart'];
            const resultUnknown = chart?.['result']?.[0];
            if (!this.isRecord(resultUnknown)) throw new Error('Invalid chart result');
            const result = resultUnknown;
            const tsUnknown: unknown = result['timestamp'];
            const timestamps: number[] = Array.isArray(tsUnknown)
              ? tsUnknown
                  .map((timestampValue) => Number(timestampValue))
                  .filter((num) => Number.isFinite(num))
              : [];
            const indicatorsUnknown: unknown = result['indicators'];
            if (!this.isRecord(indicatorsUnknown)) throw new Error('Invalid indicators');
            const indicatorsRec: Record<string, unknown> = { ...(indicatorsUnknown as object) };
            const quoteArrUnknown = indicatorsRec['quote'];
            if (!Array.isArray(quoteArrUnknown) || !this.isRecord(quoteArrUnknown[0]))
              throw new Error('Invalid quote');
            const quote = quoteArrUnknown[0];
            const opens = Array.isArray(quote['open'])
              ? (quote['open'] as unknown[]).map(Number)
              : [];
            const highs = Array.isArray(quote['high'])
              ? (quote['high'] as unknown[]).map(Number)
              : [];
            const lows = Array.isArray(quote['low']) ? (quote['low'] as unknown[]).map(Number) : [];
            const closes = Array.isArray(quote['close'])
              ? (quote['close'] as unknown[]).map(Number)
              : [];
            const volumes = Array.isArray(quote['volume'])
              ? (quote['volume'] as unknown[]).map(Number)
              : [];
            const N = Math.min(
              timestamps.length,
              opens.length,
              highs.length,
              lows.length,
              closes.length,
            );
            const points: ChartData[] = [];
            for (
              let index = Math.max(0, N - this.getDataPointsForPeriod(period as ChartPeriod));
              index < N;
              index++
            ) {
              const timestamp = timestamps[index];
              const open = Number(opens[index]);
              const high = Number(highs[index]);
              const low = Number(lows[index]);
              const close = Number(closes[index]);
              const volume = Number(volumes[index] ?? 0);
              if ([open, high, low, close].every(isFinite)) {
                points.push({
                  timestamp: new Date(timestamp * 1000),
                  open,
                  high,
                  low,
                  close,
                  volume: isFinite(volume) ? volume : 0,
                });
              }
            }
            if (points.length) {
              this.chartDataSubject.next(points);
            } else {
              this.chartDataSubject.next(this.generateMockChartData(period));
            }
          } catch {
            this.chartDataSubject.next(this.generateMockChartData(period));
          }
        },
        error: () => {
          this.chartDataSubject.next(this.generateMockChartData(period));
        },
      });
    }
  }

  private generateMockChartData(period: string): ChartData[] {
    const dataPoints = this.getDataPointsForPeriod(period as ChartPeriod);
    const basePrice =
      Math.random() * STOCK_CONSTANTS.api.mockPriceRange.max +
      STOCK_CONSTANTS.api.mockPriceRange.min;
    const data: ChartData[] = [];

    for (let index = 0; index < dataPoints; index++) {
      const timestamp = this.getTimestampForPeriod(period, index);
      const variance = (Math.random() - 0.5) * STOCK_CONSTANTS.api.mockVariance;
      const open = basePrice + variance;
      const high = open + Math.random() * STOCK_CONSTANTS.api.mockPriceSpread;
      const low = open - Math.random() * STOCK_CONSTANTS.api.mockPriceSpread;
      const close = low + Math.random() * (high - low);
      const volume =
        Math.floor(Math.random() * STOCK_CONSTANTS.api.mockVolumeRange.max) +
        STOCK_CONSTANTS.api.mockVolumeRange.min;

      data.push({
        timestamp,
        open,
        high,
        low,
        close,
        volume,
      });
    }

    return data;
  }

  private getDataPointsForPeriod(period: ChartPeriod): number {
    return STOCK_CONSTANTS.chart.dataPoints[period];
  }

  private getTimestampForPeriod(period: string, index: number): Date {
    const now = new Date();
    const millisecondsPerDay = 24 * 60 * 60 * 1000;

    switch (period) {
      case '1D':
        return new Date(now.getTime() - (23 - index) * 60 * 60 * 1000);
      case '1W':
        return new Date(now.getTime() - (6 - index) * millisecondsPerDay);
      case '1M':
        return new Date(now.getTime() - (29 - index) * millisecondsPerDay);
      case '3M':
        return new Date(now.getTime() - (89 - index) * millisecondsPerDay);
      case '1Y':
        return new Date(now.getTime() - (364 - index) * millisecondsPerDay);
      case '5Y':
        return new Date(now.getTime() - (1824 - index) * millisecondsPerDay);
      default:
        return new Date(now.getTime() - (29 - index) * millisecondsPerDay);
    }
  }

  private getCompanyName(symbol: string): string {
    const upperSymbol = symbol.toUpperCase();
    if (upperSymbol in STOCK_CONSTANTS.companies) {
      return STOCK_CONSTANTS.companies[upperSymbol as keyof typeof STOCK_CONSTANTS.companies];
    }
    return `${upperSymbol} Corp`;
  }

  private startMetalsPolling(): void {
    if (this.metalsInterval) clearInterval(this.metalsInterval);
    this.metalsInterval = setInterval(() => {
      this.loadMetalRates();
    }, STOCK_CONSTANTS.realtime.refreshMs);
  }

  private startStockPolling(): void {
    if (this.stockInterval) clearInterval(this.stockInterval);
    if (!this.lastSymbol) return;
    this.stockInterval = setInterval(() => {
      // Refresh current stock price and chart
      const symbol = this.lastSymbol ?? '';
      const useRealApi = Boolean(APP_CONFIG.alphaVantageApiKey);
      if (useRealApi) {
        // re-run latest search quickly (will also refresh chart)
        if (symbol) {
          this.searchStock(symbol);
        }
      } else {
        // mock refresh
        const current = this.stockDataSubject.value;
        if (current) {
          const delta = (Math.random() - 0.5) * 20;
          const updated: StockData = {
            ...current,
            price: current.price + delta,
            change: delta,
            changePercent: (delta / Math.max(1, current.price)) * 100,
            timestamp: new Date(),
          };
          this.stockDataSubject.next(updated);
          this.loadChartData(symbol, this.lastPeriod);
        }
      }
    }, STOCK_CONSTANTS.realtime.refreshMs);
  }

  private usdToInr(usd: number): number {
    // For demo, approximate if real FX not fetched
    const approx = STOCK_CONSTANTS.api.usdToInrFallback;
    return usd * approx;
  }

  private mapToGlobalSymbol(symbol: string): string {
    // Map common Indian tickers to a global-friendly symbol for demo.
    // For AlphaVantage, Indian stocks often need the exchange suffix.
    const upper = symbol.toUpperCase();
    if (upper in STOCK_CONSTANTS.symbolMappings.global) {
      return STOCK_CONSTANTS.symbolMappings.global[
        upper as keyof typeof STOCK_CONSTANTS.symbolMappings.global
      ];
    }
    return upper;
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }

  private mapToYahooSymbol(symbol: string | null): string {
    const upper = (symbol ?? '').toUpperCase();
    if (upper in STOCK_CONSTANTS.symbolMappings.yahoo) {
      return STOCK_CONSTANTS.symbolMappings.yahoo[
        upper as keyof typeof STOCK_CONSTANTS.symbolMappings.yahoo
      ];
    }
    return `${upper}.NS`;
  }

  private mapChartPeriod(period: string): { yfPeriod: string; yfInterval: string } {
    // Map our periods to Yahoo Finance ranges and intervals
    if (period in STOCK_CONSTANTS.chartMappings) {
      return STOCK_CONSTANTS.chartMappings[period as keyof typeof STOCK_CONSTANTS.chartMappings];
    }
    return { yfPeriod: '1mo', yfInterval: '1d' };
  }

  private applyMockStock(symbol: string): void {
    // Mock INR stock data fallback
    const base =
      STOCK_CONSTANTS.api.mockPriceRange.min +
      Math.random() *
        (STOCK_CONSTANTS.api.mockPriceRange.max - STOCK_CONSTANTS.api.mockPriceRange.min);
    const delta = (Math.random() - 0.5) * STOCK_CONSTANTS.api.mockPriceRange.variance;
    const currentSymbol = this.lastSymbol || symbol;
    const mockStockData: StockData = {
      symbol: currentSymbol,
      name: this.getCompanyName(currentSymbol),
      price: base + delta,
      change: delta,
      changePercent: (delta / base) * 100,
      timestamp: new Date(),
    };
    this.stockDataSubject.next(mockStockData);
    this.loadChartData(currentSymbol, this.lastPeriod);
    this.setLoading(false);
    this.startStockPolling();
  }

  private setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }

  private setError(error: string): void {
    this.errorSubject.next(error);
  }

  private clearError(): void {
    this.errorSubject.next(null);
  }
}
