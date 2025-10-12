import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarService } from '../../services/cars';
import { Car } from '../../models/car';

// PrimeNG modules
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { Textarea } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-car',
  standalone: true,
  templateUrl: './edit-car.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    InputNumberModule,
    Textarea,
    ToastModule,
  ],
  providers: [MessageService],
})
export class EditCar implements OnInit {
  carForm: FormGroup;
  carId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private carService: CarService,
    private router: Router,
    private messageService: MessageService
  ) {
    // Initialize form with default values to avoid undefined errors
    this.carForm = this.fb.group({
      name: ['', Validators.required],
      year: ['', Validators.required],
      origin: ['', Validators.required],
      description: [''],
      image: [''],
      horsepower: [''],
      top_speed: ['', Validators.required], // must have top_speed
      engine: [''],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      this.messageService.add({
        severity: 'error',
        summary: 'Invalid ID',
        detail: 'Car ID is missing or invalid',
        life: 3000
      });
      this.router.navigate(['/carlist']);
      return;
    }

    this.carId = +idParam;

    // Fetch the car data from backend
    this.carService.getCarById(this.carId).subscribe({
      next: (car) => {
        if (!car) {
          this.messageService.add({
            severity: 'error',
            summary: 'Not Found',
            detail: 'Car not found in the database',
            life: 3000
          });
          this.router.navigate(['/carlist']);
          return;
        }
        // Patch the form with existing car data
        this.carForm.patchValue({
          ...car,
          top_speed: car.top_speed ?? '', // ensure top_speed exists
        });

        // Show success message when data loads
        this.messageService.add({
          severity: 'info',
          summary: 'Data Loaded',
          detail: `Editing ${car.name}`,
          life: 2000
        });
      },
      error: (err) => {
        console.error('Failed to load car:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Load Failed',
          detail: 'Failed to load car data from server',
          life: 3000
        });
        this.router.navigate(['/carlist']);
      },
    });
  }

  onSubmit() {
    if (this.carForm.valid) {
      // Convert top_speed and horsepower to numbers
      const payload = {
        ...this.carForm.value,
        top_speed: Number(this.carForm.value.top_speed),
        horsepower: this.carForm.value.horsepower
          ? Number(this.carForm.value.horsepower)
          : null,
      };

      console.log('Submitting payload:', payload);

      this.carService.updateCar(this.carId, payload).subscribe({
        next: () => {
          // Success toast
          this.messageService.add({
            severity: 'success',
            summary: 'Success!',
            detail: 'Car details updated successfully',
            life: 3000
          });

          // Navigate after a short delay to show the toast
          setTimeout(() => {
            this.router.navigate(['/carlist']);
          }, 1500);
        },
        error: (err) => {
          console.error('Update failed:', err);

          // Error toast
          this.messageService.add({
            severity: 'error',
            summary: 'Update Failed',
            detail: 'Failed to update car. Please try again.',
            life: 3000
          });
        },
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

  cancelEdit() {
    this.messageService.add({
      severity: 'info',
      summary: 'Cancelled',
      detail: 'Changes discarded',
      life: 2000
    });

    setTimeout(() => {
      this.router.navigate(['/carlist']);
    }, 500);
  }
}
