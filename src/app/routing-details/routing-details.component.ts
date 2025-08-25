import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-routing-details',
  imports: [CommonModule, RouterModule, MatCardModule],
  templateUrl: './routing-details.component.html',
  styleUrls: ['./routing-details.component.scss'],
})
export class RoutingDetailsComponent {}
