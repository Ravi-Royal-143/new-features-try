import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormRecordTryComponent } from './form-record-try/form-record-try.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormRecordTryComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
