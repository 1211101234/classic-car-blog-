import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Car } from '../../models/car';
import { selectCarById } from '../../store/car.selector';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './car-detail.html',

})
export class CarDetail implements OnInit {
  car$!: Observable<Car | undefined>;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.car$ = this.store.select(selectCarById(id));
  }
}
