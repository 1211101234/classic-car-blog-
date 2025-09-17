import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarList } from './components/car-list/car-list';
import { CarDetail } from './components/car-detail/car-detail';
import { AddCarComponent } from './components/add-car/add-car';
import { EditCar } from './components/edit-car/edit-car';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { HomeComponent } from './components/home/home';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // ✅ root path -> home
  { path: 'home', component: HomeComponent }, // optional alias
  { path: 'carlist', component: CarList },
  { path: 'car/:id', component: CarDetail },
  { path: 'add-car', component: AddCarComponent },
  { path: 'edit-car/:id', component: EditCar },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // catch-all: redirect unknown routes to home
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
