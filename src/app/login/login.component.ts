import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  phoneNumber!: Number;
  password!: String;

  login() {
    console.log('Phone Number: ', this.phoneNumber);
    console.log(' Password: ', this.password);
  }
}
