import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  user: any;

  constructor(private authService: LoginService) {
    console.log(authService.loggedIn());
  }

  isLogged() {
    return this.authService.loggedIn();
  }

  userInfo() {
    return localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') || '')
      : {};
  }

  logOut() {
    this.authService.logout();
  }
}
