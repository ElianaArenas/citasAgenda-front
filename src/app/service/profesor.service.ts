import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError, of } from 'rxjs';
import { ProfesorI } from '../interfaces/profesor';

@Injectable({
  providedIn: 'root',
})
export class ProfesorService {
  private baseUrl: string = environment.baseUrl;
  private token = localStorage.getItem('token') || '';

  constructor(private http: HttpClient) {}

  getProfesores() {
    return this.http.get<ProfesorI[]>(`${this.baseUrl}/profesor`).pipe(
      map((resp) => resp),
      catchError((err) => of(err))
    );
  }
}
