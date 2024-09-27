import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiErrorResponse, LoginRequestUserInterface, SignUpRequestUserInterface } from '../../types/user.interface';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule,RouterLink, FormsModule,ReactiveFormsModule, CommonModule ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  errorMessages: string[] = []; // Array to store error messages
  signupForm: FormGroup;
  errorDetails: { key: string, messages: string[] }[] = [];  // Array to hold error key and messages

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }
    const signUpRequest: SignUpRequestUserInterface = {
      user: {
        username: this.signupForm.value.username,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password
      },
    };

    this.authService.signUp(signUpRequest).subscribe({
      next: () => {
        this.errorMessages = []; // clear previous errors
        console.log('Login Request:', signUpRequest);
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


}
