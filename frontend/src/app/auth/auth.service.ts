import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/users/';

  constructor(private http: HttpClient) {}

  /** Register user via backend API */
  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}create/`, user);
  }

  /** Login user via backend API */
  login(usernameOrEmail: string, password: string): Observable<any> {
    // Assuming you have a Django endpoint for login (JWT or session)
    return this.http.post(`${this.apiUrl}login/`, {
      usernameOrEmail,
      password,
    });
  }

  /** Store logged in user locally (optional, for session) */
  setLoggedInUser(user: User) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  getLoggedInUser(): User | null {
    const stored = localStorage.getItem('loggedInUser');
    return stored ? JSON.parse(stored) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getLoggedInUser();
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
  }
}
