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
      .get(
        `https://api.giphy.com/v1/gifs/search?api_key=hmCJsArtX1auVakB1bDmKtx8MFHTrefZ&q=One%20Punch&limit=10`
      )
      .pipe(
        map((resp) => resp),
        catchError((err) => of(false))
      );
  }

  getImages() {
    return this.http.get(`${this.baseUrl}/empresa/imagenes/`).pipe(
      map((resp) => resp),
      catchError((err) => of(false))
    );
  }

  updateCompany(updateBody: any) {
    const token = localStorage.getItem('token') || '';

    return this.http
      .put(
        `${this.baseUrl}/empresa/configuracion/6403ec340de3ea13b08934ea`,
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
        `${this.baseUrl}/empresa/configuracion/aperturas/6403ec340de3ea13b08934ea`,
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
        `${this.baseUrl}/empresa/configuracion/horario/cancelar/6403ec340de3ea13b08934ea`,
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
        `${this.baseUrl}/empresa/configuracion/horario/renovar/6403ec340de3ea13b08934ea`,
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

  actualizarHorarioAleatorio(updateBody: any) {
    return this.http
      .put(
        `${this.baseUrl}/empresa/configuracion/horario/aleatorio/6403ec340de3ea13b08934ea`,
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

  uploadImages(files: any, descripcion: string, tipo: string, titulo: string) {
    const token = localStorage.getItem('token') || '';
    console.log({ descripcion, tipo });

    let filesToUpload = new FormData();
    filesToUpload.append('imagen', files);
    filesToUpload.append('descripcion', descripcion);
    filesToUpload.append('tipo', tipo);
    filesToUpload.append('titulo', titulo);

    console.log({ filesToUpload });

    return this.http
      .post(`${this.baseUrl}/empresa/imagenes/`, filesToUpload, {
        headers: { 'x-access-token': token },
      })
      .pipe(
        map((resp) => resp),
        catchError((err) => of(false))
      );
  }

  deleteImage(id: string) {
    const token = localStorage.getItem('token') || '';

    return this.http
      .delete(`${this.baseUrl}/empresa/imagenes/${id}`, {
        headers: { 'x-access-token': token },
      })
      .pipe(
        map((resp) => resp),
        catchError((err) => of(false))
      );
  }
}
