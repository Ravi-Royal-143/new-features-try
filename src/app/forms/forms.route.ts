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
          import('./main-form/main-form.component').then((c) => c.MainFormComponent),
      },
    ],
  },
];
