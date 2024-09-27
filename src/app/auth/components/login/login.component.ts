import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import {
  ApiErrorResponse,
  LoginRequestUserInterface,
  ResponseUserInterface,
} from '../../types/user.interface';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // ngOnInit() {
  //   this.authService.getAuthStatus().subscribe(isAuth => {
  //     this.isAuthenticated = isAuth;
  //   });
  // }
  errorMessages: string[] = []; // Array to store error messages
  loginForm: FormGroup;
  errorDetails: { key: string, messages: string[] }[] = [];  // Array to hold error key and messages

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const loginRequest: LoginRequestUserInterface = {
      user: {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      },
    };

    this.authService.login(loginRequest).subscribe({
      next: () => {
        this.errorMessages = []; // clear previous errors
        console.log('Login Request:', loginRequest);
        console.log(this.authService.tokenKey);

      },
      error: (errorResponse: ApiErrorResponse) => {
        // Clear previous errors
        this.errorDetails = [];

        // Loop over the error keys and store both the key and messages
        for (const key in errorResponse.errors) {
          if (errorResponse.errors.hasOwnProperty(key)) {
            this.errorDetails.push({ key: key, messages: errorResponse.errors[key] });
          }
        }
      }
      });
    }

  // private handleErrors(error: ApiErrorResponse) {
  //   // Clear the error array before adding new errors
  //   this.errorMessages = [];

  //   // Assuming error.errors has the structure defined in your ErrorResponse interface
  //   if (error && error.errors) {
  //     // Iterate over each field (e.g., email, password) and its associated error messages
  //     Object.keys(error.errors).forEach((field) => {
  //       const fieldErrors = error.errors[field]; // This will be a string[]
  //       this.errorMessages.push(...fieldErrors); // Append each error message to the errorMessages array
  //     });
  //   }
  // }
}
