import { ROUTES } from '../shared/constants';

import type { NavigationLink } from '../shared/types';

export const PERFORMANCE_SECTION_TITLE = 'Performance';
export const PERFORMANCE_SECTION_DESCRIPTION =
  'Explore techniques to optimize change detection and rendering.';

export const PERFORMANCE_NAVIGATION_LINKS: NavigationLink[] = [
  { label: 'Using Pipe', link: ROUTES.performance.usingPipe },
];
