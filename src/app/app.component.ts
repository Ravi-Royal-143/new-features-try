import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterLink, RouterOutlet],
})
export class AppComponent {
  title = 'test';
  toggleTheme() {
    const body = document.body;
    body.classList.toggle('theme-dark');
  }
}
