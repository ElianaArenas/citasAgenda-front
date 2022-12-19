import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = environment.baseUrl;
  private token = localStorage.getItem('token') || '';
  constructor(private http: HttpClient) {}

  getUser(userId: string) {
    return this.http
      .get(`${this.baseUrl}/users/${userId}`, {
        headers: { 'x-access-token': this.token },
      })
      .pipe(
        map((resp) => resp),
        catchError((err) => of(err.error.msg))
      );
  }

  getUsers() {
    return this.http
      .get(`${this.baseUrl}/users/`, {
        headers: { 'x-access-token': this.token },
      })
      .pipe(
        map((resp) => resp),
        catchError((err) => of(err.error.msg))
      );
  }

  updatePassword(userId: string, oldPassword: string, newPassword: string) {
    return this.http
      .put(
        `${this.baseUrl}/users/cambiarContra/${userId}`,
        { contraAntigua: oldPassword, contraNueva: newPassword },
        {
          headers: { 'x-access-token': this.token },
        }
      )
      .pipe(
        map((resp) => resp),
        catchError((err) => of(err.error.msg))
      );
  }

  validateToken() {
    const userId = JSON.parse(localStorage.getItem('user') || '')._id;
    return this.http
      .get(`${this.baseUrl}/users/refrescar/${userId}`, {
        headers: { 'x-access-token': this.token },
      })
      .pipe(
        map((resp) => {
          resp;
          return true;
        }),
        catchError((err) => of(false))
      );
  }
}
