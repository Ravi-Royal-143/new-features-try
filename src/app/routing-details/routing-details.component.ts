import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

import { NavigationLink } from '../shared/types';

import {
  ROUTING_DETAILS_NAVIGATION_LINKS,
  ROUTING_DETAILS_SECTION_DESCRIPTION,
  ROUTING_DETAILS_SECTION_TITLE,
} from './routing-details.constants';

@Component({
  selector: 'app-routing-details',
  imports: [CommonModule, RouterModule, MatCardModule],
  templateUrl: './routing-details.component.html',
  styleUrls: ['./routing-details.component.scss'],
})
export class RoutingDetailsComponent {
  readonly sectionTitle = ROUTING_DETAILS_SECTION_TITLE;
  readonly sectionDescription = ROUTING_DETAILS_SECTION_DESCRIPTION;
  readonly navigationLinks: NavigationLink[] = ROUTING_DETAILS_NAVIGATION_LINKS;
}
