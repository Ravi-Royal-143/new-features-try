import { Routes } from '@angular/router';

export const MATERIALS_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'mat-tree-mine',
        loadComponent: () =>
          import('./material-tree/mat-tree/mat-tree.component').then((c) => c.MatTreeComponent),
      },
      {
        path: 'mat-tree-net',
        loadComponent: () =>
          import('./material-tree/tree-from-net/tree-from-net.component').then(
            (c) => c.TreeFromNetComponent,
          ),
      },
      {
        path: 'mat-tree-net-copied',
        loadChildren: () =>
          import('./material-tree/mat-tree-net-copied/mat-tree-net-copied.module').then(
            (c) => c.MatTreeNetCopiedModule,
          ),
      },
      {
        path: 'mat-tree-parent-mine-custom',
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
