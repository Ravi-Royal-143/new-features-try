import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTreeNetCopiedComponent } from './mat-tree-net-copied.component';

describe('MatTreeNetCopiedComponent', () => {
  let component: MatTreeNetCopiedComponent;
  let fixture: ComponentFixture<MatTreeNetCopiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatTreeNetCopiedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatTreeNetCopiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
