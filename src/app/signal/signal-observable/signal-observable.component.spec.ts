import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalObservableComponent } from './signal-observable.component';

describe('SignalObservableComponent', () => {
  let component: SignalObservableComponent;
  let fixture: ComponentFixture<SignalObservableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalObservableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalObservableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
