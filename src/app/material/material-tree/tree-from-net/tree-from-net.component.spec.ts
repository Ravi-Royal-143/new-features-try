import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeFromNetComponent } from './tree-from-net.component';

describe('TreeFromNetComponent', () => {
  let component: TreeFromNetComponent;
  let fixture: ComponentFixture<TreeFromNetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TreeFromNetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeFromNetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
