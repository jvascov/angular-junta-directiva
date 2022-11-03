import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token!: string;
  constructor(private http: HttpClient) {}

  login() {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
    };

    return this.http
      .post<any>(
        'http://localhost:8080/login',
        {
          email: 'eli@g.com',
          password: '123456',
        },
        { headers: headers }
      )
      .subscribe((res) => {
        localStorage.setItem('token', res.token);
      });
  }
}
