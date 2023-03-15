import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'routes',
    loadComponent: () => import('./route-link/route-link.component').then(c => c.RouteLinkComponent)
  },
  {
    path: 'form-record',
    loadComponent: () => import('./form-record-try/form-record-try.component').then(c => c.FormRecordTryComponent)
  },
  {
    path: 'form-group-directive',
    loadComponent: () => import('./main-form/main-form.component').then(c => c.MainFormComponent)
  },
  {
    path: 'rxjs',
    loadChildren: () => import('./rxjs/rxjs.routes').then(c => c.RXJS_ROUTES)
  },
  {
    path: 'material',
    children: [
      {
        path: 'mat-tree-mine',
        loadComponent: () => import('./material-tree/mat-tree/mat-tree.component').then(c => c.MatTreeComponent)
      },
      {
        path: 'mat-tree-net',
        loadComponent: () => import('./material-tree/tree-from-net/tree-from-net.component').then(c => c.TreeFromNetComponent)
      },
      {
        path: 'mat-tree-net-copied',
        loadChildren: () => import('./material-tree/mat-tree-net-copied/mat-tree-net-copied.module').then(c => c.MatTreeNetCopiedModule)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'mat-tree-net'
      },
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'material'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
