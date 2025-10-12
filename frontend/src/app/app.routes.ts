import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarList } from './components/car-list/car-list';
import { CarDetail } from './components/car-detail/car-detail';
import { AddCarComponent } from './components/add-car/add-car';
import { EditCar } from './components/edit-car/edit-car';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { HomeComponent } from './components/home/home';
import { AuthGuard } from './auth/auth.guard'; // import your AuthGuard

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'carlist', component: CarList },
  { path: 'car/:id', component: CarDetail },

  // Protected routes
  { path: 'add-car', component: AddCarComponent, canActivate: [AuthGuard] },
  { path: 'edit-car/:id', component: EditCar, canActivate: [AuthGuard] },

  // Public routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Catch-all
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
