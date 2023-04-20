import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError, tap, of } from 'rxjs';
import {
  LoginI,
  RegisterI,
  RegisterResponseI,
} from '../interfaces/authInterface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<LoginI>(`${this.baseUrl}/auth/signIn`, {
        email,
        contra: password,
      })
      .pipe(
        tap((resp) => {
          localStorage.setItem('token', resp.token!);
          localStorage.setItem('user', JSON.stringify(resp.userFound!));
          localStorage.setItem('auth', 'true');
        }),
        map((resp) => resp),
        catchError((err) => of(false))
      );
  }

  register(data: any) {
    const body = {
      nombre: data.nombre,
      codigo: data.document,
      documento: data.document,
      contra: data.password,
      email: data.email,
    };

    return this.http
      .post<RegisterResponseI>(`${this.baseUrl}/auth/signup`, body)
      .pipe(
        tap((resp) => {
          localStorage.setItem('token', resp.token!);
          localStorage.setItem('user', JSON.stringify(resp.savedUser!));
          localStorage.setItem('auth', 'true');
        }),
        map((resp) => resp),
        catchError((err) => of(false))
      );
  }

  loggedIn() {
    return !!localStorage.getItem('auth');
  }

  logout() {
    localStorage.clear();
  }

  SendMailForgotPassword(data: any) {
    return this.http
      .put<RegisterResponseI>(`${this.baseUrl}/auth/forgot-password`, data)
      .pipe(
        map((resp) => resp),
        catchError((err) => of(false))
      );
  }

  newPassword(data: any, token: string) {
    return this.http
      .put(`${this.baseUrl}/auth/new-password`, data, {
        headers: { reset: token },
      })
      .pipe(
        map((resp) => resp),
        catchError((err) => of(false))
      );
  }
}
