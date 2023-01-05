import { Component, OnInit } from '@angular/core';
import { AgendaI } from 'src/app/interfaces/agenda';
import { AgendaService } from 'src/app/service/agenda.service';

@Component({
  selector: 'app-agenda-configure',
  templateUrl: './agenda-configure.component.html',
  styleUrls: ['./agenda-configure.component.css'],
})
export class AgendaConfigureComponent {
  shechedules!: AgendaI[];
  constructor(private agendaService: AgendaService) {
    this.getHorarios();
  }

  getHorarios() {
    this.agendaService.getHorarios().subscribe((horarios: AgendaI[]) => {
      this.shechedules = horarios;
    });
  }
}
