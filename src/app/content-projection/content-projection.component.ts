import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-content-projection',
  imports: [CommonModule, RouterModule, MatCardModule],
  templateUrl: './content-projection.component.html',
  styleUrls: ['./content-projection.component.scss'],
})
export class ContentProjectionComponent {}
