import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError, of } from 'rxjs';
import { AgendaI } from '../interfaces/agenda';

@Injectable({
  providedIn: 'root',
})
export class AgendaService {
  private baseUrl: string = environment.baseUrl;
  private token = localStorage.getItem('token') || '';

  constructor(private http: HttpClient) {}

  getHorarios() {
    return this.http.get<AgendaI[]>(`${this.baseUrl}/horario`).pipe(
      map((resp) => resp),
      catchError((err) => of(err.error.msg))
    );
  }

  getHorario(scheduleId: string) {
    return this.http.get<AgendaI>(`${this.baseUrl}/horario/${scheduleId}`).pipe(
      map((resp) => resp),
      catchError((err) => of(err.error.msg))
    );
  }

  updateHorario(scheduleId: string, updateBody: any) {
    return this.http
      .put(`${this.baseUrl}/horario/${scheduleId}`, updateBody, {
        headers: { 'x-access-token': this.token },
      })
      .pipe(
        map((resp) => resp),
        catchError((err) => of(err.error.msg))
      );
  }

  configureHorario(scheduleId: string, updateBody: any) {

    console.log();
    
    return this.http
      .put(`${this.baseUrl}/horario/configuracion/${scheduleId}`, updateBody, {
        headers: { 'x-access-token': this.token },
      })
      .pipe(
        map((resp) => resp),
        catchError((err) => of(err.error.msg))
      );
  }

  solicitarTurno(scheduleId: string, updateBody: any) {
    return this.http
      .put(`${this.baseUrl}/horario/solicitud/${scheduleId}`, updateBody, {
        headers: { 'x-access-token': this.token },
      })
      .pipe(
        map((resp) => resp),
        catchError((err) => of(err.error.msg))
      );
  }
}
