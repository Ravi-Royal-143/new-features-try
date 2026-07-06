import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SubFormWithControlInsideComponent } from './sub-form-with-control-inside.component';

@Component({
  template: `
    <form [formGroup]="form">
      <app-sub-form-with-control-inside [groupName]="'address'"></app-sub-form-with-control-inside>
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, SubFormWithControlInsideComponent],
})
class HostComponent {
  @ViewChild(SubFormWithControlInsideComponent) child!: SubFormWithControlInsideComponent;
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }
}

describe('SubFormWithControlInsideComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance.child).toBeTruthy();
  });
});
