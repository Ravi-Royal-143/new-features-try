import { Routes } from '@angular/router';

import { ROUTES as ROUTE } from '../shared/constants';

export const CONTENT_PROJECTION_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: ROUTE.contentProjection.templateProjection,
        loadComponent: () =>
          import('./ng-template-parent/ng-template-parent.component').then(
            (c) => c.NgTemplateParentComponent,
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./content-projection.component').then((c) => c.ContentProjectionComponent),
      },
    ],
  },
];
