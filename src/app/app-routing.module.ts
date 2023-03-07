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
        path: 'mat-tree',
        loadComponent: () => import('./mat-tree/mat-tree.component').then(c => c.MatTreeComponent)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'mat-tree'
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
