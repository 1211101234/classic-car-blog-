import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarService } from '../../services/cars';
import { Car } from '../../models/car';

// PrimeNG Modules
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    TextareaModule,
    ButtonModule,
    CardModule
  ],
  templateUrl: './add-car.html',
})
export class AddCarComponent {
  carForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private router: Router
  ) {
    this.carForm = this.fb.group({
      name: ['', Validators.required],
      year: [null, Validators.required],
      origin: ['', Validators.required],
      description: [''],
      image: [''],
      horsepower: [0],
      topSpeed: [0],
      engine: ['']
    });
  }

  onSubmit() {
    if (this.carForm.valid) {
      this.carService.addCar(this.carForm.value).subscribe({
        next: () => this.router.navigate(['/cars']),
        error: (err) => console.error('Failed to add car', err)
      });
    }
  }

  cancel() {
    this.router.navigate(['/cars']);
  }
}
