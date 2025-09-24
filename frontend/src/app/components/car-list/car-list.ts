import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CarService, Car } from '../../services/cars';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, TableModule, CardModule],
  templateUrl: './car-list.html',
})
export class CarList implements OnInit {
  cars: Car[] = [];
  filteredCars: Car[] = [];
  currentSortKey: keyof Car = 'origin';
  ascending = true;

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.carService.getCars().subscribe(data => {
      this.cars = data;
      this.filteredCars = [...data]; // initialize filtered view
    });
  }

  addCar(): void {
    this.router.navigate(['/add-car']);
  }

  deleteCar(id: number): void {
    if (confirm('Are you sure you want to delete this car?')) {
      this.carService.deleteCar(id).subscribe(() => {
        this.cars = this.cars.filter(c => c.id !== id);
        this.filteredCars = this.filteredCars.filter(c => c.id !== id);
      });
    }
  }

  editCar(id: number): void {
    this.router.navigate(['/edit-car', id]);
  }

  goToCarDetails(id: number): void {
    this.router.navigate(['/car', id]);
  }

  onFilterChange(origin: string): void {
    if (!origin) {
      this.filteredCars = [...this.cars];
    } else {
      this.filteredCars = this.cars.filter(c => c.origin.toLowerCase() === origin.toLowerCase());
    }
  }

  onSortChange(key: keyof Car): void {
    if (this.currentSortKey === key) {
      this.ascending = !this.ascending;
    } else {
      this.currentSortKey = key;
      this.ascending = true;
    }

    this.filteredCars.sort((a, b) => {
      const valueA = a[this.currentSortKey];
      const valueB = b[this.currentSortKey];

      if (valueA == null) return 1;
      if (valueB == null) return -1;

      if (valueA < valueB) return this.ascending ? -1 : 1;
      if (valueA > valueB) return this.ascending ? 1 : -1;
      return 0;
    });
  }
}
