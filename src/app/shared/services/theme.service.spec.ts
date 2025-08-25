import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';

import { THEME_CLASS } from '../utils/theme.util';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes from saved theme and toggles class', () => {
    localStorage.setItem('theme', 'dark');
    const service = TestBed.inject(ThemeService);
    const doc = TestBed.inject(DOCUMENT);

    expect(service.isDark()).toBe(true);
    expect(doc.body.classList.contains(THEME_CLASS)).toBe(true);

    service.toggle();
    expect(service.isDark()).toBe(false);
    expect(doc.body.classList.contains(THEME_CLASS)).toBe(false);
  });
});
