import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SubReusableFormComponent } from './sub-reusable-form.component';

@Component({
  template: `
    <form [formGroup]="form">
      <app-sub-reusable-form [groupName]="'address'"></app-sub-reusable-form>
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, SubReusableFormComponent],
})
class HostComponent {
  @ViewChild(SubReusableFormComponent) child!: SubReusableFormComponent;
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      address: this.fb.group({
        name: this.fb.control(''),
        address: this.fb.control(''),
      }),
    });
  }
}

describe('SubReusableFormComponent', () => {
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
