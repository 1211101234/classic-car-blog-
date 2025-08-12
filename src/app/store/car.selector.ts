import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CarState } from './car.state';

// Access the car feature
export const selectCarFeature = createFeatureSelector<CarState>('car');

// Select all cars
export const selectAllCars = createSelector(
  selectCarFeature,
  (state: CarState) => state.cars
);

// Optional: Select one car by ID
export const selectCarById = (id: number) =>
  createSelector(selectAllCars, (cars) => cars.find((car) => car.id === id));
