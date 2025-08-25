import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, signal } from '@angular/core';

import { THEME_CLASS, readSavedTheme, toggleTheme as toggle } from '../utils';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly isDark = signal(false);

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
    const saved = readSavedTheme();
    if (saved === 'dark') {
      this.document.body.classList.add(THEME_CLASS);
      this.isDark.set(true);
    }
  }

  toggle() {
    const newValue = toggle(this.document);
    this.isDark.set(newValue);
  }
}
