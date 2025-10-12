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
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.html',
})
export class LoginComponent {
  usernameOrEmail = '';
  password = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  onLogin() {
    if (!this.usernameOrEmail || !this.password) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please enter username/email and password.',
      });
      return;
    }

    this.isLoading = true;

    this.authService.login(this.usernameOrEmail, this.password).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Welcome back, ${res.username}!`,
        });
        // Redirect to home page after 1 second
        setTimeout(() => this.router.navigate(['/']), 1000);
      },
      error: (err) => {
        this.isLoading = false;
        const message = err.error?.error || 'Invalid username/email or password.';
        this.messageService.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: message,
        });
      },
    });
  }
}
