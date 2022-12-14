import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ActasService {
  url = 'http://localhost:8080/actas';
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  getActas() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<any>(this.url, {
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
