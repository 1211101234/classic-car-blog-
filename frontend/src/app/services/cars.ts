import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Comment interface
export interface Comment {
  id: number;
  car: number;
  user: string;
  parent?: number;
  content: string;
  created_at: string;
  updated_at: string;
  replies: Comment[];
}

// Car interface with likes and nested comments
export interface Car {
  id: number;
  name: string;
  year: number;
  origin: string;
  engine?: string;
  horsepower?: number;
  top_speed?: number;
  description?: string;
  image?: string; //optional
  likes_count: number;
  user_liked: boolean;
  comments: Comment[];
}

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://localhost:8000/api/cars'; // Django REST API base
  private jsonHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  // Get all cars
  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/`);
  }

  // Get single car by ID (includes likes & nested comments)
  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${id}/`);
  }

  // Add new car
  addCar(carData: Partial<Car>): Observable<Car> {
    const newCar = {
      ...carData,
      image: carData.image ? carData.image : 'assets/default.jpg'
    };
    return this.http.post<Car>(`${this.apiUrl}/`, newCar, { headers: this.jsonHeaders });
  }

  // Update existing car (PATCH for partial updates)
  updateCar(id: number, updatedData: Partial<Car>): Observable<Car> {
    const payload = {
      ...updatedData,
      image: updatedData.image ? updatedData.image : 'assets/default.jpg'
    };
    return this.http.patch<Car>(`${this.apiUrl}/${id}/`, payload, { headers: this.jsonHeaders });
  }

  // Delete car
  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/`);
  }
}
