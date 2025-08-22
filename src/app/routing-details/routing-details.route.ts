import { Routes } from '@angular/router';

import { isComp1 } from './same-route/same.route';

export const ROUTING_SECTION: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./routing-details.component').then((c) => c.RoutingDetailsComponent),
    pathMatch: 'full',
  },
  {
    path: 'same-route',
    loadComponent: () =>
      import('./same-route/same-route.component').then((c) => c.SameRouteComponent),
    children: [
      {
        path: 'component',
        loadComponent: () =>
          import('./same-route/comp1/comp1.component').then((c) => c.Comp1Component),
        canMatch: [() => isComp1.value],
      },
      {
        path: 'component',
        loadComponent: () =>
          import('./same-route/comp2/comp2.component').then((c) => c.Comp2Component),
        canMatch: [() => !isComp1.value],
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'component',
      },
    ],
  },
];
