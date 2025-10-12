import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

export interface User {
  id?: number;
  username: string;
  email?: string;
  usernameOrEmail?: string;
  token?: string;
  password?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/users/';

  // BehaviorSubject to track auth state changes
  private authStateSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  public authState$ = this.authStateSubject.asObservable();

  constructor(private http: HttpClient) {}

  /** Register a new user */
  register(user: {
    username: string;
    email: string;
    password: string;
  }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}create/`, user).pipe(
      tap((res) => {
        if (res.token) {
          this.setLoggedInUser(res);
          this.updateAuthState();
        }
      })
    );
  }

  /** Login user via username or email */
  login(usernameOrEmail: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${this.apiUrl}login/`, { usernameOrEmail, password })
      .pipe(
        tap((res) => {
          if (res.token) {
            this.setLoggedInUser(res);
            this.updateAuthState();
          }
        })
      );
  }

  /** Store logged-in user in localStorage */
  setLoggedInUser(user: User): void {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  /** Get logged-in user from localStorage */
  getLoggedInUser(): User | null {
    const stored = localStorage.getItem('loggedInUser');
    return stored ? JSON.parse(stored) : null;
  }

  /** Check if a user is logged in */
  isLoggedIn(): boolean {
    return !!this.getLoggedInUser();
  }

  /** Logout user */
  logout(): void {
    localStorage.removeItem('loggedInUser');
    this.updateAuthState();
  }

  /** Update auth state for subscribers */
  private updateAuthState(): void {
    this.authStateSubject.next(this.isLoggedIn());
  }
}
