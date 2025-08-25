import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';

import { ROUTES as ROUTE, UI_TEXT as UI } from './shared/constants';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterLink, RouterOutlet, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly theme = inject(ThemeService);
  title = 'test';
  // Expose constants to template
  readonly routes = ROUTE;
  readonly uiText = UI;
  readonly isDark = computed(() => this.theme.isDark());
  toggleTheme() {
    this.theme.toggle();
  }
}
