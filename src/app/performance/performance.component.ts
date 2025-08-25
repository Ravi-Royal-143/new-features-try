import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

import { NavigationLink } from '../shared/types';

import {
  PERFORMANCE_NAVIGATION_LINKS,
  PERFORMANCE_SECTION_DESCRIPTION,
  PERFORMANCE_SECTION_TITLE,
} from './performance.constants';

@Component({
  selector: 'app-performance',
  imports: [CommonModule, RouterModule, MatCardModule],
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss'],
})
export class PerformanceComponent {
  readonly sectionTitle = PERFORMANCE_SECTION_TITLE;
  readonly sectionDescription = PERFORMANCE_SECTION_DESCRIPTION;
  readonly navigationLinks: NavigationLink[] = PERFORMANCE_NAVIGATION_LINKS;
}
