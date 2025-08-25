import { Routes } from '@angular/router';

import { ROUTES as ROUTE } from '../shared/constants';

import { PerformanceComponent } from './performance.component';
import { UsingPipeComponent } from './using-pipe/using-pipe.component';

export const PERFORMANCE_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: PerformanceComponent,
      },
      {
        path: ROUTE.performance.usingPipe,
        component: UsingPipeComponent,
      },
    ],
  },
];
