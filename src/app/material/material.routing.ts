import { Routes } from '@angular/router';

import { ROUTES as ROUTE } from '../shared/constants';

export const MATERIALS_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: ROUTE.material.matTreeMine,
        loadComponent: () =>
          import('./material-tree/mat-tree/mat-tree.component').then((c) => c.MatTreeComponent),
      },
      {
        path: ROUTE.material.matTreeNet,
        loadComponent: () =>
          import('./material-tree/tree-from-net/tree-from-net.component').then(
            (c) => c.TreeFromNetComponent,
          ),
      },
      {
        path: ROUTE.material.matTreeNetCopied,
        loadComponent: () =>
          import('./material-tree/mat-tree-net-copied/mat-tree-net-copied.component').then(
            (c) => c.MatTreeNetCopiedComponent,
          ),
      },
      {
        path: ROUTE.material.matTreeParentMineCustom,
        loadComponent: () =>
          import(
            './material-tree/mat-tree-parent-mine-custom/mat-tree-parent-mine-custom.component'
          ).then((c) => c.MatTreeParentMineCustomComponent),
      },
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./material.component').then((c) => c.MaterialComponent),
      },
    ],
  },
];
