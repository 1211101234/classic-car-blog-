import { createAction, props } from '@ngrx/store';
import { Car } from '../models/car';

// Load Cars
export const loadCars = createAction('[Car] Load Cars');

// Load Cars Success
export const loadCarsSuccess = createAction(
  '[Car] Load Cars Success',
  props<{ cars: Car[] }>()
);

// Load Cars Failure
export const loadCarsFailure = createAction(
  '[Car] Load Cars Failure',
  props<{ error: any }>()
);

// Add Car
export const addCar = createAction(
  '[Car] Add Car',
  props<{ car: Car }>()
);

// Edit Car
export const editCar = createAction(
  '[Car] Edit Car',
  props<{ car: Car }>()
);

// Delete Car
export const deleteCar = createAction(
  '[Car] Delete Car',
  props<{ id: number }>()
);

// Set Filter action for origin
export const setFilter = createAction(
  '[Car] Set Filter',
  props<{ origin?: string }>()
);

// Set Sort action
export const setSort = createAction(
  '[Car] Set Sort',
  props<{ key: keyof Car; ascending: boolean }>()
);
