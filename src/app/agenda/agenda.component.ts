import { Component, OnInit } from '@angular/core';
import { throwIfEmpty } from 'rxjs';
import Swal from 'sweetalert2';
import { AgendaI, DiaClassI } from '../interfaces/agenda';
import { AgendaService } from '../service/agenda.service';
import { LoginService } from '../service/auth.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
})
export class AgendaComponent implements OnInit {
  shechedules: AgendaI[] = [];
  day!: string;
  socios: any;

  constructor(
    private authService: LoginService,
    private agendaService: AgendaService,
    private userService: UserService
  ) {
    this.getHorarios();
  }

  ngOnInit(): void {}

  userInfo() {
    return localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') || '')
      : {};
  }

  isLogged() {
    return this.authService.loggedIn();
  }

  getHorarios() {
    this.agendaService.getHorarios().subscribe((horarios: AgendaI[]) => {
      this.shechedules = horarios;
      console.log(this.shechedules);
    });
  }

  schedule(day: DiaClassI) {
    if (day?.autor1) {
      Swal.fire('Error', 'Esta franja ya ha sido asignada', 'error');
      return;
    }
    this.getUsers();
    this.day = `${day.dia} ${day.fecha} ${day.turno}`;
  }

  getUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.socios = users.filter(
        (user: any) => user.rol[0].name === 'Socio' && user.activo === true
      );
    });
  }
}
