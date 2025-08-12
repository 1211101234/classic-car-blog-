import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Car } from '../../models/car';
import { loadCars, deleteCar } from '../../store/car.actions';
import { selectAllCars } from '../../store/car.selector';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './car-list.html',
 
})
export class CarList implements OnInit {
  cars$: Observable<Car[]>;

  constructor(private store: Store, private router: Router) {
    this.cars$ = this.store.select(selectAllCars);
  }

  ngOnInit(): void {
    this.store.dispatch(loadCars());
  }

  addCar(): void {
    this.router.navigate(['/add-car']);
  }

  deleteCar(id: number): void {
    if (confirm('Are you sure you want to delete this car?')) {
      this.store.dispatch(deleteCar({ id }));
    }
  }

  editCar(id: number): void {
    this.router.navigate(['/edit-car', id]);
  }

  goToCarDetails(id: number): void {
    this.router.navigate(['/car', id]);
  }
}
