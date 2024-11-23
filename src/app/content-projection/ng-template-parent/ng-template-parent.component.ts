import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildComponent } from './child/child.component';

@Component({
    selector: 'app-ng-template-parent',
    imports: [CommonModule, ChildComponent],
    templateUrl: './ng-template-parent.component.html',
    styleUrls: ['./ng-template-parent.component.scss']
})
export class NgTemplateParentComponent {

}
