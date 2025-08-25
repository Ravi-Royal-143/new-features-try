import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-route-link',
  imports: [CommonModule, RouterModule, MatCardModule],
  templateUrl: './route-link.component.html',
  styleUrls: ['./route-link.component.scss'],
})
export class RouteLinkComponent {}
