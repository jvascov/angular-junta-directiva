import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

const Swal = require('sweetalert2');

export interface AptoElement {
  id: string;
  torre: string;
  numero: string;
}

@Component({
  selector: 'app-propietario',
  templateUrl: './propietario.component.html',
  styleUrls: ['./propietario.component.css'],
})
export class PropietarioComponent implements OnInit {
  private isValidEmail = /\S+@\S+\.\S+/;
  hide?: boolean = true;
  loginForm = this.formBuilder.group({
    documento: [
      '',
      [Validators.required, Validators.pattern(this.isValidEmail)],
    ],
    nombre: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    celular: ['', [Validators.required]],
    role: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  ELEMENT_DATA: AptoElement[] = [];

  displayedColumns: string[] = ['torre', 'numero'];
  dataSource: AptoElement[] = [{ id: '1', torre: '1', numero: '407' }];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

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

  crearPropietario() {}

  async addApto() {
    const { value: formValues } = await Swal.fire({
      title: 'Agregar Apartamento',
      html:
        '<input id="swal-input1" placeholder="Torre"  class="swal2-input">' +
        '<input id="swal-input2" placeholder="Apartamento" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          (document.getElementById('swal-input1') as HTMLInputElement).value,
          (document.getElementById('swal-input2') as HTMLInputElement).value,
        ];
      },
    });

    if (formValues[0] === '') {
      console.log('error');
      // Swal.fire(JSON.stringify(formValues));
    } else {
      console.log(formValues);
    }
  }
}
