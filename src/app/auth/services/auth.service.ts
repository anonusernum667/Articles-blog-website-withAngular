import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiErrorResponse, LoginRequestUserInterface, SignUpRequestUserInterface, user } from '../types/user.interface';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
   tokenKey = '';
   username = '';
  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private router: Router, private http:HttpClient ) {
    this.authStatus.next(this.isAuthenticated());

  }
  signUp(user:SignUpRequestUserInterface) {
    return this.http.post<user>(`${environment.mainApiUrl}/users`, user).pipe(
      tap(response => {

          // Update the auth status
        alert('Signed up succefully, please login');
        this.router.navigate(['/login']);
      }),
      catchError(this.handleError)
    );
  }
  login(credentials: LoginRequestUserInterface) {
    return this.http.post<user>(`${environment.mainApiUrl}/users/login`, credentials).pipe(

      tap(response => {
        this.storeToken(response.user.token);
        this.username = response.user.username
        this.authStatus.next(true);  // Update the auth status

        this.router.navigate(['/home']);
      }),
      catchError(this.handleError)
    );
  }
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey); // Ensure tokenKey matches the one used for storing
  }
  logout(){
    localStorage.removeItem(this.tokenKey);
    this.authStatus.next(false);  // Update the auth status

    this.router.navigate(['/login']);
  }
  private storeToken(token: string) {
    localStorage.setItem(this.tokenKey, token); // Ensure tokenKey is defined properly
  }

  private handleeError(error: HttpErrorResponse) {
    // Customize this as needed
    console.error('Login error:', error);
    return of(null); // return observable with null or handle as per your requirement
  }

  getAuthStatus() {
    return this.authStatus.asObservable();
  }
  getToken(): string | null {

    return this.tokenKey || localStorage.getItem(this.tokenKey);
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: ApiErrorResponse = { errors: {} };

    if (error.error.errors) {
      // Use the exact error structure returned by the server
      errorMessage = error.error as ApiErrorResponse;
    } else if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage.errors['general'] = [error.error.message];
    } else {
      // Server-side error without the expected structure
      errorMessage.errors['general'] = [`Error Code: ${error.status}, Message: ${error.message}`];
    }

    return throwError(() => errorMessage);
  }
}
