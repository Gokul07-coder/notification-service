import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = `${environment.API_URL}${environment.API_PREFIX}/login`;

  constructor(private http: HttpClient) {}

  checkHealth() {
    return this.http.get(`${environment.API_URL}${environment.API_PREFIX}/health`);
  }

  login(phoneNumber: Number, password: String) {
    return this.http.post(
      this.url,
      { phoneNumber, password },
      { observe: 'response' }
    );
  }
}
