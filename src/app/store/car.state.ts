import { Car } from '../models/car';

export interface CarState {
  cars: Car[];
  
}

export const initialCarState: CarState = {
  cars: []

};
