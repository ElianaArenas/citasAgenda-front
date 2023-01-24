import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private baseUrl: string = environment.baseUrl;
  private token = localStorage.getItem('token') || '';

  constructor(private http: HttpClient) {}

  getCompany() {
    return this.http
      .get(`${this.baseUrl}/empresa/configuracion/63bcd0cba8962b3f487fe30d`)
      .pipe(
        map((resp) => resp),
        catchError((err) => of(false))
      );
  }

  updateCompany(updateBody: any) {
    const token = localStorage.getItem('token') || '';

    return this.http
      .put(
        `${this.baseUrl}/empresa/configuracion/63bcd0cba8962b3f487fe30d`,
        updateBody,
        {
          headers: { 'x-access-token': token },
        }
      )
      .pipe(
        map((resp) => resp),
        catchError((err) => of(false))
      );
  }

  aperturaTurnos(updateBody: any) {
    return this.http
      .put(
        `${this.baseUrl}/empresa/configuracion/aperturas/63bcd0cba8962b3f487fe30d`,
        updateBody,
        {
          headers: { 'x-access-token': this.token },
        }
      )
      .pipe(
        map((resp) => resp),
        catchError((err) => of(false))
      );
  }

  opcionCancelar(updateBody: any) {
    return this.http
      .put(
        `${this.baseUrl}/empresa/configuracion/horario/cancelar/63bcd0cba8962b3f487fe30d`,
        updateBody,
        {
          headers: { 'x-access-token': this.token },
        }
      )
      .pipe(
        map((resp) => resp),
        catchError((err) => of(false))
      );
  }

  actualizarRenovar(updateBody: any) {
    return this.http
      .put(
        `${this.baseUrl}/empresa/configuracion/horario/renovar/63bcd0cba8962b3f487fe30d`,
        updateBody,
        {
          headers: { 'x-access-token': this.token },
        }
      )
      .pipe(
        map((resp) => resp),
        catchError((err) => of(false))
      );
  }

  uploadImages(files: any) {
    let filesToUpload = new FormData();
    filesToUpload.append('imagen', files);
    return this.http
      .post(`${this.baseUrl}/empresa/imagenes/`, filesToUpload, {
        headers: { 'x-access-token': this.token },
      })
      .pipe(
        map((resp) => resp),
        catchError((err) => of(false))
      );
  }
}
