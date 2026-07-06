import { Routes } from '@angular/router';

import { ROUTES as ROUTE } from '../shared/constants';

import { FormsComponent } from './forms.component';

export const FORMS_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: FormsComponent,
      },
      {
        path: ROUTE.forms.formRecord,
        loadComponent: () =>
          import('./form-record-try/form-record-try.component').then(
            (c) => c.FormRecordTryComponent,
          ),
      },
      {
        path: ROUTE.forms.formGroupDirective,
        loadComponent: () =>
          import('./form-group-directive/form-group-directive.component').then(
            (c) => c.FormGroupDirectiveComponent,
          ),
      },
      {
        path: ROUTE.forms.signalForm,
        loadComponent: () =>
          import('./signal-form/signal-form.component').then((c) => c.SignalFormComponent),
      },
    ],
  },
];
