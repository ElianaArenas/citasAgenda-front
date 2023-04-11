import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { AgendaI, DiaClassI } from '../interfaces/agenda';
import { AgendaService } from '../service/agenda.service';
import { LoginService } from '../service/auth.service';
import { CompanyService } from '../service/company.service';
import { UserService } from '../service/user.service';
import { ProfesorService } from '../service/profesor.service';
import { ProfesorI } from '../interfaces/profesor';
import { NotificacionService } from '../service/notificacion.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
})
export class AgendaComponent {
  showLoading: boolean = false;
  cancelarTurno: boolean = false;

  shechedules: AgendaI[] = [];
  day1!: string;
  socios: any;
  socios2: any;
  socios3: any;
  socios4: any;
  showModal: boolean = false;
  company: any;
  sheduleAgenda: any;
  dayAgenda!: any;
  hour: any;
  profesores!: ProfesorI[];
  cancheros: any;
  faWarning = faWarning;

  sociosForm: FormGroup = this.fb.group({
    socio1: [{}],
    socio2: [{}],
    socio3: [{}],
    socio4: [{}],
    justificacion: ['', Validators.required],
  });

  profesorForm: FormGroup = this.fb.group({
    profesor: [{}],
    canchero: [''],
  });

  constructor(
    private fb: FormBuilder,
    private authService: LoginService,
    private agendaService: AgendaService,
    private companyService: CompanyService,
    private userService: UserService,
    private profesorService: ProfesorService,
    private notificationService: NotificacionService
  ) {
    this.getHorarios();
    this.getProfesores();
    this.getCancheros();
  }

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
    this.showLoading = true;
    console.log(this.showLoading);

    this.agendaService
      .getHorarios()
      .subscribe((horarios: AgendaI[] | boolean) => {
        if (!horarios) {
          Swal.fire('Error', 'Hubo un error en la petición', 'error');
          return;
        }
        this.shechedules = Array.isArray(horarios) ? horarios : [];

        if (!this.isAdmin()) {
          this.shechedules = this.shechedules.filter(
            (schedule) => schedule.activo
          );
        }

        this.showLoading = false;
      });
    this.showLoading = false;
  }

  getProfesores() {
    this.profesorService
      .getProfesores()
      .subscribe((profesores: ProfesorI[]) => {
        this.profesores = profesores;
      });
  }

  schedule(shechedule: any, hour: any, day: DiaClassI) {
    this.day1 = `${day.dia} ${day.fecha} ${day.turno}`;
    this.hour = hour;
    this.dayAgenda = day;
    this.sheduleAgenda = shechedule;
    if (day?.autor1 && this.isSocio()) {
      if (day?.socio1 === this.userInfo().nombre) {
        this.showModal = true;
        this.preAgenda(day, shechedule, day.turno, day.fecha, true);
        this.cancelarTurno = true;

        return;
      }
      this.cancelarTurno = false;
      this.showModal = false;
      Swal.fire('Franja asignada', 'Esta franja ya ha sido asignada', 'info');
      return;
    } else {
      this.cancelarTurno = false;
      this.showModal = true;
      this.getUsers();

      this.preAgenda(day, shechedule, day.turno, day.fecha);
      this.sheduleAgenda = shechedule;

      // this.sociosForm.get('socio1')?.setValue([{ nombre: 'hola' }],);

      if (this.isProfesor() && day?.autor1) {
        // this.preAsistio(day.fecha);
        // this.showModal = false;
        if (
          this.dayAgenda.profesor &&
          this.dayAgenda.profesor !== this.userInfo().nombre
        ) {
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

  createNotification() {
    if (this.sociosForm.invalid) {
      this.sociosForm.markAllAsTouched();
      return;
    }

    console.log(this.sheduleAgenda);

    const body = {
      user: this.userInfo().nombre,
      userId: this.userInfo()._id,
      fechaTurno: this.dayAgenda.fecha,
      horaTurno: this.dayAgenda.turno,
      diaTurno: this.dayAgenda.dia,
      indiceHora: this.hour.indice,
      justificacion: this.sociosForm.get('justificacion')?.value,
      idHorario: this.sheduleAgenda._id,
    };
    this.notificationService.createNotification(body).subscribe((res) => {
      if (!res) {
        Swal.fire('Error', 'Hubo un error en la petición', 'error');
        return;
      }
      Swal.fire(
        'Excelente',
        'Se generará una notificación al administrador',
        'success'
      );
    });
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
          if (!res) {
            Swal.fire('Error', 'Hubo un error en la petición', 'error');
            return;
          }
          this.getHorarios();
          Swal.fire('Excelente', 'Horario eliminado', 'success');
        });
      }
    });
  }

  showAsistencia() {
    return (
      !!this.dayAgenda?.autor1 &&
      this.dayAgenda?.profesor === this.userInfo().nombre
    );
  }

  noShowModal() {
    this.showModal = false;
  }

  getUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.socios = users.filter(
        (user: any) =>
          user.rol[0].name === 'Socio' &&
          user.activo === true &&
          user.nombre != this.userInfo().nombre
      );
    });
  }

  getCancheros() {
    this.userService.getUsers().subscribe((users) => {
      this.cancheros = users?.filter(
        (user: any) => user?.rol[0]?.name === 'Canchero'
      );
    });
  }

  preAgenda(
    classDay: DiaClassI,
    schedule: any,
    turno: string,
    turnDate: string,
    isCancel?: boolean
  ) {
    console.log({ classDay, turnDate });

    this.companyService.getCompany().subscribe((resp: any) => {
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
    if (
      new Date(turnDate).getTime() < new Date(day).getTime() &&
      this.isSocio()
    ) {
      this.showModal = false;
      Swal.fire(
        'Fecha inválida',
        `No se pueden ${
          isCancel ? 'cancelar' : 'agendar'
        } turnos ya con fechas vencidas`,
        'info'
      );
      return;
    }
    if (
      new Date(turnDate).getTime() === new Date(day).getTime() &&
      this.isSocio()
    ) {
      if (ahora > turn) {
        this.showModal = false;
        Swal.fire(
          'Turno ya no es válido',
          `No se pueden ${
            isCancel ? 'cancelar' : 'agendar'
          } un turno pasada la hora del mismo`,
          'info'
        );
        return;
      }
    }
    if (!isCancel) {
      if (
        new Date(turnDate).getTime() > new Date(manana).getTime() &&
        this.isSocio()
      ) {
        this.showModal = false;
        Swal.fire(
          'Turno aún no válido',
          'No se puede agendar turno con más de un día de anticipación',
          'info'
        );
        return;
      }

      if (
        (ahora < apAm || ahora > cierrAm) &&
        (ahora < apPm || ahora > cierrPm) &&
        this.isSocio()
      ) {
        this.showModal = false;
        Swal.fire(
          'Hora inválida',
          'No se puede agendar turno fuera del horario establecido.',
          'info'
        );
        return;
      }
    }
  }

  preAsistio(fecha: any) {
    const today = new Date();
    var day =
      today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear();
    var hora = today.getHours() + ':' + today.getMinutes();
    if (new Date().getTime() < new Date(fecha).getTime()) {
      Swal.fire(
        'El usuario aún no asiste a este turno',
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

  confirmarAsistencia() {
    const scheduleId = this.sheduleAgenda._id;

    const updateBody = {
      dia: this.dayAgenda.dia,
      indice: this.hour.indice,
      asistio: true,
    };

    this.agendaService
      .confirmarAsistencia(scheduleId, updateBody)
      .subscribe((resp) => {
        if (!resp) {
          Swal.fire('Error', 'Hubo un error en la petición', 'error');
          return;
        }
        Swal.fire(
          'Asistencia confirmada',
          'Se confirmó la asistencia',
          'success'
        );
        this.getHorarios();
      });
  }

  configureHorario() {
    const scheduleId = this.sheduleAgenda._id;

    let profesor, colorProfesor;
    if (this.userInfo().rol[0].name === 'Administrador') {
      profesor = this.profesorForm.value.profesor.nombre;
      colorProfesor = this.profesorForm.value.profesor.color;
    } else {
      profesor = this.userInfo().nombre;
      colorProfesor = this.userInfo().color;
    }

    const updateBody = {
      dia: this.dayAgenda.dia,
      indice: this.hour.indice,
      profesor,
      canchero: this.profesorForm.value.canchero.nombre,
      colorProfesor,
    };
    this.agendaService
      .configureHorario(scheduleId, updateBody)
      .subscribe((resp) => {
        if (!resp) {
          Swal.fire('Error', 'Hubo un error en la petición', 'error');
          return;
        }
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

    let autor1, socio1;
    if (this.userInfo().rol[0].name === 'Administrador') {
      autor1 = this.sociosForm.value.socio1._id;
      socio1 = this.sociosForm.value.socio1.nombre;
    } else {
      socio1 = this.userInfo().nombre;
      autor1 = this.userInfo()._id;
    }

    const updateSchedule = {
      dia: this.dayAgenda.dia,
      indice: this.hour.indice,
      autor1,
      codigoAutor1: this.sheduleAgenda.codigoAutor1,
      socio1,
      socio2: this.sociosForm.value.socio2?.nombre,
      socio3: this.sociosForm.value.socio3?.nombre,
      socio4: this.sociosForm.value.socio4?.nombre,
      autor2: this.sociosForm.value.socio2?._id,
      autor3: this.sociosForm.value.socio3?._id,
      autor4: this.sociosForm.value.socio4?._id,
      horaSolicitud: `${day} ${hour}`,
      solicita: 'Turno',
    };

    this.agendaService
      .solicitarTurno(this.sheduleAgenda._id, updateSchedule)
      .subscribe((resp) => {
        if (!resp) {
          Swal.fire('Error', 'Hubo un error en la petición', 'error');
        }
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
      this.getHorarios();
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
      this.getHorarios();
    }
  }

  cancelTurno() {
    const updateSchedule = {
      dia: this.dayAgenda.dia,
      indice: this.hour.indice,
      solicita: 'cancelar',
    };

    Swal.fire({
      title: 'Cancelar turno',
      text: '¿Desea cancelar el turno?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Continuar',
    }).then((respuesta) => {
      if (respuesta.isConfirmed) {
        this.agendaService
          .solicitarTurno(this.sheduleAgenda._id, updateSchedule)
          .subscribe((resp) => {
            Swal.fire('Excelente', 'Se ha cancelado el turno', 'success').then(
              (result) => {
                if (result.isConfirmed) {
                  this.getHorarios();
                }
              }
            );
          });
      }
    });
  }
}
