import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    // If a user is logged in (i.e., we have a stored user or token), allow
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // Otherwise redirect to login page
    return this.router.createUrlTree(['/login']);
  }
}
