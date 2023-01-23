import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getUser(userId: string) {
    const token = localStorage.getItem('token') || '';

    return this.http
      .get(`${this.baseUrl}/users/${userId}`, {
        headers: { 'x-access-token': token },
      })
      .pipe(
        map((resp) => resp),
        catchError((err) => of(err))
      );
  }

  getUsers() {
    const token = localStorage.getItem('token') || '';

    return this.http
      .get(`${this.baseUrl}/users/`, {
        headers: { 'x-access-token': token },
      })
      .pipe(
        map((resp) => resp),
        catchError((err) => of(err))
      );
  }

  updatePassword(userId: string, oldPassword: string, newPassword: string) {
    const token = localStorage.getItem('token') || '';

    return this.http
      .put(
        `${this.baseUrl}/users/cambiarContra/${userId}`,
        { contraAntigua: oldPassword, contraNueva: newPassword },
        {
          headers: { 'x-access-token': token },
        }
      )
      .pipe(
        map((resp) => true),
        catchError((err) => of(false))
      );
  }

  validateToken() {
    let userId;

    console.log(localStorage.getItem('user'));

    if (localStorage.getItem('user')) {
      userId = JSON.parse(localStorage.getItem('user') || '')._id;
      console.log({ userId });
    }

    console.log(userId);

    const token = localStorage.getItem('token') || '';

    return this.http
      .get(`${this.baseUrl}/users/refrescar/${userId}`, {
        headers: { 'x-access-token': token },
      })
      .pipe(
        map((resp) => {
          resp;
          console.log({ resp });
          return true;
        }),
        catchError((err) => of(false))
      );
  }

  editUser(documento: number, updateBody: any) {
    const token = localStorage.getItem('token') || '';

    return this.http
      .put(`${this.baseUrl}/users/documento/${documento}`, updateBody, {
        headers: { 'x-access-token': token },
      })
      .pipe(
        map((resp) => resp),
        catchError((err) => of(err))
      );
  }

  deleteUser(documento: number) {
    const token = localStorage.getItem('token') || '';

    return this.http
      .delete(`${this.baseUrl}/users/documento/${documento}`, {
        headers: { 'x-access-token': token },
      })
      .pipe(
        map((resp) => resp),
        catchError((err) => of(err))
      );
  }
}
