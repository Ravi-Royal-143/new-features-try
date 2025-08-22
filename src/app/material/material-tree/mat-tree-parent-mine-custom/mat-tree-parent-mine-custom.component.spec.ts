import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTreeParentMineCustomComponent } from './mat-tree-parent-mine-custom.component';

describe('MatTreeParentMineCustomComponent', () => {
  let component: MatTreeParentMineCustomComponent;
  let fixture: ComponentFixture<MatTreeParentMineCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTreeParentMineCustomComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MatTreeParentMineCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
