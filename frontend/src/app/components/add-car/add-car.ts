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
import { Textarea } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    Textarea,
    ButtonModule,
    CardModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './add-car.html',
})
export class AddCarComponent {
  carForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.carForm = this.fb.group({
      name: ['', Validators.required],
      year: [null, [Validators.required, Validators.min(1900), Validators.max(2025)]],
      origin: ['', Validators.required],
      description: [''],
      image: [''],
      horsepower: [null],
      top_speed: [null],
      engine: ['']
    });
  }

  onSubmit() {
    if (this.carForm.valid) {
      // Convert values to proper types
      const payload = {
        ...this.carForm.value,
        year: Number(this.carForm.value.year),
        horsepower: this.carForm.value.horsepower ? Number(this.carForm.value.horsepower) : null,
        top_speed: this.carForm.value.top_speed ? Number(this.carForm.value.top_speed) : null,
      };

      this.carService.addCar(payload).subscribe({
        next: (response) => {
          // Success toast
          this.messageService.add({
            severity: 'success',
            summary: 'Success!',
            detail: `${payload.name} has been added to the collection`,
            life: 3000
          });

          // Navigate after showing toast
          setTimeout(() => {
            this.router.navigate(['/carlist']);
          }, 1500);
        },
        error: (err) => {
          console.error('Failed to add car', err);

          // Error toast
          this.messageService.add({
            severity: 'error',
            summary: 'Failed to Add Car',
            detail: 'Something went wrong. Please try again.',
            life: 3000
          });
        }
      });
    } else {
      // Validation warning toast
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail: 'Please fill in all required fields correctly',
        life: 3000
      });

      // Mark all fields as touched to show validation errors
      Object.keys(this.carForm.controls).forEach(key => {
        this.carForm.get(key)?.markAsTouched();
      });
    }
  }

  cancel() {
    // Check if form has been modified
    if (this.carForm.dirty) {
      this.messageService.add({
        severity: 'info',
        summary: 'Cancelled',
        detail: 'Changes discarded',
        life: 2000
      });
    }

    setTimeout(() => {
      this.router.navigate(['/carlist']);
    }, 500);
  }
}
