import { APP_TITLE } from './app-title';
import { NAV_TEXT } from './nav';

export const UI_TEXT = {
  appTitle: APP_TITLE,
  nav: NAV_TEXT,
} as const;

export type UIText = typeof UI_TEXT;

// Re-exports (optional convenience)
export { APP_TITLE } from './app-title';
export { NAV_TEXT } from './nav';
