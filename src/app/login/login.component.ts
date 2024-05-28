import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginService } from './login.service';
import {
  HttpClientModule,
  HttpClient,
  HttpResponse,
} from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  phoneNumber!: Number;
  password!: String;
  isNumberValid: boolean = true;
  isPasswordValid: boolean = true;
  loginService: LoginService;
  errorMessage: String = '';
  isError: boolean = false;
  statusCode: number = 0;
  disableButton: boolean = true;

  constructor(private http: HttpClient) {
    this.loginService = new LoginService(http);
  }

  login() {
    if (
      !(this.checkNumber(this.phoneNumber) && this.checkPassword(this.password))
    ) {
      this.disableButton = true;
    }
    this.disableButton = false;
    this.loginService.login(this.phoneNumber, this.password).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response.body);
        //set the token in localstorage
        localStorage.setItem('x-auth-token', response.body.token);
        //redirect to the main page
        window.location.href = '/welcome';
      },
      (error) => {
        this.isError = true;
        this.errorMessage = error.error.error;
      }
    );
  }

  checkNumber(value: Number): boolean {
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

  ngOnInit() {
    console.log('Login Component Initialized');
    // const x = this.loginService.checkHealth().subscribe((data) => {
    //   console.log('Health Check: ', data);
    // })
  }
}
