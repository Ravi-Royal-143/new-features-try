import { Routes } from '@angular/router';

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
        path: 'basic-signal',
        component: BasicSignalComponent,
      },
      {
        path: 'signal-observable',
        component: SignalObservableComponent,
      },
      {
        path: 'linked-signal',
        component: LinkedSignalComponent,
      },
    ],
  },
];
