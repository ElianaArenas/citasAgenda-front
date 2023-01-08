import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AgendaI } from 'src/app/interfaces/agenda';
import { AgendaService } from 'src/app/service/agenda.service';
@Component({
  selector: 'app-agenda-configure',
  templateUrl: './agenda-configure.component.html',
  styleUrls: ['./agenda-configure.component.css'],
})
export class AgendaConfigureComponent {
  calendarVal?: Date;

  shechedules!: AgendaI[];
  schedule!: AgendaI;
  aperturaAm: any;
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

  model!: NgbDateStruct;

  tituloForm: FormGroup = this.fb.group({
    titulo: [''],
  });

  constructor(private agendaService: AgendaService, private fb: FormBuilder) {
    this.getHorarios();
  }

  getHorarios() {
    this.agendaService.getHorarios().subscribe((horarios: AgendaI[]) => {
      this.shechedules = horarios;
    });
  }

  getHorario(schedule: AgendaI) {
    this.schedule = schedule;
  }

  updateTitulo(scheduleId: string) {
    const titulo = this.tituloForm.get('titulo')?.value;

    this.agendaService.cambiarTitulo(scheduleId, titulo).subscribe((res) => {
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
          this.getHorarios();
          Swal.fire('Excelente', 'Horario eliminado', 'success');
        });
      }
    });
  }
}
