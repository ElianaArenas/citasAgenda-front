import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  constructor(private http: HttpClient) {}

  private baseUrl: string = environment.baseUrl;

  createNotification(createBody: any) {
    const token = localStorage.getItem('token') || '';

    return this.http
      .post(`${this.baseUrl}/notificacion/`, createBody, {
        headers: { 'x-access-token': token },
      })
      .pipe(
        map((resp) => resp),
        catchError((err) => of(false))
      );
  }
}
