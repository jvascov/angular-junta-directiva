import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PropietariosService {
  url = 'http://localhost:8080/propietarios';

  constructor(private http: HttpClient) {}

  getPropietarios() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(this.url, {
      headers: headers,
    });
  }

  createPropietario(body: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(this.url, body, {
      headers: headers,
    });
  }

  updatePropietario(id: string, body: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.put<any>(this.url + '/' + id, body, {
      headers: headers,
    });
  }
}
