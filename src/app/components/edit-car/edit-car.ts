import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectCarById } from '../../store/car.selector';
import { CommonModule } from '@angular/common';
import { editCar } from '../../store/car.actions';
import { Car } from '../../models/car';
import { CarList } from '../car-list/car-list';
// ✅ PrimeNG modules
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-edit-car',
  standalone: true,
  templateUrl: './edit-car.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // PrimeNG modules
    ButtonModule,
    CardModule,
    InputTextModule,
    InputNumberModule,
    TextareaModule,
  ],
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
        topSpeed: [car.topSpeed],
        engine: [car.engine]
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

  // Optional future methods
  deleteCar() {
    // TODO: Implement delete car with confirmation dialog
  }

  cancelEdit() {
    this.router.navigate(['/']);
  }
}
