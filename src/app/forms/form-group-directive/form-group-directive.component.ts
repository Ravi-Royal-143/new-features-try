import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { SubFormWithControlInsideComponent } from './sub-form-with-control-inside/sub-form-with-control-inside.component';
import { SubReusableFormComponent } from './sub-reusable-form/sub-reusable-form.component';

@Component({
  selector: 'app-form-group-directive',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    SubReusableFormComponent,
    SubFormWithControlInsideComponent,
  ],
  templateUrl: './form-group-directive.component.html',
  styleUrls: ['./form-group-directive.component.scss'],
})
export class FormGroupDirectiveComponent {
  form = new FormGroup({
    address: new FormGroup({
      name: new FormControl(''),
      address: new FormControl(''),
    }),
  });

  print() {
    console.log(
      '🚀 ~ file: form-group-directive.component.ts ~ line 16 ~ FormGroupDirectiveComponent ~ form',
      this.form,
    );
  }
}
