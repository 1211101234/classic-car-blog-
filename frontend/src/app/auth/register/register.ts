import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html'
})
export class RegisterComponent {
  user: User = { username: '', email: '', password: '' };
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.user.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    const registered = this.authService.register(this.user);

    if (!registered) {
      this.errorMessage = 'User with this username or email already exists.';
      return;
    }

    this.successMessage = 'Registration successful! Redirecting to login...';

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);
  }
}
