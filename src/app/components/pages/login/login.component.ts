import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private isValidEmail = /\S+@\S+\.\S+/;
  hide?: boolean = true;
  loginForm = this.formBuilder.group({
    email: [
      'jvascov@gmail.com',
      [Validators.required, Validators.pattern(this.isValidEmail)],
    ],
    password: ['usr123456789', [Validators.required, Validators.minLength(5)]],
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

    this.authService.login();

    this.router.navigate(['dashboard']);
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
