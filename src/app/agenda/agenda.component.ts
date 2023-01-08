import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { AgendaI, DiaClassI } from '../interfaces/agenda';
import { AgendaService } from '../service/agenda.service';
import { LoginService } from '../service/auth.service';
import { CompanyService } from '../service/company.service';
import { UserService } from '../service/user.service';
import { ProfesorService } from '../service/profesor.service';
import { ProfesorI } from '../interfaces/profesor';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
})
export class AgendaComponent implements OnInit {
  shechedules: AgendaI[] = [];
  day!: string;
  socios: any;
  showModal: boolean = false;
  company: any;
  sheduleAgenda: any;
  dayAgenda!: any;
  hour: any;
  profesores!: ProfesorI[];
  cancheros: any;

  sociosForm: FormGroup = this.fb.group({
    socio1: [{}],
    socio2: [{}],
    socio3: [{}],
    socio4: [{}],
  });

  constructor(
    private fb: FormBuilder,
    private authService: LoginService,
    private agendaService: AgendaService,
    private companyService: CompanyService,
    private userService: UserService,
    private profesorService: ProfesorService
  ) {
    this.getHorarios();
    this.getProfesores();
    this.getCancheros();
  }

  ngOnInit(): void {}

  userInfo() {
    return localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') || '')
      : undefined;
  }

  isLogged() {
    return this.authService.loggedIn();
  }

  isSocio() {
    if (!this.userInfo()) {
      return false;
    }
    return this.userInfo()?.rol[0]?.name === 'Socio';
  }

  isProfesor() {
    if (!this.userInfo()) {
      return false;
    }
    return this.userInfo()?.rol[0]?.name === 'Profesor';
  }

  isAdmin() {
    if (!this.userInfo()) {
      return false;
    }
    return this.userInfo().rol[0].name === 'Administrador';
  }

  getHorarios() {
    this.agendaService.getHorarios().subscribe((horarios: AgendaI[]) => {
      this.shechedules = horarios;
    });
  }

  getProfesores() {
    this.profesorService
      .getProfesores()
      .subscribe((profesores: ProfesorI[]) => {
        this.profesores = profesores;
      });
  }

  schedule(shechedule: any, hour: any, day: DiaClassI) {
    if (day?.autor1 && this.isSocio()) {
      this.showModal = false;
      Swal.fire('Franja asignada', 'Esta franja ya ha sido asignada', 'info');
      return;
    } else {
      this.showModal = true;
      this.getUsers();
      this.day = `${day.dia} ${day.fecha} ${day.turno}`;
      this.preAgenda(day, shechedule, day.turno, day.fecha);
      this.sheduleAgenda = shechedule;
      this.hour = hour;
      this.dayAgenda = day;

      if (this.isProfesor() && day?.autor1) {
        // this.preAsistio(day.fecha);
        this.showModal = false;
        if (this.dayAgenda.profesor !== this.userInfo().nombre) {
          this.showModal = false;
          Swal.fire(
            'No estás asociado a esta franja',
            'No puedes editar este registro ya que no estas asociado para este turno.',
            'info'
          );
        }
      }
    }
  }

  deleteHorario(scheduleId: string) {
    Swal.fire({
      title: 'Eliminar horario',
      text: '¿Desea eliminar el horario?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Continuar',
    }).then((respuesta) => {
      if (respuesta.isConfirmed) {
        this.agendaService.deleteHorario(scheduleId).subscribe((res) => {
          this.getHorarios();
          Swal.fire('Excelente', 'Horario eliminado', 'success');
        });
      }
    });
  }

  showAsistencia() {
    return !!this.dayAgenda.autor1;
  }

  noShowModal() {
    this.showModal = false;
  }

  getUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.socios = users.filter(
        (user: any) => user.rol[0].name === 'Socio' && user.activo === true
        // user.nombre != this.userInfo().nombre
      );
    });
  }

  getCancheros() {
    this.userService.getUsers().subscribe((users) => {
      this.cancheros = users?.filter(
        (user: any) => user.rol[0].name === 'Canchero'
      );
    });
  }

  preAgenda(
    classDay: DiaClassI,
    schedule: any,
    turno: string,
    turnDate: string
  ) {
    this.companyService.getCompany().subscribe((resp) => {
      this.company = resp.message;
    });

    let turn = 0;
    if (turno.slice(5).substring(0, 2) === 'am') {
      turn =
        Number(turno.substring(0, 2)) * 60 +
        Number(turno.slice(3).substring(0, 2));
    }
    if (turno.slice(5).substring(0, 2) === 'pm') {
      if (turno.substring(0, 2) === '12') {
        turn =
          Number(turno.substring(0, 2)) * 60 +
          Number(turno.slice(3).substring(0, 2));
      } else {
        turn =
          Number(turno.substring(0, 2)) * 60 +
          Number(turno.slice(3).substring(0, 2)) +
          720;
      }
    }
    const ahora = new Date().getHours() * 60 + new Date().getMinutes();
    const apAm =
      new Date(this.company?.aperturaAm).getHours() * 60 +
      new Date(this.company?.aperturaAm).getMinutes();
    const apPm =
      new Date(this.company?.aperturaPm).getHours() * 60 +
      new Date(this.company?.aperturaPm).getMinutes();
    const cierrAm =
      new Date(this.company?.cierreAm).getHours() * 60 +
      new Date(this.company?.cierreAm).getMinutes();
    const cierrPm =
      new Date(this.company?.cierrePm).getHours() * 60 +
      new Date(this.company?.cierrePm).getMinutes();
    const hoy = new Date();
    const manan = new Date().setDate(new Date().getDate() + 1);
    const day =
      hoy.getMonth() + 1 + '/' + hoy.getDate() + '/' + hoy.getFullYear();
    const manana = new Date(manan).toLocaleDateString('en-US');
    // if (new Date(turnDate).getTime() < new Date(day).getTime()) {
    //   this.showModal = false;
    //   Swal.fire(
    //     'Fecha inválida',
    //     'No se pueden agendar turnos ya con fechas vencidas',
    //     'info'
    //   );
    //   return;
    // }
    // if (new Date(turnDate).getTime() === new Date(day).getTime()) {
    //   if (ahora > turn) {
    //     this.showModal = false;
    //     Swal.fire(
    //       'Turno ya no es válido',
    //       'No se pueden agendar un turno pasada la hora del mismo',
    //       'info'
    //     );
    //     return;
    //   }
    // }
    // if (new Date(turnDate).getTime() > new Date(manana).getTime()) {
    //   this.showModal = false;
    //   Swal.fire(
    //     'Turno aún no válido',
    //     'No se puede agendar turno con más de un día de anticipación',
    //     'info'
    //   );
    //   return;
    // }
    // if (
    //   (ahora < apAm || ahora > cierrAm) &&
    //   (ahora < apPm || ahora > cierrPm)
    // ) {
    //   this.showModal = false;
    //   Swal.fire(
    //     'Hora inválida',
    //     'No se puede agendar turno fuera del horario establecido.',
    //     'info'
    //   );
    //   return;
    // }

    // Swal.fire({
    //   title: 'Solicitar turno',
    //   text: 'Para agendar este turno por favor clic en: "Continuar".',
    //   icon: 'info', //success , warning, info, error
    // }).then((respuesta) => {
    //   if (respuesta) {
    //     const updateSchedule = {
    //       dia: classDay.dia,
    //       indice: schedule.indice,
    //       autor1: schedule.autor1,
    //       codigoAutor1: schedule.codigoAutor1,
    //       socio1: schedule.socio1,
    //       socio2: schedule.socio2,
    //       socio3: schedule.socio3,
    //       socio4: schedule.socio4,
    //       autor2: schedule.autor2,
    //       autor3: schedule.autor3,
    //       autor4: schedule.autor4,
    //       solicita: schedule.solicita,
    //     };
    //     this.agenda(schedule._id, updateSchedule);
    //   }
    // });
  }

  preAsistio(fecha: any) {
    const today = new Date();
    var day =
      today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear();
    var hora = today.getHours() + ':' + today.getMinutes();
    if (new Date().getTime() < new Date(fecha).getTime()) {
      Swal.fire(
        'El usuario aun no asiste a este turno',
        'No se puede validar la asistencia antes de la fecha del turno',
        'info'
      );
      return;
    }
    if (new Date().getTime() > new Date(fecha).getTime()) {
      Swal.fire(
        'El turno ya no es valido',
        'No se puede validar la asistencia despues de la fecha del turno',
        'info'
      );
    }
  }

  configureHorario() {
    const scheduleId = this.sheduleAgenda._id;
    const updateBody = {
      profesor: this.userInfo()._id,
    };
    this.agendaService
      .configureHorario(scheduleId, updateBody)
      .subscribe((resp) => {
        Swal.fire(
          'Asignación correcta',
          'Se asigno correctamente al turno',
          'success'
        );
        this.getHorarios();
      });
  }

  agenda() {
    const today = new Date();
    const day =
      today.getDate() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getFullYear();
    const hour =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    const updateSchedule = {
      dia: this.dayAgenda.dia,
      indice: this.hour.indice,
      autor1: this.userInfo()._id,
      codigoAutor1: this.sheduleAgenda.codigoAutor1,
      socio1: this.userInfo().nombre,
      socio2: this.sociosForm.value.socio2.nombre,
      socio3: this.sociosForm.value.socio3.nombre,
      socio4: this.sociosForm.value.socio4.nombre,
      autor2: this.sociosForm.value.socio2._id,
      autor3: this.sociosForm.value.socio3._id,
      autor4: this.sociosForm.value.socio4._id,
      horaSolicitud: `${day} ${hour}`,
      solicita: 'Turno',
    };

    this.agendaService
      .solicitarTurno(this.sheduleAgenda._id, updateSchedule)
      .subscribe((resp) => {
        console.log(resp);
      });

    if (this.company.aleatorio) {
      Swal.fire(
        'Excelente',
        'Se ha registrado con éxito tu solicitud, recuerda que debes esperar el tiempo de la aleatoriedad para verificar si aplicaste.',
        'success'
      ).then((result) => {
        if (result.isConfirmed) {
          this.getHorarios();
        }
      });
    } else {
      Swal.fire(
        'Excelente',
        'Se ha registrado con éxito tu agenda',
        'success'
      ).then((result) => {
        if (result.isConfirmed) {
          this.getHorarios();
        }
      });
    }
  }
}
