import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  usernameOrEmail = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.errorMessage = '';

    if (!this.usernameOrEmail || !this.password) {
      this.errorMessage = 'Please enter username/email and password.';
      return;
    }

    this.isLoading = true;

    this.authService.login(this.usernameOrEmail, this.password).subscribe({
      next: (res: any) => {
        this.isLoading = false;

        // Make sure backend returns user object
        if (res.user) {
          this.authService.setLoggedInUser(res.user);
          this.router.navigate(['/']); // Redirect to home or dashboard
        } else {
          this.errorMessage = 'Unexpected response from server.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.detail || 'Invalid username/email or password.';
      }
    });
  }
}
