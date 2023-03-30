import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SameRouteComponent } from './same-route.component';

describe('SameRouteComponent', () => {
  let component: SameRouteComponent;
  let fixture: ComponentFixture<SameRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SameRouteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SameRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
