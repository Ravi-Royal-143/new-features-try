import { Routes } from '@angular/router';

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
        path: 'form-record',
        loadComponent: () =>
          import('./form-record-try/form-record-try.component').then(
            (c) => c.FormRecordTryComponent,
          ),
      },
      {
        path: 'form-group-directive',
        loadComponent: () =>
          import('./main-form/main-form.component').then((c) => c.MainFormComponent),
      },
    ],
  },
];
