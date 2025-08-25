import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { LinkedSignalComponent } from './linked-signal.component';

describe('LinkedSignalComponent', () => {
  let component: LinkedSignalComponent;
  let fixture: ComponentFixture<LinkedSignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkedSignalComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkedSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
