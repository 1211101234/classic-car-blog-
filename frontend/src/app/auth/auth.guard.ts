import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [];
  private loggedInUser: User | null = null;

  constructor() {
    // Restore users from localStorage
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }

    // Restore logged-in user if already logged in
    const storedLoggedInUser = localStorage.getItem('loggedInUser');
    if (storedLoggedInUser) {
      this.loggedInUser = JSON.parse(storedLoggedInUser);
    }
  }

  register(user: User) {
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  login(username: string, password: string) {
    const foundUser = this.users.find(
      stored => stored.username === username && stored.password === password
    );
    if (foundUser) {
      this.loggedInUser = foundUser;
      localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    return this.loggedInUser !== null;
  }

  getLoggedInUser(): User | null {
    return this.loggedInUser;
  }

  logout() {
    this.loggedInUser = null;
    localStorage.removeItem('loggedInUser');
  }
}
