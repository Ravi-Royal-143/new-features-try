import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { BasicSignalComponent } from './basic-signal.component';

describe('BasicSignalComponent', () => {
  let component: BasicSignalComponent;
  let fixture: ComponentFixture<BasicSignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicSignalComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BasicSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
