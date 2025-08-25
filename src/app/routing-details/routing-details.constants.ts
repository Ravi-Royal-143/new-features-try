import { ROUTES } from '../shared/constants';

import type { NavigationLink } from '../shared/types';

export const ROUTING_DETAILS_SECTION_TITLE = 'Routing Details';
export const ROUTING_DETAILS_SECTION_DESCRIPTION =
  'Learn about query params and same-route handling.';

export const ROUTING_DETAILS_NAVIGATION_LINKS: NavigationLink[] = [
  { label: 'Same Route', link: ROUTES.routingDetails.sameRoute },
];
