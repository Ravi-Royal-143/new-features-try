import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-sub-reusable-form',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './sub-reusable-form.component.html',
  styleUrls: ['./sub-reusable-form.component.scss'],
})
export class SubReusableFormComponent implements OnInit {
  @Input() groupName: string;
  form: FormGroup;

  constructor(private formgroupDirective: FormGroupDirective) {}

  ngOnInit() {
    console.log(this.formgroupDirective);

    this.form = this.formgroupDirective.control.get(this.groupName) as FormGroup;
  }
}
