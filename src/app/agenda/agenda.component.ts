import { Component, OnInit } from '@angular/core';
import { AgendaI } from '../interfaces/agenda';
import { AgendaService } from '../service/agenda.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
})
export class AgendaComponent implements OnInit {
  shechedules: AgendaI[] = [];
  constructor(private agendaService: AgendaService) {
    this.getHorarios();
  }

  ngOnInit(): void {}

  getHorarios() {
    this.agendaService.getHorarios().subscribe((horarios: AgendaI[]) => {
      this.shechedules = horarios;
      console.log(this.shechedules);
    });
  }
}
