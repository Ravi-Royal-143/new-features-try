import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { SubFormWithControlInsideComponent } from './sub-form-with-control-inside/sub-form-with-control-inside.component';
import { SubReusableFormComponent } from './sub-reusable-form/sub-reusable-form.component';

@Component({
  selector: 'app-main-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    SubReusableFormComponent,
    SubFormWithControlInsideComponent,
  ],
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss'],
})
export class MainFormComponent {
  form = new FormGroup({
    address: new FormGroup({
      name: new FormControl(''),
      address: new FormControl(''),
    }),
  });

  print() {
    console.log(
      '🚀 ~ file: main-form.component.ts ~ line 16 ~ MainFormComponent ~ form',
      this.form,
    );
  }
}
