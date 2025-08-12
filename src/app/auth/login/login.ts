import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
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

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.errorMessage = '';

    if (!this.usernameOrEmail || !this.password) {
      this.errorMessage = 'Please enter username/email and password.';
      return;
    }

    const success = this.authService.login(this.usernameOrEmail, this.password);

    if (success) {
      this.router.navigate(['/']);
    } else {
      this.errorMessage = 'Invalid username/email or password.';
    }
  }
}
