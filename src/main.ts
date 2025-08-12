import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideStore } from '@ngrx/store';
import { carReducer } from './app/store/car.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouter } from '@angular/router'; // ✅ import this
import { routes } from './app/app.routes';           // ✅ import your routes

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),              // ✅ add this line
    provideStore({ car: carReducer }),
    provideStoreDevtools()
  ]
});
