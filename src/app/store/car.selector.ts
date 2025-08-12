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

export const selectFilter = createSelector(
  selectCarFeature,
  (state: CarState) => state.filter
);

export const selectSort = createSelector(
  selectCarFeature,
  (state: CarState) => state.sort
);

export const selectFilteredSortedCars = createSelector(
  selectAllCars,
  selectFilter,
  selectSort,
  (cars, filter, sort) => {
    let filtered = cars;

    const originFilter = filter.origin;
    if (originFilter && originFilter.trim() !== '') {
      filtered = filtered.filter(car =>
        car.origin.toLowerCase().includes(originFilter.toLowerCase())
      );
    }

    filtered = filtered.slice().sort((a, b) => {
      let valA = a[sort.key];
      let valB = b[sort.key];

      if (valA === undefined || valA === null) valA = typeof valA === 'number' ? 0 : '';
      if (valB === undefined || valB === null) valB = typeof valB === 'number' ? 0 : '';

      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      if (valA < valB) return sort.ascending ? -1 : 1;
      if (valA > valB) return sort.ascending ? 1 : -1;
      return 0;
    });

    return filtered;
  }
);
