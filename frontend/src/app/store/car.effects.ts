import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import * as CarActions from './car.actions';
import { Car } from '../models/car';

@Injectable()
export class CarEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  loadCars$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarActions.loadCars),
      mergeMap(() =>
        this.http.get<Car[]>('assets/data/cars.json').pipe(
          map(cars => CarActions.loadCarsSuccess({ cars })),
          catchError(error => of(CarActions.loadCarsFailure({ error })))
        )
      )
    )
  );
}
