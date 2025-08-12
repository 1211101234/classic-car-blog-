import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../services/cars';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-edit-car',
  standalone: true,
  templateUrl: './edit-car.html',
  
  imports: [ReactiveFormsModule]
})
export class EditCar implements OnInit {
  carForm!: FormGroup;
  carId!: number;
  scrollService: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private carService: CarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carId = +this.route.snapshot.paramMap.get('id')!;
    const car = this.carService.getCarById(this.carId);

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
  }

  onSubmit() {
    if (this.carForm.valid) {
      this.carService.updateCar(this.carId, this.carForm.value);
      this.router.navigate(['/']);
    }
  }
}
