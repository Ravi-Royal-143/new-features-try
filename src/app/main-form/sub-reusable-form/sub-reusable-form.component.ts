import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sub-reusable-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sub-reusable-form.component.html',
  styleUrls: ['./sub-reusable-form.component.scss']
})
export class SubReusableFormComponent implements OnInit {

  @Input() groupName: string
  form: FormGroup

  constructor(private formgroupDirective: FormGroupDirective) { }

  ngOnInit() {
    console.log(this.formgroupDirective)
    this.form = this.formgroupDirective.control.get(this.groupName) as FormGroup<any>
  }
}
