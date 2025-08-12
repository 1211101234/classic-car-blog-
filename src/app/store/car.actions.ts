import { createAction, props } from '@ngrx/store';
import { Car } from '../models/car';

// Load
export const loadCars = createAction('[Car] Load Cars');

// Add
export const addCar = createAction(
  '[Car] Add Car',
  props<{ car: Car }>()
);

// Edit
export const editCar = createAction(
  '[Car] Edit Car',
  props<{ car: Car }>()
);

// Delete
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
