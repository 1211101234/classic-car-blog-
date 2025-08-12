import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Car } from '../../models/car';
import { loadCars, deleteCar, setFilter, setSort } from '../../store/car.actions';
import { selectFilteredSortedCars } from '../../store/car.selector';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './car-list.html',
})
export class CarList implements OnInit {
  cars$: Observable<Car[]>;
  currentSortKey: keyof Car = 'origin';
  ascending = true;

  constructor(private store: Store, private router: Router) {
    this.cars$ = this.store.select(selectFilteredSortedCars);
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

  onFilterChange(origin: string): void {
    this.store.dispatch(setFilter({ origin }));
  }

  onSortChange(key: keyof Car): void {
    if (this.currentSortKey === key) {
      this.ascending = !this.ascending;
    } else {
      this.currentSortKey = key;
      this.ascending = true;
    }
    this.store.dispatch(setSort({ key: this.currentSortKey, ascending: this.ascending }));
  }
}
