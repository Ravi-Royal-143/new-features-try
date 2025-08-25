import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MaterialComponent } from './material.component';

describe('MaterialComponent', () => {
  let component: MaterialComponent;
  let fixture: ComponentFixture<MaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
