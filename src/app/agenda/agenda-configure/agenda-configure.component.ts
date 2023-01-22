import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AgendaI } from 'src/app/interfaces/agenda';
import { AgendaService } from 'src/app/service/agenda.service';
import { CompanyService } from '../../service/company.service';
@Component({
  selector: 'app-agenda-configure',
  templateUrl: './agenda-configure.component.html',
  styleUrls: ['./agenda-configure.component.css'],
})
export class AgendaConfigureComponent {
  calendarVal?: Date;

  shechedules!: AgendaI[];
  schedule!: AgendaI;
  aperturaAm: any = { hour: null, minute: null };
  aperturaPm: any;
  cierreAm: any;
  cierrePm: any;
  limiteAm: any;
  limitePm: any;
  renovarHorario: any;
  horaInicio: any;
  franjaTurno: any;
  franjaDescanso: any;
  horaFin: any;
  meridian = true;
  tiempoInicio: any;
  inihFran = 0;
  inimFran = 0;
  finhFran = 0;
  finmFran = 0;
  jorI = 'am';
  jorF = 'pm';
  ceroHI = '';
  ceroHF = '';
  ceroI = '';
  ceroF = '';
  franjas: Array<any> = [];
  indice = 0;

  model!: NgbDateStruct;
  datePicker!: Date;

  renovarHorarioForm: FormGroup = this.fb.group({
    dia: [''],
  });

  tituloForm: FormGroup = this.fb.group({
    titulo: [''],
  });

  tituloCrearHorarioForm: FormGroup = this.fb.group({
    titulo: ['', Validators.required],
  });

  diasForm = this.fb.group({
    lunes: [false],
    martes: [false],
    miercoles: [false],
    jueves: [false],
    viernes: [false],
    sabado: [false],
    domingo: [false],
    horarioClases: [false],
    autorenovar: [false],
  });

  company: any;
  invalidDate: boolean = false;

  constructor(
    private agendaService: AgendaService,
    private fb: FormBuilder,
    private companyService: CompanyService
  ) {
    this.getHorarios();
    this.getCompany();
  }

  getHorarios() {
    this.agendaService
      .getHorarios()
      .subscribe((horarios: AgendaI[] | boolean) => {
        this.shechedules = Array.isArray(horarios) ? horarios : [];
      });
  }

  getHorario(schedule: AgendaI) {
    this.schedule = schedule;
  }

  updateTitulo(scheduleId: string) {
    const titulo = this.tituloForm.get('titulo')?.value;

    this.agendaService.cambiarTitulo(scheduleId, titulo).subscribe((res) => {
      if (!res) {
        Swal.fire('Error', 'Hubo un error en la petición', 'error');
        return;
      }
      this.getHorarios();
      Swal.fire('Excelente', 'Titulo actualizado', 'success');
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

  autorenovar(scheduleId: string, renovar: boolean) {
    this.agendaService.autorenovar(scheduleId, renovar).subscribe((res) => {
      if (!res) {
        Swal.fire('Error', 'Hubo un error en la petición', 'error');
        return;
      }
    });
  }

  mostrarHorario(scheduleId: string, mostrar: boolean) {
    this.agendaService.mostrarHorario(scheduleId, mostrar).subscribe((res) => {
      if (!res) {
        Swal.fire('Error', 'Hubo un error en la petición', 'error');
        return;
      }
    });
  }

  getCompany() {
    this.companyService.getCompany().subscribe((res: any) => {
      this.company = res.message;
      const [aperturaAmHour, aperturAmMinutes] = this.company.aperturaAm
        .split('T')[1]
        .split(':');

      this.aperturaAm.hour = Number(this.splitCero(aperturaAmHour));

      this.aperturaAm.minute = Number(this.splitCero(aperturAmMinutes));

      console.log(this.aperturaAm.hour);
    });
  }

  aperturaTurnos() {
    if (
      this.aperturaAm?.hour == undefined ||
      this.aperturaAm?.minute == undefined ||
      this.aperturaPm?.hour == undefined ||
      this.aperturaPm?.minute == undefined ||
      this.cierreAm?.hour == undefined ||
      this.cierreAm?.minute == undefined ||
      this.cierrePm?.hour == undefined ||
      this.cierrePm?.minute == undefined
    ) {
      Swal.fire('Error', 'Debe ingresar todos los datos', 'error');
      return;
    }

    this.aperturaAm.hour = this.concatenateCero(this.aperturaAm.hour);

    this.aperturaAm.minute = this.concatenateCero(this.aperturaAm.minute);

    const aperturaAm = this.getHour(
      Number(this.aperturaAm.hour),
      Number(this.aperturaAm.minute)
    );

    this.aperturaPm.hour = this.concatenateCero(this.aperturaPm.hour);
    this.aperturaPm.minute = this.concatenateCero(this.aperturaPm.minute);

    const aperturaPm = this.getHour(
      Number(this.aperturaPm.hour),
      Number(this.aperturaPm.minute)
    );

    this.cierreAm.hour = this.concatenateCero(this.cierreAm.hour);
    this.cierreAm.minute = this.concatenateCero(this.cierreAm.minute);

    const cierreAm = this.getHour(
      Number(this.cierreAm.hour),
      Number(this.cierreAm.minute)
    );

    this.cierrePm.hour = this.concatenateCero(this.cierrePm.hour);
    this.cierrePm.minute = this.concatenateCero(this.cierrePm.minute);

    const cierrePm = this.getHour(
      Number(this.cierrePm.hour),
      Number(this.cierrePm.minute)
    );

    const updateBody = {
      apertura: !this.company.apertura,
      cierreAm,
      aperturaPm,
      aperturaAm,
      cierrePm,
    };

    this.companyService.aperturaTurnos(updateBody).subscribe((res) => {
      if (!res) {
        Swal.fire('Error', 'Hubo un error en la petición', 'error');
        return;
      }
    });
  }

  opcionCancelar() {
    if (
      this.limiteAm?.hour == undefined ||
      this.limiteAm?.minute == undefined ||
      this.limitePm?.hour == undefined ||
      this.limitePm?.minute == undefined
    ) {
      Swal.fire('Error', 'Debe ingresar todos los datos', 'error');
      return;
    }

    this.limiteAm.hour = this.concatenateCero(this.limiteAm.hour);
    this.limiteAm.minute = this.concatenateCero(this.limiteAm.minute);

    const limiteAm = this.getHour(
      Number(this.limiteAm.hour),
      Number(this.limiteAm.minute)
    );

    this.limitePm.hour = this.concatenateCero(this.limitePm.hour);
    this.limitePm.minute = this.concatenateCero(this.limitePm.minute);

    const limitePm = this.getHour(
      Number(this.limitePm.hour),
      Number(this.limitePm.minute)
    );

    const updateBody = {
      cancelar: !this.company.cancelar,
      horaAm: limiteAm,
      horaPm: limitePm,
    };

    this.companyService.opcionCancelar(updateBody).subscribe((resp) => {
      if (!resp) {
        Swal.fire('Error', 'Hubo un error en la petición', 'error');
        return;
      }
    });
  }

  actualizarRenovar() {
    if (
      !this.renovarHorarioForm.get('dia')?.value ||
      this.renovarHorario.hour == undefined ||
      this.renovarHorario.minute == undefined
    ) {
      Swal.fire('Error', 'Debe ingresar todos los datos', 'error');
      return;
    }

    this.renovarHorario.hour = this.concatenateCero(this.renovarHorario.hour);
    this.renovarHorario.minute = this.concatenateCero(
      this.renovarHorario.minute
    );

    const renovarHorario = this.getHour(
      Number(this.renovarHorario.hour),
      Number(this.renovarHorario.minute)
    );

    const updateBody = {
      dia: this.renovarHorarioForm.get('dia')?.value,
      hora: renovarHorario,
    };

    this.companyService.actualizarRenovar(updateBody).subscribe((resp) => {
      if (!resp) {
        Swal.fire('Error', 'Hubo un error en la petición', 'error');
        return;
      }
    });
  }

  createHorario() {
    if (this.tituloCrearHorarioForm.invalid) {
      Swal.fire('Error', 'Debe ingresar un lugar o localidad', 'error');
      return;
    }

    if (!this.model || !this.validateDate(this.model)) {
      Swal.fire('Error', 'Debe ingresar una fecha valida', 'error');
      return;
    }

    if (
      !this.diasForm.get('lunes')?.value &&
      !this.diasForm.get('martes')?.value &&
      !this.diasForm.get('miercoles')?.value &&
      !this.diasForm.get('jueves')?.value &&
      !this.diasForm.get('viernes')?.value &&
      !this.diasForm.get('sabado')?.value &&
      !this.diasForm.get('domingo')?.value
    ) {
      Swal.fire(
        'Error',
        'Debe ingresar almenos un dia para crear el horario',
        'error'
      );
      return;
    }

    if (
      this.horaInicio?.hour == undefined ||
      !this.horaInicio?.minute == undefined ||
      !this.franjaTurno?.hour == undefined ||
      !this.franjaTurno?.minute == undefined ||
      !this.franjaDescanso?.hour == undefined ||
      !this.franjaDescanso?.minute == undefined ||
      !this.horaFin?.hour == undefined ||
      !this.horaFin?.minute == undefined
    ) {
      Swal.fire(
        'Error',
        'Debe ingresar las horas de inicio, franja y franja de descanso',
        'error'
      );
      return;
    }

    if (this.horaFin?.hour <= this.horaInicio?.hour) {
      Swal.fire(
        'Error',
        'La hora de fin debe ser mayor a la hora de inicio',
        'error'
      );
      return;
    }

    const fechaInicio = new Date(
      this.model.year,
      this.model.month - 1,
      this.model.day
    );

    let tiempototal,
      cantidadFranjas,
      cantFranSinDes = 0;

    tiempototal =
      this.horaFin.hour * 60 +
      this.horaFin.minute -
      (this.horaInicio.hour * 60 + this.horaInicio.minute);

    if (tiempototal < 0) {
      tiempototal = 24 * 60 + tiempototal;
    }
    cantidadFranjas =
      tiempototal /
      (60 * this.franjaTurno.hour +
        this.franjaTurno.minute +
        60 * this.franjaDescanso.hour +
        this.franjaDescanso.minute);

    cantFranSinDes =
      (tiempototal +
        60 * this.franjaDescanso.hour +
        this.franjaDescanso.minute) /
      (60 * this.franjaTurno.hour +
        this.franjaTurno.minute +
        60 * this.franjaDescanso.hour +
        this.franjaDescanso.minute);

    let aumento = 0;

    if (Number.isInteger(cantidadFranjas) || Number.isInteger(cantFranSinDes)) {
      if (Number.isInteger(cantidadFranjas)) {
        this.tiempoInicio = this.horaInicio.hour * 60 + this.horaInicio.minute;
        for (var i = this.indice; i < cantidadFranjas + this.indice; i++) {
          this.ponerHorario(i);
        }
        aumento = this.indice + cantidadFranjas;
      }

      if (Number.isInteger(cantFranSinDes)) {
        this.tiempoInicio = this.horaInicio.hour * 60 + this.horaInicio.minute;
        for (i = this.indice; i < cantFranSinDes + this.indice; i++) {
          this.ponerHorario(i);
        }
        aumento = this.indice + cantFranSinDes;
      }
    } else {
      Swal.fire(
        'Horario sin ajustar',
        'Por favor verifique los datos ingresados, al momento de revisar el horario y las franjas de turno no se encuentra un ajuste adecuado',
        'error'
      );
      return;
    }
    this.indice = aumento;
    const createHorarioBody = {
      horario: this.franjas,
      activo: true,
      mostrarTodo: this.diasForm.get('horarioClases')?.value,
      fechaInicio,
      regenerar: this.diasForm.get('autorenovar')?.value,
      lugar: this.tituloCrearHorarioForm.get('titulo')?.value,
    };

    this.agendaService.createHorario(createHorarioBody).subscribe((resp) => {
      if (!resp) {
        Swal.fire('Error', 'Hubo un error en la petición', 'error');
        return;
      }
      this.getHorarios();
      Swal.fire('Excelente', 'Se creo el horario exitosamente', 'success');
      return;
    });
  }

  ponerHorario(element: any) {
    this.datePicker = new Date(
      this.model.year,
      this.model.month - 1,
      this.model.day
    );

    if (this.datePicker.getDay() == 0)
      this.datePicker.setDate(this.datePicker.getDate() - 6);

    if (this.datePicker.getDay() == 2)
      this.datePicker.setDate(this.datePicker.getDate() - 1);

    if (this.datePicker.getDay() == 3)
      this.datePicker.setDate(this.datePicker.getDate() - 2);

    if (this.datePicker.getDay() == 4)
      this.datePicker.setDate(this.datePicker.getDate() - 2);

    if (this.datePicker.getDay() == 5)
      this.datePicker.setDate(this.datePicker.getDate() - 4);

    if (this.datePicker.getDay() == 6)
      this.datePicker.setDate(this.datePicker.getDate() - 5);

    const fechalunes = this.datePicker.toLocaleDateString('en-US');
    this.datePicker.setDate(this.datePicker.getDate() + 1);
    const fechamartes = this.datePicker.toLocaleDateString('en-US');
    this.datePicker.setDate(this.datePicker.getDate() + 1);
    const fechamiercoles = this.datePicker.toLocaleDateString('en-US');
    this.datePicker.setDate(this.datePicker.getDate() + 1);
    const fechajueves = this.datePicker.toLocaleDateString('en-US');
    this.datePicker.setDate(this.datePicker.getDate() + 1);
    const fechaviernes = this.datePicker.toLocaleDateString('en-US');
    this.datePicker.setDate(this.datePicker.getDate() + 1);
    const fechasabado = this.datePicker.toLocaleDateString('en-US');
    this.datePicker.setDate(this.datePicker.getDate() + 1);
    const fechadomingo = this.datePicker.toLocaleDateString('en-US');

    let dia = [];

    if (this.tiempoInicio >= 1440) {
      this.tiempoInicio = this.tiempoInicio - 1440;
    }
    this.inihFran = Math.trunc(this.tiempoInicio / 60);
    this.inimFran = this.tiempoInicio % 60;
    this.tiempoInicio =
      this.tiempoInicio +
      (this.franjaTurno.hour * 60 + this.franjaTurno.minute);
    if (this.tiempoInicio >= 1440) {
      this.tiempoInicio = this.tiempoInicio - 1440;
    }
    this.finhFran = Math.trunc(this.tiempoInicio / 60);
    this.finmFran = this.tiempoInicio % 60;
    if (this.inihFran < 12) {
      this.jorI = 'am';
    }
    if (this.inihFran > 11) {
      this.jorI = 'pm';
    }
    if (this.inihFran === 0) {
      this.inihFran = 12;
    }
    if (this.inihFran > 12) {
      this.inihFran = this.inihFran - 12;
    }
    if (this.finhFran < 12) {
      this.jorF = 'am';
    }
    if (this.finhFran > 11) {
      this.jorF = 'pm';
    }
    if (this.finhFran === 0) {
      this.finhFran = 12;
    }
    if (this.finhFran > 12) {
      this.finhFran = this.finhFran - 12;
    }
    if (this.inimFran < 10) {
      this.ceroI = '0';
    }
    if (this.finmFran < 10) {
      this.ceroF = '0';
    }
    if (this.inimFran > 9) {
      this.ceroI = '';
    }
    if (this.finmFran > 9) {
      this.ceroF = '';
    }
    if (this.inihFran < 10) {
      this.ceroHI = '0';
    }
    if (this.finhFran < 10) {
      this.ceroHF = '0';
    }
    if (this.inihFran > 9) {
      this.ceroHI = '';
    }
    if (this.finhFran > 9) {
      this.ceroHF = '';
    }
    let turno =
      this.ceroHI +
      this.inihFran +
      ':' +
      this.ceroI +
      this.inimFran +
      this.jorI +
      ' - ' +
      this.ceroHF +
      this.finhFran +
      ':' +
      this.ceroF +
      this.finmFran +
      this.jorF;

    this.franjas[element] = {
      indice: element,
      franja: turno,
      granDemanda: false,
    };

    if (this.diasForm.get('lunes')?.value)
      dia.push({
        dia: 'lunes',
        fecha: fechalunes,
        turno: turno,
        autor1: null,
        codigoAutor1: null,
        autor2: null,
        autor3: null,
        autor4: null,
        horaSolicitud: null,
        solicita: null,
        asistio: false,
        profesor: null,
        canchero: null,
        idProfesor: null,
        idCanchero: null,
        colorProfesor: null,
      });
    else dia.push(null);
    if (this.diasForm.get('martes')?.value)
      dia.push({
        dia: 'martes',
        fecha: fechamartes,
        turno: turno,
        autor1: null,
        codigoAutor1: null,
        autor2: null,
        autor3: null,
        autor4: null,
        horaSolicitud: null,
        solicita: null,
        asistio: false,
        profesor: null,
        canchero: null,
        idProfesor: null,
        idCanchero: null,
        colorProfesor: null,
      });
    else dia.push(null);
    if (this.diasForm.get('miercoles')?.value)
      dia.push({
        dia: 'miercoles',
        fecha: fechamiercoles,
        turno: turno,
        autor1: null,
        codigoAutor1: null,
        autor2: null,
        autor3: null,
        autor4: null,
        horaSolicitud: null,
        solicita: null,
        asistio: false,
        profesor: null,
        canchero: null,
        idProfesor: null,
        idCanchero: null,
        colorProfesor: null,
      });
    else dia.push(null);
    if (this.diasForm.get('jueves')?.value)
      dia.push({
        dia: 'jueves',
        fecha: fechajueves,
        turno: turno,
        autor1: null,
        codigoAutor1: null,
        autor2: null,
        autor3: null,
        autor4: null,
        horaSolicitud: null,
        solicita: null,
        asistio: false,
        profesor: null,
        canchero: null,
        idProfesor: null,
        idCanchero: null,
        colorProfesor: null,
      });
    else dia.push(null);
    if (this.diasForm.get('viernes')?.value)
      dia.push({
        dia: 'viernes',
        fecha: fechaviernes,
        turno: turno,
        autor1: null,
        codigoAutor1: null,
        autor2: null,
        autor3: null,
        autor4: null,
        horaSolicitud: null,
        solicita: null,
        asistio: false,
        profesor: null,
        canchero: null,
        idProfesor: null,
        idCanchero: null,
        colorProfesor: null,
      });
    else dia.push(null);
    if (this.diasForm.get('sabado')?.value)
      dia.push({
        dia: 'sabado',
        fecha: fechasabado,
        turno: turno,
        autor1: null,
        codigoAutor1: null,
        autor2: null,
        autor3: null,
        autor4: null,
        horaSolicitud: null,
        solicita: null,
        asistio: false,
        profesor: null,
        canchero: null,
        idProfesor: null,
        idCanchero: null,
        colorProfesor: null,
      });
    else dia.push(null);
    if (this.diasForm.get('domingo')?.value)
      dia.push({
        dia: 'domingo',
        fecha: fechadomingo,
        turno: turno,
        autor1: null,
        codigoAutor1: null,
        autor2: null,
        autor3: null,
        autor4: null,
        horaSolicitud: null,
        solicita: null,
        asistio: false,
        profesor: null,
        canchero: null,
        idProfesor: null,
        idCanchero: null,
        colorProfesor: null,
      });
    else dia.push(null);

    this.franjas[element].dia = dia;

    console.log(this.franjas);

    this.tiempoInicio =
      this.tiempoInicio +
      (this.franjaDescanso.hour * 60 + this.franjaDescanso.minute);
  }

  validateDate(event: any) {
    this.datePicker = new Date(event.year, event.month - 1, event.day);
    if (
      this.datePicker.setDate(new Date(this.datePicker).getDate()) <
      new Date().setDate(new Date().getDate() - 1)
    ) {
      this.invalidDate = true;
      return false;
    }
    this.invalidDate = false;
    return true;
  }

  concatenateCero(value: any) {
    let concatenation = value <= 9 ? `0${value}` : value;
    return concatenation;
  }

  splitCero(value: any) {
    let concatenation = value <= 9 ? value.substring(1, 2) : value;
    return concatenation;
  }

  getHour(hour: number, minutes: number) {
    const now = new Date();

    now.setHours(hour);
    now.setMinutes(minutes);
    now.setSeconds(0);
    now.setMilliseconds(0);

    return now;
  }
}
