import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectIfAuthenticatedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      // User is already authenticated
      this.router.navigate(['/home']); // Redirect to dashboard or another page
      return false; // Prevent access to login/signup
    }
    return true; // Allow access if not authenticated
  }
}
