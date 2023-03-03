import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormRecordTryComponent } from './form-record-try/form-record-try.component';
import { MainFormComponent } from './main-form/main-form.component';

const routes: Routes = [
  {
    path: 'form-record',
    component: FormRecordTryComponent
  },
  {
    path: 'form-group-directive',
    component: MainFormComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'form-group-directive'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
