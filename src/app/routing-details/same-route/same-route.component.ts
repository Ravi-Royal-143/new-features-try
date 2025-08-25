import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';

import {
  SAME_ROUTE_LABEL_COMP1,
  SAME_ROUTE_LABEL_COMP2,
  SAME_ROUTE_SECTION_TITLE,
  SAME_ROUTE_TOGGLE_LABEL,
} from './same-route.constants';
import { isComp1, toggleComp1 } from './same.route';

@Component({
  selector: 'app-same-route',
  imports: [CommonModule, RouterModule, MatButtonModule, MatCardModule],
  templateUrl: './same-route.component.html',
  styleUrls: ['./same-route.component.scss'],
})
export class SameRouteComponent {
  constructor(private router: Router) {}
  readonly sectionTitle = SAME_ROUTE_SECTION_TITLE;
  readonly toggleLabel = SAME_ROUTE_TOGGLE_LABEL;
  readonly labelComp1 = SAME_ROUTE_LABEL_COMP1;
  readonly labelComp2 = SAME_ROUTE_LABEL_COMP2;
  get isActive(): boolean {
    return isComp1.value;
  }
  toggleComponent() {
    toggleComp1();
    console.log('is', isComp1.value);
    const currentUrl = this.router.url + '?';

    void this.router.navigateByUrl(currentUrl).then(() => {
      this.router.navigated = false;
      void this.router.navigate([this.router.url]);
    });
  }
}
