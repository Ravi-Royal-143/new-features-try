import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgTemplateParentComponent } from './ng-template-parent.component';

describe('NgTemplateParentComponent', () => {
  let component: NgTemplateParentComponent;
  let fixture: ComponentFixture<NgTemplateParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NgTemplateParentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgTemplateParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
