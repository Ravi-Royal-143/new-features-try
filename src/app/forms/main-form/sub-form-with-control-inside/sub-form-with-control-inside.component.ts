import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sub-form-with-control-inside',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sub-form-with-control-inside.component.html',
  styleUrls: ['./sub-form-with-control-inside.component.scss']
})
export class SubFormWithControlInsideComponent {

  @Input() groupName: string
  form: FormGroup

  constructor(private formgroupDirective: FormGroupDirective) { }

  ngOnInit() {
    console.log(this.formgroupDirective)

    //here the form control is present here which is deviated from the parent form component 
    // its better to have all the controls in the same component than making it spreaded out
    const formControl = this.formgroupDirective.control as FormGroup<any>
    this.formgroupDirective.control.addControl(this.groupName, new FormGroup({
      name: new FormControl(''),
      address: new FormControl('')
    }))
    this.form = this.formgroupDirective.control.get(this.groupName) as FormGroup<any>
  }
}
