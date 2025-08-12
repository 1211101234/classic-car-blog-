import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private carsSubject = new BehaviorSubject<Car[]>([
    {
      id: 1,
      name: 'Nissan Skyline GT-R (Hakosuka)',
      image: 'hakosuka.gif',
      description: 'Classic GT-R with a straight-6 engine, known for its aggressive boxy styling.',
      year: 1971,
      origin: 'Japan',
      horsepower: 160,
      engine: 'S20 2.0L Inline-6',
      topSpeed: 200
    },
    {
      id: 2,
      name: 'Toyota Corolla AE86',
      image: 'ae86.gif',
      description: 'The legendary drift car, popularized by the anime Initial D.',
      year: 1983,
      origin: 'Japan',
      horsepower: 130,
      engine: '4A-GE 1.6L Inline-4',
      topSpeed: 210
    },
    {
      id: 3,
      name: 'Honda Civic EG6',
      image: 'eg6.jpg',
      description: 'Lightweight VTEC-powered hatchback loved by tuners.',
      year: 1992,
      origin: 'Japan',
      horsepower: 160,
      engine: 'B16A 1.6L Inline-4',
      topSpeed: 220
    },
    {
      id: 4,
      name: 'Datsun 240Z',
      image: 'z240.gif',
      description: 'The iconic Fairlady Z, praised for its performance and affordability.',
      year: 1970,
      origin: 'Japan',
      engine: 'L24 2.4L Inline-6',
      horsepower: 150,
      topSpeed: 210
    }
  ]);

  constructor() {}

  getCars() {
    return this.carsSubject.asObservable();
  }

  getCarById(id: number): Car | undefined {
    const cars = this.carsSubject.getValue(); // Get the current cars from the BehaviorSubject
    return cars.find(car => car.id === id);
  }

  addCar(carData: Partial<Car>): void {
    const currentCars = this.carsSubject.getValue();
    const newId = currentCars.length + 1;

    const newCar: Car = {
      id: newId,
      name: carData.name || 'Untitled Car',
      year: carData.year || 2000,
      origin: carData.origin || 'Unknown',
      description: carData.description || 'No description provided.',
      image: carData.image ? `assets/${carData.image}` : 'assets/default.jpg',
      horsepower: carData.horsepower,
      engine: carData.engine,
      topSpeed: carData.topSpeed
    };

    this.carsSubject.next([...currentCars, newCar]);
  }

  deleteCar(id: number): void {
    const updatedCars = this.carsSubject.getValue().filter(car => car.id !== id);
    this.carsSubject.next(updatedCars);
  }
  updateCar(id: number, updatedData: Partial<Car>): void {
    const currentCars = this.carsSubject.getValue();
    const carIndex = currentCars.findIndex(car => car.id === id);

    if (carIndex !== -1) {
      const updatedCar = { ...currentCars[carIndex], ...updatedData };
      const updatedCars = [...currentCars];
      updatedCars[carIndex] = updatedCar;
      this.carsSubject.next(updatedCars);
    }
  }
}
