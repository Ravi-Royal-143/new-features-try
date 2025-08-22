import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubFormWithControlInsideComponent } from './sub-form-with-control-inside.component';

describe('SubFormWithControlInsideComponent', () => {
  let component: SubFormWithControlInsideComponent;
  let fixture: ComponentFixture<SubFormWithControlInsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubFormWithControlInsideComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubFormWithControlInsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
