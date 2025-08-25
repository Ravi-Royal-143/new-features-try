export type Theme = 'light' | 'dark';

export const THEME_CLASS = 'theme-dark';
const STORAGE_KEY = 'theme';

export function readSavedTheme(): Theme | null {
  const v = localStorage.getItem(STORAGE_KEY);
  return v === 'light' || v === 'dark' ? v : null;
}

export function applyTheme(doc: Document, isDark: boolean): void {
  const body = doc.body;
  body.classList.toggle(THEME_CLASS, isDark);
  localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
}

export function toggleTheme(doc: Document): boolean {
  const body = doc.body;
  const next = !body.classList.contains(THEME_CLASS);
  applyTheme(doc, next);
  return next;
}
