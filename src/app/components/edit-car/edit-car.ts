import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectCarById } from '../../store/car.selector';
import { CommonModule } from '@angular/common';
import { editCar } from '../../store/car.actions';
import { Car } from '../../models/car';

@Component({
  selector: 'app-edit-car',
  standalone: true,
  templateUrl: './edit-car.html',
  imports: [ReactiveFormsModule, CommonModule]
})
export class EditCar implements OnInit {
  carForm!: FormGroup;
  carId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carId = +this.route.snapshot.paramMap.get('id')!;

    this.store.select(selectCarById(this.carId)).subscribe((car) => {
      if (!car) {
        alert('Car not found!');
        this.router.navigate(['/']);
        return;
      }

      this.carForm = this.fb.group({
        name: [car.name, Validators.required],
        year: [car.year, Validators.required],
        origin: [car.origin, Validators.required],
        description: [car.description],
        image: [car.image],
        horsepower: [car.horsepower],
        topSpeed: [car.topSpeed]
      });
    });
  }

  onSubmit() {
    if (this.carForm.valid) {
      const updatedCar: Car = {
        id: this.carId,
        ...this.carForm.value
      };
      this.store.dispatch(editCar({ car: updatedCar }));
      this.router.navigate(['/']);
    }
  }
}
