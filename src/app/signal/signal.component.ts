import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

import { NavigationLink } from '../shared/types';

import {
  SIGNAL_NAVIGATION_LINKS,
  SIGNAL_SECTION_DESCRIPTION,
  SIGNAL_SECTION_TITLE,
} from './signal.constants';

@Component({
  selector: 'app-signal',
  imports: [FormsModule, RouterModule, MatCardModule],
  templateUrl: './signal.component.html',
  styleUrls: ['./signal.component.scss'],
})
export class SignalComponent {
  readonly sectionTitle = SIGNAL_SECTION_TITLE;
  readonly sectionDescription = SIGNAL_SECTION_DESCRIPTION;
  readonly navigationLinks: NavigationLink[] = SIGNAL_NAVIGATION_LINKS;
}
