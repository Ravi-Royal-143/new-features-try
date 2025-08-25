import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormRecord, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form-record-try',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './form-record-try.component.html',
  styleUrls: ['./form-record-try.component.scss'],
})
export class FormRecordTryComponent implements OnInit {
  addresses = new FormRecord<FormControl<boolean | null>>({});

  ngOnInit() {
    this.addresses.addControl('Andrew', new FormControl(true));
  }

  addControl(controlName: string) {
    const name = String(controlName).trim();
    if (!name) return;
    this.addresses.addControl(name, new FormControl(false));
  }

  check() {
    console.log(
      '🚀 ~ file: form-record-try.component.ts ~ line 22 ~ FormRecordTryComponent ~ check ~ addresses',
      this.addresses,
    );
  }
}
