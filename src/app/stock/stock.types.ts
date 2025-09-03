export interface MetalRate {
  gold: number;
  silver: number;
  timestamp: Date;
  currency: string;
}

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  timestamp: Date;
}

export interface ChartData {
  timestamp: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type ChartPeriod = '1D' | '1W' | '1M' | '3M' | '1Y' | '5Y';

export interface MetalsApiResponse {
  rates?: Record<string, number>;
  conversion_rates?: Record<string, number>;
}

export interface AlphaVantageResponse {
  'Meta Data'?: Record<string, unknown>;
  'Time Series (30min)'?: Record<string, Record<string, string>>;
  'Time Series (Daily)'?: Record<string, Record<string, string>>;
}

export interface YahooQuoteResponse {
  quoteResponse?: {
    result?: Array<Record<string, unknown>>;
  };
}

export interface YahooChartResponse {
  chart?: {
    result?: Array<{
      timestamp?: number[];
      indicators?: {
        quote?: Array<{
          open?: unknown[];
          high?: unknown[];
          low?: unknown[];
          close?: unknown[];
          volume?: unknown[];
        }>;
      };
    }>;
  };
}
