import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FormRecordTryComponent } from './form-record-try.component';

describe('FormRecordTryComponent', () => {
  let component: FormRecordTryComponent;
  let fixture: ComponentFixture<FormRecordTryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRecordTryComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FormRecordTryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
