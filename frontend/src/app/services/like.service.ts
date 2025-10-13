import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LikeResponse {
  liked: boolean;
  like_count: number;
  car_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private apiUrl = 'http://localhost:8000/api'; // root API URL

  constructor(private http: HttpClient) {}

  // Create headers with Authorization token if available
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // --- Toggle like/unlike for a car ---
  toggleLike(carId: number): Observable<LikeResponse> {
    return this.http.post<LikeResponse>(
      `${this.apiUrl}/cars/${carId}/like/`,
      {},
      { headers: this.getAuthHeaders() }
    );
  }
}
