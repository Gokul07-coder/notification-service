import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignupserviceService } from './signupservice.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    RouterLink,
    FormsModule,
    LoginComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  userName!: String;
  phoneNumber!: number;
  password!: String;
  confirmPassword!: String;
  errorMessage: String = '';
  isNameValid: boolean = true;
  isConfirmPasswordValid: boolean = true;
  isNumberValid: boolean = true;
  isPasswordValid: boolean = true;
  isError: boolean = true;
  signupService: SignupserviceService;
  apiSuccess: boolean = false;

  constructor(private http: HttpClient) {
    this.signupService = new SignupserviceService(http);
  }

  signup() {
    if (
      !(
        this.checkName(this.userName) &&
        this.checkNumber(this.phoneNumber) &&
        this.checkPassword(this.password) &&
        this.checkConfirmPassword(this.confirmPassword)
      )
    ) {
      return;
    }
    // call the signup service
    this.signupService
      .registerUser(
        this.userName,
        this.phoneNumber,
        this.password,
        this.confirmPassword
      )
      .subscribe(
        (response) => {
          this.apiSuccess = true;
          setTimeout(() => {
            window.location.href = '/login';
          }, 5000);
        },
        (error) => {
          this.isError = true;
          this.errorMessage = error.error.error;
          console.error('Error:', error);
        }
      );
  }

  checkName(value: String) {
    if (value.length < 3) {
      this.isNameValid = false;
      return false;
    } else {
      this.isNameValid = true;
      return true;
    }
  }

  checkNumber(value: number): boolean {
    this.phoneNumber = value;
    const valueToCheck = value;
    this.isNumberValid = !isNaN(Number(value));
    const regex = /^\d{10}$/;
    if (!regex.test(value.toString())) {
      this.isNumberValid = false;
      return false;
    }

    if (!this.isNumberValid) {
      this.phoneNumber = 0;
      return false;
    }
    return true;
  }

  checkPassword(value: String) {
    this.password = value;
    if (value.length < 8) {
      this.isPasswordValid = false;
      this.password = '';
      return false;
    } else {
      this.isPasswordValid = true;
      return true;
    }
  }

  checkConfirmPassword(value: String) {
    this.confirmPassword = value;
    if (value !== this.password) {
      this.isConfirmPasswordValid = false;
      this.confirmPassword = '';
      return false;
    } else {
      this.isConfirmPasswordValid = true;
      return true;
    }
  }
}
