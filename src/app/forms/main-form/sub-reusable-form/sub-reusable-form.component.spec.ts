import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubReusableFormComponent } from './sub-reusable-form.component';

describe('SubReusableFormComponent', () => {
  let component: SubReusableFormComponent;
  let fixture: ComponentFixture<SubReusableFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SubReusableFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubReusableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
