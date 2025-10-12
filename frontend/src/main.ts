import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideStore } from '@ngrx/store';
import { carReducer } from './app/store/car.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouter } from '@angular/router'; 
import { routes } from './app/app.routes';
import { providePrimeNG } from 'primeng/config';
import { provideAnimations } from '@angular/platform-browser/animations';
import Aura from '@primeuix/themes/aura';
import { provideHttpClient } from '@angular/common/http';


bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideStore({ car: carReducer }),
    provideStoreDevtools(),
    provideHttpClient(),
    provideAnimations(),
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
  ]
});
