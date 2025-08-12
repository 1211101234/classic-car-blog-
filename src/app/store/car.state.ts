import { Car } from '../models/car';

export interface FilterState {
  origin?: string;
}

export interface SortState {
  key: keyof Car;
  ascending: boolean;
}

export interface CarState {
  cars: Car[];
  filter: FilterState;
  sort: SortState;
}

export const initialCarState: CarState = {
  cars: [],
  filter: {
    origin: '',
  },
  sort: {
    key: 'origin',  // default sort key
    ascending: true,
  },
};
