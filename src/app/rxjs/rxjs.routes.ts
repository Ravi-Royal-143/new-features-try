import { Routes } from '@angular/router';

import { ROUTES as ROUTE } from '../shared/constants';

import { MapsComponent } from './maps/maps.component';
import { RxjsComponent } from './rxjs.component';

export const RXJS_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: RxjsComponent,
      },
      {
        path: ROUTE.rxjs.maps,
        component: MapsComponent,
      },
    ],
  },
];
