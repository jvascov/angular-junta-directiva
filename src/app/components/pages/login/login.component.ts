import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
const Swal = require('sweetalert2');

export enum TYPE {
  ERROR = 'error',
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info',
  QUESTION = 'question',
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private isValidEmail = /\S+@\S+\.\S+/;
  hide?: boolean = true;
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  signIn(): void {
    if (this.loginForm.invalid) {
      return;
    }

    let body = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.authService.login(body).subscribe((res: any) => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/');
      } else {
        console.log('error usuario');

        Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          icon: TYPE.ERROR,
          boolean: false,
          timer: 5000,
          title: 'Usuario o contraseña inválidos',
        });
      }
    });
  }

  getErrorMessage(field: string) {
    let message;

    if (this.loginForm.get(field)?.hasError('required')) {
      message = `Debes ingresar un ${field} valido`;
    } else if (this.loginForm.get(field)?.hasError('pattern')) {
      message = 'No es un correo valido';
    } else if (this.loginForm.get(field)?.hasError('minlength')) {
      // const minLength = this.loginForm.get(field)?.errors;
      message = 'El password mas de 5 caracteres';
    }

    return message;
  }
}
