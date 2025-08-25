import { ROUTES } from '../shared/constants';

import type { NavigationLink } from '../shared/types';

export const SIGNAL_SECTION_TITLE = 'Signals';
export const SIGNAL_SECTION_DESCRIPTION = 'Try the new reactivity primitives in Angular.';

export const SIGNAL_NAVIGATION_LINKS: NavigationLink[] = [
  { label: 'Basic Signal', link: ROUTES.signal.basic },
  { label: 'Signal Observable', link: ROUTES.signal.observable },
  { label: 'Linked Signal', link: ROUTES.signal.linked },
];
