import { ROUTES } from '../shared/constants';

import type { NavigationLink } from '../shared/types';

export const ROUTE_LINK_SECTION_TITLE = 'All routes';
export const ROUTE_LINK_SECTION_DESCRIPTION =
  'Explore the sections below to try different Angular features.';

export const ROUTE_LINK_NAVIGATION_LINKS: NavigationLink[] = [
  { label: 'Forms', link: '/' + ROUTES.root.forms },
  { label: 'RxJS', link: '/' + ROUTES.root.rxjs },
  { label: 'Material', link: '/' + ROUTES.root.material },
  { label: 'Content Projection', link: '/' + ROUTES.root.contentProjection },
  { label: 'Routing Details', link: '/' + ROUTES.root.routingDetails },
  { label: 'Performance', link: '/' + ROUTES.root.performance },
  { label: 'Signals', link: '/' + ROUTES.root.signal },
];
