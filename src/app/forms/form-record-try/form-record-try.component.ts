import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormRecord, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-form-record-try',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './form-record-try.component.html',
    styleUrls: ['./form-record-try.component.scss']
})
export class FormRecordTryComponent implements OnInit {
  
  addresses = new FormRecord<FormControl<boolean | null>>({});
  
  ngOnInit() {
    this.addresses.addControl('Andrew', new FormControl(true));
  }
  
  addControl(controlName: string) {
    this.addresses.addControl(controlName, new FormControl(false));
  }

  check() {
    console.log("🚀 ~ file: form-record-try.component.ts ~ line 22 ~ FormRecordTryComponent ~ check ~ addresses", this.addresses)    
  }
}
