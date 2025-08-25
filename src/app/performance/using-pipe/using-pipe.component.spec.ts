import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { UsingPipeComponent } from './using-pipe.component';

describe('UsingPipeComponent', () => {
  let component: UsingPipeComponent;
  let fixture: ComponentFixture<UsingPipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsingPipeComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UsingPipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
