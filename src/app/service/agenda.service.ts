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
      catchError((err) => of(err.error.msg))
    );
  }
}
