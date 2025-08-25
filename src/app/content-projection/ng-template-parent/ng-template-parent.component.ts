import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { ChildComponent } from './child/child.component';

@Component({
  selector: 'app-ng-template-parent',
  imports: [CommonModule, ChildComponent, MatCardModule],
  templateUrl: './ng-template-parent.component.html',
  styleUrls: ['./ng-template-parent.component.scss'],
})
export class NgTemplateParentComponent {}
