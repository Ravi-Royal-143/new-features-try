import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormRecordTryComponent } from './form-record-try/form-record-try.component';

const routes: Routes = [{
  path:'form-record',
  component: FormRecordTryComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
