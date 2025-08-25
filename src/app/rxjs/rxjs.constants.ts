import { ROUTES } from '../shared/constants';

import type { NavigationLink } from '../shared/types';

export const RXJS_SECTION_TITLE = 'RxJS';
export const RXJS_SECTION_DESCRIPTION = 'Reactive programming demos and operators.';

export const RXJS_NAVIGATION_LINKS: NavigationLink[] = [{ label: 'Maps', link: ROUTES.rxjs.maps }];
