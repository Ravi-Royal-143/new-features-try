import { Routes } from '@angular/router';

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
        path: 'using-pipe',
        component: UsingPipeComponent,
      },
    ],
  },
];
