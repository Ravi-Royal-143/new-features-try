import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { SignalComponent } from './signal.component';

describe('SignalComponent', () => {
  let component: SignalComponent;
  let fixture: ComponentFixture<SignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
