import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { routes } from './app.routes';
import { AuthEffects } from './store/auth.effects';
import { authReducer } from './store/auth.reducer';
import { ActionReducer, Action } from '@ngrx/store';
import { AuthState } from './store/auth.models';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects])
  ]
};

