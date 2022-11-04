import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActasService {
  url = environment.domain;
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  getActas() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<any>(this.url + '/actas', {
      headers: headers,
    });
  }

  createActa(body: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.post<any>(this.url, body, {
      headers: headers,
    });
  }

  updateActa(id: string, body: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.put<any>(this.url + '/' + id, body, {
      headers: headers,
    });
  }
}
