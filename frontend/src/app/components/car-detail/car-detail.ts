import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CarService } from '../../services/cars';
import { Car } from '../../models/car';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './car-detail.html',
})
export class CarDetail implements OnInit {
  car$!: Observable<Car>;

  constructor(private route: ActivatedRoute, private carService: CarService) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null;

    if (id !== null) {
      this.car$ = this.carService.getCarById(id);
    } else {
      console.error('Invalid car ID');
    }
  }
}
