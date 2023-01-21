import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl: string = environment.baseUrl;
  private token = localStorage.getItem('token') || '';

  constructor(private http: HttpClient) {}

  createUser(createBody: any) {
    return this.http
      .post(`${this.baseUrl}/administrador/`, createBody, {
        headers: { 'x-access-token': this.token },
      })
      .pipe(
        map((resp) => resp),
        catchError((err) => of(false))
      );
  }
}
