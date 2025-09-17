import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarList } from './components/car-list/car-list';
import { FormsModule } from '@angular/forms';
import { CarDetail } from './components/car-detail/car-detail';
import { AddCarComponent } from './components/add-car/add-car';
import { EditCar } from './components/edit-car/edit-car'; // Import EditCar component
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { HomeComponent } from './components/home/home';

export const routes: Routes = [  // ✅ must export it!
  {path:'app-home',component: HomeComponent},
  { path: 'carlist', component: CarList },
  { path: 'register', component: RegisterComponent },
  {path: 'login', component: LoginComponent }, // Route for login
  { path: 'car/:id', component: CarDetail },
  {path: 'add-car', component: AddCarComponent },
 { path: 'register', component: RegisterComponent },
  { path: 'app-home', redirectTo: 'register', pathMatch: 'full' },

  // Redirect any unknown paths to the car list
  {path: 'edit-car/:id', component: EditCar }, // Route for editing a car

  { path: '**', redirectTo: '' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
