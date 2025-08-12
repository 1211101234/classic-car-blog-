import { Injectable } from '@angular/core';

export interface User {
  email: string;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: User[] = [];
  private loggedInUser: User | null = null;

  constructor() {
    // Load users from localStorage on service init
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
      console.log('Loaded users from localStorage:', this.users);
    }

    // Load loggedInUser from localStorage
    const storedLoggedInUser = localStorage.getItem('loggedInUser');
    if (storedLoggedInUser) {
      this.loggedInUser = JSON.parse(storedLoggedInUser);
      console.log('Loaded logged-in user from localStorage:', this.loggedInUser);
    }
  }

  register(user: User): boolean {
    const exists = this.users.some(
      u => u.username === user.username || u.email === user.email
    );
    if (exists) {
      console.log('Registration failed: user exists', user);
      return false;
    }

    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
    console.log('User registered:', user);
    return true;
  }

  login(usernameOrEmail: string, password: string): boolean {
    // Always refresh users from storage to stay in sync
    const storedUsers = localStorage.getItem('users');
    this.users = storedUsers ? JSON.parse(storedUsers) : [];

    console.log('Trying login with:', usernameOrEmail, password);
    console.log('Users:', this.users);

    const foundUser = this.users.find(
      u =>
        (u.username === usernameOrEmail || u.email === usernameOrEmail) &&
        u.password === password
    );

    console.log('Matched user:', foundUser);

    if (foundUser) {
      this.loggedInUser = foundUser;
      localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
      return true;
    }

    return false;
  }

  isLoggedIn(): boolean {
    return this.loggedInUser !== null || !!localStorage.getItem('loggedInUser');
  }

  logout(): void {
    this.loggedInUser = null;
    localStorage.removeItem('loggedInUser');
    console.log('User logged out');
  }

  getLoggedInUser(): User | null {
    if (this.loggedInUser) return this.loggedInUser;

    const stored = localStorage.getItem('loggedInUser');
    if (stored) {
      this.loggedInUser = JSON.parse(stored);
      return this.loggedInUser;
    }
    return null;
  }

  getUsername(): string {
    const user = this.getLoggedInUser();
    return user ? user.username : '';
  }
}
export interface AuthGuardService {
  isLoggedIn(): boolean;
  getLoggedInUser(): User | null;
  logout(): void;
}
