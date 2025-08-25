import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

import { NavigationLink } from '../shared/types';

import {
  ROUTE_LINK_NAVIGATION_LINKS,
  ROUTE_LINK_SECTION_DESCRIPTION,
  ROUTE_LINK_SECTION_TITLE,
} from './route-link.constants';

@Component({
  selector: 'app-route-link',
  imports: [CommonModule, RouterModule, MatCardModule],
  templateUrl: './route-link.component.html',
  styleUrls: ['./route-link.component.scss'],
})
export class RouteLinkComponent {
  readonly sectionTitle = ROUTE_LINK_SECTION_TITLE;
  readonly sectionDescription = ROUTE_LINK_SECTION_DESCRIPTION;
  readonly navigationLinks: NavigationLink[] = ROUTE_LINK_NAVIGATION_LINKS;
}
