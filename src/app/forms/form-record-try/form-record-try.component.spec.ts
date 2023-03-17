import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRecordTryComponent } from './form-record-try.component';

describe('FormRecordTryComponent', () => {
  let component: FormRecordTryComponent;
  let fixture: ComponentFixture<FormRecordTryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormRecordTryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRecordTryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
