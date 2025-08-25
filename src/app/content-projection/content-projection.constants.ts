import { ROUTES } from '../shared/constants';

import type { NavigationLink } from '../shared/types';

export const CONTENT_PROJECTION_SECTION_TITLE = 'Content Projection';
export const CONTENT_PROJECTION_SECTION_DESCRIPTION =
  'Pass templates from parent to child to improve reusability.';

export const CONTENT_PROJECTION_NAVIGATION_LINKS: NavigationLink[] = [
  {
    label: 'Medium Reference link',
    link: ROUTES.contentProjection.mediumUrl,
    external: true,
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  { label: 'Template projection to child', link: ROUTES.contentProjection.templateProjection },
];
