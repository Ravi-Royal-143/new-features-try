import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'routes',
    loadComponent: () => import('./route-link/route-link.component').then(c => c.RouteLinkComponent)
  },
  {
    path: 'forms',
    loadChildren: () => import('./forms/forms.route').then(c => c.FORMS_ROUTES)
  },
 
  {
    path: 'rxjs',
    loadChildren: () => import('./rxjs/rxjs.routes').then(c => c.RXJS_ROUTES)
  },
  {
    path: 'material',
    loadChildren: () => import('./material/material.routing').then(c => c.MATERIALS_ROUTES)
  },
  {
    path: 'content-projection',
    loadChildren: () => import('./content-projection/content-projection.route').then(c => c.CONTENT_PROJECTION_ROUTES)
  },
  {
    path: 'routing-query-solution',
    loadChildren: () => import('./routing-details/routing-details.route').then(c => c.ROUTING_SECTION)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'routes'
  },
  {
    path: '**',
    redirectTo: 'routes'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
