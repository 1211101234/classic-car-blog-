import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

// Models & NgRx
import { Car } from '../../models/car';
import { addCar } from '../../store/car.actions';
import { selectCarFeature } from '../../store/car.selector';

// PrimeNG Modules
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    CardModule
  ],
  templateUrl: './add-car.html',
})
export class AddCarComponent {
  newCar: Car = {
    id: 0,
    name: '',
    year: null as any,
    origin: '',
    image: '',
    description: '',
    horsepower: 0,
    topSpeed: 0,
  };

  cars$: Observable<Car[]>;

  constructor(private store: Store, private router: Router) {
    // Select cars from store state
    this.cars$ = this.store.select(selectCarFeature).pipe(
      map(state => state.cars)
    );
  }

  onSubmit() {
    this.cars$.pipe(take(1)).subscribe((cars) => {
      const maxId = cars.length > 0 ? Math.max(...cars.map(c => c.id)) : 0;

      const carToAdd: Car = {
        ...this.newCar,
        id: maxId + 1,
      };

      this.store.dispatch(addCar({ car: carToAdd }));
      this.router.navigate(['/']);
    });
  }
}
