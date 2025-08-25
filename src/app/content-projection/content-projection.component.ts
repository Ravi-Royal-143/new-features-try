import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

import { NavigationLink } from '../shared/types';

import {
  CONTENT_PROJECTION_NAVIGATION_LINKS,
  CONTENT_PROJECTION_SECTION_DESCRIPTION,
  CONTENT_PROJECTION_SECTION_TITLE,
} from './content-projection.constants';

@Component({
  selector: 'app-content-projection',
  imports: [CommonModule, RouterModule, MatCardModule],
  templateUrl: './content-projection.component.html',
  styleUrls: ['./content-projection.component.scss'],
})
export class ContentProjectionComponent {
  readonly sectionTitle = CONTENT_PROJECTION_SECTION_TITLE;
  readonly sectionDescription = CONTENT_PROJECTION_SECTION_DESCRIPTION;
  readonly navigationLinks: NavigationLink[] = CONTENT_PROJECTION_NAVIGATION_LINKS;
}
