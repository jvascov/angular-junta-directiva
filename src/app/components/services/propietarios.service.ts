import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PropietariosService {
  constructor(private http: HttpClient) {}

  getPropietarios() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>('http://localhost:8080/propietarios', {
      headers: headers,
    });
  }
}
