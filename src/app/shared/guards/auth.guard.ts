import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.getAuthStatus().pipe(
      map(isAuth => {
        if (isAuth) {
          return true;  // Allow access
        } else {
          this.router.navigate(['/login']);
          return false;  // Deny access
        }
      })
    );
  }
}
