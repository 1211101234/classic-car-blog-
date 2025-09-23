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
    ButtonModule,
    CardModule,
    InputTextModule,
    InputNumberModule,
    TextareaModule,
  ],
})
export class EditCar implements OnInit {
  carForm: FormGroup;
  carId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private carService: CarService,
    private router: Router
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
      alert('Invalid car ID!');
      this.router.navigate(['/cars']);
      return;
    }

    this.carId = +idParam;

    // Fetch the car data from backend
    this.carService.getCarById(this.carId).subscribe({
      next: (car) => {
        if (!car) {
          alert('Car not found!');
          this.router.navigate(['/cars']);
          return;
        }
        // Patch the form with existing car data
        this.carForm.patchValue({
          ...car,
          top_speed: car.top_speed ?? '', // ensure top_speed exists
        });
      },
      error: (err) => {
        console.error('Failed to load car:', err);
        alert('Failed to load car data.');
        this.router.navigate(['/cars']);
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
          alert('Car updated successfully!');
          this.router.navigate(['/carlist']);
        },
        error: (err) => {
          console.error('Update failed:', err);
          alert('Failed to update car. Check console.');
        },
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }

  cancelEdit() {
    this.router.navigate(['/carlist']);
  }
}
