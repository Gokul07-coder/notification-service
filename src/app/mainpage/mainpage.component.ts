import { Component } from '@angular/core';

@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [],
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.css',
})
export class MainpageComponent {
  constructor() {}

  ngOnInit() {
    const token = localStorage.getItem('x-auth-token');
    if (!token) {
      window.location.href = '/login';
    }
  }
}
