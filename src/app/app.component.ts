import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterLink, RouterOutlet, MatButtonModule, MatIconModule],
})
export class AppComponent implements OnInit {
  title = 'test';
  private static readonly THEME_CLASS = 'theme-dark';
  isDark = false;
  ngOnInit(): void {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (saved === 'dark') {
      document.body.classList.add(AppComponent.THEME_CLASS);
      this.isDark = true;
    }
  }
  toggleTheme() {
    const body = document.body;
    body.classList.toggle(AppComponent.THEME_CLASS);
    const isDark = body.classList.contains(AppComponent.THEME_CLASS);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    this.isDark = isDark;
  }
}
