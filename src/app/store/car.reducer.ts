
import { createReducer, on } from '@ngrx/store';
import { addCar, deleteCar, editCar, loadCars } from './car.actions';
import { Car } from '../models/car';
import { initialCarState } from './car.state';
import { setFilter, setSort } from './car.actions';

const mockCars: Car[] = [
  {
    id: 1,
    name: 'Nissan Skyline GT-R (Hakosuka)',
    year: 1971,
    origin: 'Japan',
    image: 'hakosuka.gif',
    description: 'Classic GT-R with a straight-6 engine, known for its aggressive boxy styling.',
    horsepower: 160,
  },
  {
    id: 2,
    name: 'Toyota Corolla AE86',
    year: 1985,
    origin: 'Japan',
    image: 'ae86.gif',
    description: 'The legendary drift car, popularized by the anime Initial D.',
    horsepower: 130,
  },
  {
    id: 3,
    name: 'Honda Civic EG6',
    year: 1991,
    origin: 'Japan',
    image: 'eg6.jpg',
    description: 'Lightweight VTEC-powered hatchback loved by tuners.',
    horsepower: 160,
  },
  {
    id: 4,
    name: 'Datsun 240Z',
    year: 1970,
    origin: 'Japan',
    image: 'z240.gif',
    description: 'The iconic Fairlady Z, praised for its performance and affordability.',
    horsepower: 150,
  }
];


export const carReducer = createReducer(
  initialCarState,

  // ✅ Load cars from localStorage (only user-added), merge with mockCars
  on(loadCars, (state) => {
    const stored = localStorage.getItem('cars');
    const userCars: Car[] = stored ? JSON.parse(stored) : mockCars;

    localStorage.setItem('cars', JSON.stringify(userCars));


    return {
      ...state,
      cars: userCars
    };
  }),

  // ✅ Add new car
  on(addCar, (state, { car }) => {
    const cars = localStorage.getItem('cars') ?? '[]'; // Fallback to empty array if no cars stored
    const updatedUserCars = [...JSON.parse(cars), car];

    localStorage.setItem('cars', JSON.stringify(updatedUserCars));

    return {
      ...state,
      cars: updatedUserCars
    };
  }),

  // ✅ Edit car
  on(editCar, (state, { car }) => {
    const updatedCars = state.cars.map((c) => (c.id === car.id ? car : c));

    localStorage.setItem('cars', JSON.stringify(updatedCars));

    return {
      ...state,
      cars: updatedCars
    };
  }),

  // ✅ Delete car
  on(deleteCar, (state, { id }) => {
    const updatedCars = state.cars.filter((c) => c.id !== id);

    localStorage.setItem('cars', JSON.stringify(updatedCars));

    return {
      ...state,
      cars: updatedCars
    };
  }),

   // Handle filter update
  on(setFilter, (state, { origin }) => ({
    ...state,
    filter: { origin },
  })),

  // Handle sort update
  on(setSort, (state, { key, ascending }) => ({
    ...state,
    sort: { key, ascending },
  })),
);

