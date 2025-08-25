import { Routes } from '@angular/router';

import { ROUTES as ROUTE } from '../shared/constants';

import { isComp1 } from './same-route/same.route';

export const ROUTING_SECTION: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./routing-details.component').then((c) => c.RoutingDetailsComponent),
    pathMatch: 'full',
  },
  {
    path: ROUTE.routingDetails.sameRoute,
    loadComponent: () =>
      import('./same-route/same-route.component').then((c) => c.SameRouteComponent),
    children: [
      {
        path: ROUTE.routingDetails.component,
        loadComponent: () =>
          import('./same-route/comp1/comp1.component').then((c) => c.Comp1Component),
        canMatch: [() => isComp1.value],
      },
      {
        path: ROUTE.routingDetails.component,
        loadComponent: () =>
          import('./same-route/comp2/comp2.component').then((c) => c.Comp2Component),
        canMatch: [() => !isComp1.value],
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: ROUTE.routingDetails.component,
      },
    ],
  },
];
