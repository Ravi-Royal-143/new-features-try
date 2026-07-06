import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FormGroupDirectiveComponent } from './form-group-directive.component';

describe('FormGroupDirectiveComponent', () => {
  let component: FormGroupDirectiveComponent;
  let fixture: ComponentFixture<FormGroupDirectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormGroupDirectiveComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FormGroupDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
