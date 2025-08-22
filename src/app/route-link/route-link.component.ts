import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-route-link',
  imports: [CommonModule, RouterModule],
  templateUrl: './route-link.component.html',
  styleUrls: ['./route-link.component.scss'],
})
export class RouteLinkComponent {}
