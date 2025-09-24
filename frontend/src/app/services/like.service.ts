import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LikeResponse {
  liked: boolean;
  like_count: number;
}

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private apiUrl = 'http://localhost:8000/api/cars'; // matches backend

  private jsonHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}

  // Toggle like for a car
  toggleLike(carId: number): Observable<LikeResponse> {
    return this.http.post<LikeResponse>(`${this.apiUrl}/${carId}/like/`, {}, { headers: this.jsonHeaders });
  }
}
