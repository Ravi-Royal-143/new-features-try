import { CommonModule } from '@angular/common';
import { Component, ContentChild, TemplateRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-child',
  imports: [CommonModule, MatCardModule],
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent {
  @ContentChild('dataContent') dataRef: TemplateRef<unknown>;
}
