import { CommonModule } from '@angular/common';
import { Component, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [CommonModule],
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent {
  @ContentChild('dataContent') dataRef: TemplateRef<unknown>;
}
