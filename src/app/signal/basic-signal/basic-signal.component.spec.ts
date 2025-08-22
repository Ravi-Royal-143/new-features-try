import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicSignalComponent } from './basic-signal.component';

describe('BasicSignalComponent', () => {
  let component: BasicSignalComponent;
  let fixture: ComponentFixture<BasicSignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicSignalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BasicSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
