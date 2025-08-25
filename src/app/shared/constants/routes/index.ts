import { CONTENT_PROJECTION_ROUTES_DEF } from '../../../content-projection/content-projection.route.constants';
import { FORMS_ROUTES_DEF } from '../../../forms/forms.route.constants';
import { MATERIAL_ROUTES } from '../../../material/material.route.constants';
import { PERFORMANCE_ROUTES_DEF } from '../../../performance/performance.route.constants';
import { ROUTING_DETAILS_ROUTES_DEF } from '../../../routing-details/routing-details.route.constants';
import { RXJS_ROUTES_DEF } from '../../../rxjs/rxjs.route.constants';
import { SIGNAL_ROUTES_DEF } from '../../../signal/signal.route.constants';

import { ROOT_ROUTES } from './root.routes';

export {
  ROOT_ROUTES,
  MATERIAL_ROUTES,
  RXJS_ROUTES_DEF,
  FORMS_ROUTES_DEF,
  PERFORMANCE_ROUTES_DEF,
  SIGNAL_ROUTES_DEF,
  CONTENT_PROJECTION_ROUTES_DEF,
  ROUTING_DETAILS_ROUTES_DEF,
};

export const ROUTES = {
  root: ROOT_ROUTES,
  material: MATERIAL_ROUTES,
  rxjs: RXJS_ROUTES_DEF,
  forms: FORMS_ROUTES_DEF,
  performance: PERFORMANCE_ROUTES_DEF,
  signal: SIGNAL_ROUTES_DEF,
  contentProjection: CONTENT_PROJECTION_ROUTES_DEF,
  routingDetails: ROUTING_DETAILS_ROUTES_DEF,
} as const;

export type AppRoutes = typeof ROUTES;
