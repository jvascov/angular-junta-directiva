import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token!: string;
  url = environment.domain;
  isAuth: boolean = false;

  constructor(private http: HttpClient) {}

  validarToken(): Observable<boolean> {
    this.token = localStorage.getItem('token') || '';

    return this.http
      .get(this.url + '/renew', {
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
          Authorization: 'Bearer ' + this.token,
        },
      })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        }),
        map((resp) => true),
        catchError((error) => of(false))
      );
  }

  login(body: any) {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
    };

    return this.http.post(this.url + '/login', body, { headers: headers });
  }
}
