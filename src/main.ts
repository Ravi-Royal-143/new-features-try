import { provideHttpClient, withInterceptorsFromDi, withFetch } from '@angular/common/http';
import { provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withPreloading,
  PreloadAllModules,
  withComponentInputBinding,
} from '@angular/router';

import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES, withPreloading(PreloadAllModules), withComponentInputBinding()),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
}).catch((err: unknown) => {
  console.error(err);
});
