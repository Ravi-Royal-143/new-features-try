import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';

import { ROUTES as ROUTE, UI_TEXT as UI } from './shared/constants';
import { THEME_CLASS, readSavedTheme, toggleTheme as toggle } from './shared/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterLink, RouterOutlet, MatButtonModule, MatIconModule],
})
export class AppComponent implements OnInit {
  title = 'test';
  isDark = false;
  // Expose constants to template
  readonly routes = ROUTE;
  readonly uiText = UI;
  ngOnInit(): void {
    const saved = readSavedTheme();
    if (saved === 'dark') {
      document.body.classList.add(THEME_CLASS);
      this.isDark = true;
    }
  }
  toggleTheme() {
    this.isDark = toggle(document);
  }
}
