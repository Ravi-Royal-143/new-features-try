import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SubReusableFormComponent } from './sub-reusable-form/sub-reusable-form.component';
import { SubFormWithControlInsideComponent } from './sub-form-with-control-inside/sub-form-with-control-inside.component';

@Component({
    selector: 'app-main-form',
    imports: [CommonModule, ReactiveFormsModule, SubReusableFormComponent, SubFormWithControlInsideComponent],
    templateUrl: './main-form.component.html',
    styleUrls: ['./main-form.component.scss']
})
export class MainFormComponent {

  form = new FormGroup({
    address: new FormGroup({
      name: new FormControl(''),
      address: new FormControl('')
    })
  })
  
  print() {
    console.log("🚀 ~ file: main-form.component.ts ~ line 16 ~ MainFormComponent ~ form", this.form)    
  }
}
