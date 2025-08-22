import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

import { isComp1, toggleComp1 } from './same.route';

@Component({
  selector: 'app-same-route',
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './same-route.component.html',
  styleUrls: ['./same-route.component.scss'],
})
export class SameRouteComponent {
  constructor(private router: Router) {}
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
