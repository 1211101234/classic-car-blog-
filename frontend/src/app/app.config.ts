import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { routes } from './app.routes';
import { AuthEffects } from './store/auth.effects';
import { authReducer } from './store/auth.reducer';
import { ActionReducer, Action } from '@ngrx/store';
import { AuthState } from './store/auth.models';
import {providePrimeNG} from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
//  PrimeNG v20 AoT theme import
import Aura from '@primeuix/themes/aura';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
            cssLayer: {
                name: 'primeng',
                order: 'theme, base, primeng'
            }
        }
      }
    }),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects]),
    provideHttpClient(),
  ]
};

