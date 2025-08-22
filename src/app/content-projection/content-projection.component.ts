import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-content-projection',
  imports: [CommonModule, RouterModule],
  templateUrl: './content-projection.component.html',
  styleUrls: ['./content-projection.component.scss'],
})
export class ContentProjectionComponent {}
