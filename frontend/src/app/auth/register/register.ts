import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
})
export class RegisterComponent {
  user: User = { username: '', email: '', password: '' };
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.user.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.isLoading = true;

    this.authService.register(this.user).subscribe({
      next: (res: any) => {
        this.isLoading = false;

        // Optional: store user locally after successful registration
        if (res.user) {
          this.authService.setLoggedInUser(res.user);
        }

        this.successMessage =
          'Registration successful! Redirecting to login...';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        this.isLoading = false;

        if (err.error?.username) {
          this.errorMessage = 'Username already exists.';
        } else if (err.error?.email) {
          this.errorMessage = 'Email already exists.';
        } else {
          this.errorMessage =
            err.error?.detail || 'Registration failed. Please try again.';
        }
      },
    });
  }
}
