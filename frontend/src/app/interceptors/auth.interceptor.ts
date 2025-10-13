import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.authService.getLoggedInUser();
    if (user && user.token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
