import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/auth.service';
import { NotificacionService } from '../../service/notificacion.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  user: any;
  notificationsNumber!: number;
  constructor(
    private authService: LoginService,
    private notificationService: NotificacionService
  ) {
    if (this.isLogged()) {
      this.getNotifications();
    }
    console.log(authService.loggedIn());
  }

  isLogged() {
    return this.authService.loggedIn();
  }

  isAdmin() {
    return this.userInfo()?.rol[0]?.name === 'Administrador';
  }

  userInfo() {
    return localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') || '')
      : {};
  }

  logOut() {
    this.authService.logout();
  }

  getNotifications() {
    this.notificationService.getNotifications().subscribe((res) => {
      if (!res) {
        Swal.fire('Error', 'Hubo un error en la petición', 'error');
        return;
      }
      if (typeof res === 'object') {
        const response = res as any;
        this.notificationsNumber = response.notificaciones.length;
      }
    });
  }
}
