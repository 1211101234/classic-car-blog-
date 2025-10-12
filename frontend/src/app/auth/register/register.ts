import { MessageModule } from 'primeng/message';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ToastModule,
    RouterModule,
    MessageModule
  ],
  providers: [MessageService],
  templateUrl: './register.html',
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  onRegister() {
    // Basic validation
    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please fill all required fields.',
      });
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Passwords do not match.',
      });
      return;
    }

    this.isLoading = true;

    this.authService.register({
      username: this.username,
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Account created for ${res.username}!`,
        });
        // Redirect to login page after 1 second
        setTimeout(() => this.router.navigate(['/login']), 1000);
      },
      error: (err) => {
        this.isLoading = false;
        // Collect error messages from Django serializer
        const errors = err.error?.errors || err.error || {};
        const message =
          errors.username?.[0] ||
          errors.email?.[0] ||
          errors.password?.[0] ||
          'Registration failed';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: message,
        });
      },
    });
  }
}
