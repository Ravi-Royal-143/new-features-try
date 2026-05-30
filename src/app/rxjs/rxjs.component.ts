import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

import { NavigationLink } from '../shared/types';

import {
  RXJS_NAVIGATION_LINKS,
  RXJS_SECTION_DESCRIPTION,
  RXJS_SECTION_TITLE,
} from './rxjs.constants';

@Component({
  selector: 'app-rxjs',
  imports: [RouterLink, MatCardModule],
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss'],
})
export class RxjsComponent {
  readonly sectionTitle = RXJS_SECTION_TITLE;
  readonly sectionDescription = RXJS_SECTION_DESCRIPTION;
  readonly navigationLinks: NavigationLink[] = RXJS_NAVIGATION_LINKS;
}
