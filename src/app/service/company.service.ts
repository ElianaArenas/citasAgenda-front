import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private baseUrl: string = environment.baseUrl;
  private token = localStorage.getItem('token') || '';
  id_Empresa!: string;
  constructor(private http: HttpClient) {}

  getCompanies() {
    return this.http.get(`${this.baseUrl}/empresa`).pipe(
      map((resp: any) => resp),
      catchError((err) => of(false))
    );
  }

  getCompany() {
    return this.getCompanies().pipe(
      switchMap((resp: any) => {
        this.id_Empresa = resp[0]._id;
        return this.http.get(
          `${this.baseUrl}/empresa/configuracion/${this.id_Empresa}`
        );
      }),
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

    return this.getCompanies().pipe(
      map((resp: any) => resp[0]._id),
      switchMap((id: string) =>
        this.http.put(
          `${this.baseUrl}/empresa/configuracion/${id}`,
          updateBody,
          {
            headers: { 'x-access-token': token },
          }
        )
      ),
      catchError((err) => of(false))
    );
  }

  aperturaTurnos(updateBody: any) {
    const token = localStorage.getItem('token') || '';

    return this.getCompanies().pipe(
      map((resp: any) => resp[0]._id),
      switchMap((id: string) =>
        this.http.put(
          `${this.baseUrl}/empresa/configuracion/aperturas/${id}`,
          updateBody,
          { headers: { 'x-access-token': token } }
        )
      ),
      catchError((err) => of(false))
    );
  }

  opcionCancelar(updateBody: any) {
    const token = localStorage.getItem('token') || '';

    return this.getCompanies().pipe(
      map((resp: any) => resp[0]._id),
      switchMap((id: string) =>
        this.http.put(
          `${this.baseUrl}/empresa/configuracion/horario/cancelar/${id}`,
          updateBody,
          { headers: { 'x-access-token': token } }
        )
      ),
      catchError((err) => of(false))
    );
  }

  actualizarRenovar(updateBody: any) {
    const token = localStorage.getItem('token') || '';

    return this.getCompanies().pipe(
      map((resp: any) => resp[0]._id),
      switchMap((id: string) =>
        this.http.put(
          `${this.baseUrl}/empresa/configuracion/horario/renovar/${id}`,
          updateBody,
          { headers: { 'x-access-token': token } }
        )
      ),
      catchError((err) => of(false))
    );
  }

  actualizarHorarioAleatorio(updateBody: any) {
    const token = localStorage.getItem('token') || '';

    return this.getCompanies().pipe(
      map((resp: any) => resp[0]._id),
      switchMap((id: string) =>
        this.http.put(
          `${this.baseUrl}/empresa/configuracion/horario/aleatorio/${id}`,
          updateBody,
          { headers: { 'x-access-token': token } }
        )
      ),
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
