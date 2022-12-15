import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getCompany() {
    return this.http
      .get(`${this.baseUrl}/empresa/configuracion/637a9227dcead0410c77146d`)
      .pipe(
        map((resp) => resp),
        catchError((err) => of(err.error.msg))
      );
  }
}
