import { Component, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-child',
    imports: [CommonModule],
    templateUrl: './child.component.html',
    styleUrls: ['./child.component.scss']
})
export class ChildComponent {

  @ContentChild('dataContent') dataRef: TemplateRef<unknown>
}
