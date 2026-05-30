import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

import { NavigationLink } from '../shared/types';

import {
  FORMS_NAVIGATION_LINKS,
  FORMS_SECTION_DESCRIPTION,
  FORMS_SECTION_TITLE,
} from './forms.constants';

@Component({
  selector: 'app-forms',
  imports: [RouterLink, MatCardModule],
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent {
  readonly sectionTitle = FORMS_SECTION_TITLE;
  readonly sectionDescription = FORMS_SECTION_DESCRIPTION;
  readonly navigationLinks: NavigationLink[] = FORMS_NAVIGATION_LINKS;
}
