import { Routes } from '@angular/router';

import { ROUTES as ROUTE } from '../shared/constants';

import { BasicSignalComponent } from './basic-signal/basic-signal.component';
import { LinkedSignalComponent } from './linked-signal/linked-signal.component';
import { SignalObservableComponent } from './signal-observable/signal-observable.component';
import { SignalComponent } from './signal.component';

export const SIGNAL_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: SignalComponent,
      },
      {
        path: ROUTE.signal.basic,
        component: BasicSignalComponent,
      },
      {
        path: ROUTE.signal.observable,
        component: SignalObservableComponent,
      },
      {
        path: ROUTE.signal.linked,
        component: LinkedSignalComponent,
      },
    ],
  },
];
