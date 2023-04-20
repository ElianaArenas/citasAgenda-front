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

  constructor(private http: HttpClient) {}

  getHorarios() {
    return this.http.get<AgendaI[]>(`${this.baseUrl}/horario`).pipe(
      map((resp) => resp),
      catchError((err) => of(false))
    );
  }

  getHorario(scheduleId: string) {
    return this.http.get<AgendaI>(`${this.baseUrl}/horario/${scheduleId}`).pipe(
      map((resp) => resp),
      catchError((err) => of(false))
    );
  }

  updateHorario(scheduleId: string, updateBody: any) {
    const token = localStorage.getItem('token') || '';

    return this.http
      .put(`${this.baseUrl}/horario/${scheduleId}`, updateBody, {
        headers: { 'x-access-token': token },
      })
      .pipe(
        map((resp) => resp),
        catchError((err) => of(false))
      );
  }

  configureHorario(scheduleId: string, updateBody: any) {
    const token = localStorage.getItem('token') || '';

    return this.http
      .put(`${this.baseUrl}/horario/configuracion/${scheduleId}`, updateBody, {
        headers: { 'x-access-token': token },
      })
      .pipe(
        map((resp) => resp),
        catchError((err) => of(false))
      );
  }

  cambiarTitulo(scheduleId: string, titulo: string) {
    const token = localStorage.getItem('token') || '';

    return this.http
      .put(
        `${this.baseUrl}/horario/titulo/${scheduleId}`,
        { lugar: titulo },
        {
          headers: { 'x-access-token': token },
        }
      )
      .pipe(
        map((resp) => resp),
        catchError((err) => of(false))
      );
  }

  solicitarTurno(scheduleId: string, updateBody: any) {
    const token = localStorage.getItem('token') || '';

    return this.http
      .put(`${this.baseUrl}/horario/solicitud/${scheduleId}`, updateBody, {
        headers: { 'x-access-token': token },
      })
      .pipe(
        map((resp) => resp),
        catchError((err) => of(false))
      );
  }

  confirmarAsistencia(scheduleId: string, updateBody: any) {
    const token = localStorage.getItem('token') || '';

    return this.http
      .put(`${this.baseUrl}/horario/asistio/${scheduleId}`, updateBody, {
        headers: { 'x-access-token': token },
      })
      .pipe(
        map((resp) => resp),
        catchError((err) => of(false))
      );
  }

  deleteHorario(scheduleId: string) {
    const token = localStorage.getItem('token') || '';

    return this.http
      .delete(`${this.baseUrl}/horario/${scheduleId}`, {
        headers: { 'x-access-token': token },
      })
      .pipe(
        map((resp) => resp),
        catchError((err) => of(false))
      );
  }

  autorenovar(scheduleId: string, active: boolean) {
    const token = localStorage.getItem('token') || '';

    return this.http
      .put(
        `${this.baseUrl}/horario/regenerar/${scheduleId}`,
        {
          regenerar: !active,
        },
        {
          headers: { 'x-access-token': token },
        }
      )
      .pipe(
        map((resp) => resp),
        catchError((err) => of(false))
      );
  }

  mostrarHorario(scheduleId: string, active: boolean) {
    const token = localStorage.getItem('token') || '';

    return this.http
      .put(
        `${this.baseUrl}/horario/mostrarTodo/${scheduleId}`,
        {
          mostrarTodo: !active,
        },
        {
          headers: { 'x-access-token': token },
        }
      )
      .pipe(
        map((resp) => resp),
        catchError((err) => of(false))
      );
  }

  createHorario(createBody: any) {
    const token = localStorage.getItem('token') || '';

    return this.http
      .post(`${this.baseUrl}/horario`, createBody, {
        headers: { 'x-access-token': token },
      })
      .pipe(
        map((resp) => resp),
        catchError((err) => of(false))
      );
  }
}
