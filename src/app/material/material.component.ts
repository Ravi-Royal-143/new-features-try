import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { NavigationLink } from '../shared/types';

import {
  MATERIAL_NAVIGATION_LINKS,
  MATERIAL_SECTION_DESCRIPTION,
  MATERIAL_SECTION_TITLE,
} from './material.constants';

@Component({
  selector: 'app-material',
  imports: [CommonModule, MatCardModule, RouterModule, MatIconModule],
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss'],
})
export class MaterialComponent {
  readonly sectionTitle = MATERIAL_SECTION_TITLE;
  readonly sectionDescription = MATERIAL_SECTION_DESCRIPTION;
  readonly navigationLinks: NavigationLink[] = MATERIAL_NAVIGATION_LINKS;
}
