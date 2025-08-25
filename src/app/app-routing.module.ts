import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES as ROUTE } from './shared/constants';

const routes: Routes = [
  {
    path: ROUTE.root.routes,
    loadComponent: () =>
      import('./route-link/route-link.component').then((c) => c.RouteLinkComponent),
  },
  {
    path: ROUTE.root.forms,
    loadChildren: () => import('./forms/forms.route').then((c) => c.FORMS_ROUTES),
  },

  {
    path: ROUTE.root.rxjs,
    loadChildren: () => import('./rxjs/rxjs.routes').then((c) => c.RXJS_ROUTES),
  },
  {
    path: ROUTE.root.material,
    loadChildren: () => import('./material/material.routing').then((c) => c.MATERIALS_ROUTES),
  },
  {
    path: ROUTE.root.contentProjection,
    loadChildren: () =>
      import('./content-projection/content-projection.route').then(
        (c) => c.CONTENT_PROJECTION_ROUTES,
      ),
  },
  {
    path: ROUTE.root.routingDetails,
    loadChildren: () =>
      import('./routing-details/routing-details.route').then((c) => c.ROUTING_SECTION),
  },
  {
    path: ROUTE.root.performance,
    loadChildren: () => import('./performance/performance.route').then((c) => c.PERFORMANCE_ROUTES),
  },
  {
    path: ROUTE.root.signal,
    loadChildren: () => import('./signal/signal.routing').then((c) => c.SIGNAL_ROUTES),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ROUTE.root.routes,
  },
  {
    path: '**',
    redirectTo: ROUTE.root.routes,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
