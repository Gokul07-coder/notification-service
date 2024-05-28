import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SignupserviceService {
  private apiUrl = `${environment.API_URL}${environment.API_PREFIX}/register`;
  constructor(private http: HttpClient) {}

  registerUser(
    userName: String,
    phoneNumber: number,
    password: String,
    confirmPassword: String
  ) {
    return this.http.post(
      this.apiUrl,
      { userName, phoneNumber, password, confirmPassword },
      { observe: 'response' }
    );
  }
}
