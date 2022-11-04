import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { PropietariosService } from '../../../services/propietarios.service';
const Swal = require('sweetalert2');

export interface AptoElement {
  id: string;
  torre: string;
  numero: string;
}

export enum TYPE {
  ERROR = 'error',
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info',
  QUESTION = 'question',
}

@Component({
  selector: 'app-propietario',
  templateUrl: './propietario.component.html',
  styleUrls: ['./propietario.component.css'],
})
export class PropietarioComponent implements OnInit {
  private isValidEmail = /\S+@\S+\.\S+/;

  selected = '';

  hide?: boolean = true;
  formulario = this.formBuilder.group({
    documento: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    celular: ['', [Validators.required, Validators.minLength(5)]],
    role: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  // displayedColumns: string[] = ['torre', 'numero'];
  dataSource: AptoElement[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private propService: PropietariosService
  ) {}

  ngOnInit(): void {}

  getErrorMessage(field: string) {
    let message;

    if (this.formulario.get(field)?.hasError('required')) {
      message = `Debes ingresar un ${field} valido`;
    } else if (this.formulario.get(field)?.hasError('pattern')) {
      message = 'No es un correo valido';
    } else if (this.formulario.get(field)?.hasError('minlength')) {
      // const minLength = this.formulario.get(field)?.errors;
      message = 'El password mas de 5 caracteres';
    }

    return message;
  }

  crearPropietario() {
    if (this.formulario.invalid || this.dataSource.length === 0) {
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        icon: TYPE.ERROR,
        boolean: false,
        timer: 5000,
        title: 'Ingrese los datos del propietario',
      });
      return;
    }

    let apartamentos = [];
    for (const item of this.dataSource) {
      apartamentos.push(item);
    }
    let body = {
      id: this.formulario.get('documento')?.value,
      nombre: this.formulario.get('nombre')?.value,
      celular: this.formulario.get('celular')?.value,
      email: this.formulario.get('email')?.value,
      password: this.formulario.get('password')?.value,
      role: this.formulario.get('role')?.value,
      apartamento: apartamentos,
      estado: 'activo',
    };

    this.propService.createPropietario(body).subscribe((res: any) => {
      if (res.success === true) {
        Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          icon: TYPE.SUCCESS,
          boolean: false,
          timer: 5000,
          title: 'Propietario creado exitosamente',
        });

        this.formulario = this.formBuilder.group({
          documento: '',
          nombre: '',
          email: '',
          celular: '',
          role: '',
          password: '',
        });

        this.dataSource = [];
      }
    });
  }

  async addApto() {
    const { value: formValues } = await Swal.fire({
      title: 'Agregar Apartamento',
      html:
        '<label>Ingrese solo números</label>' +
        '<br>' +
        '<input id="swal-input1" type="number" placeholder="Torre"  class="swal2-input">' +
        '<input id="swal-input2" type="number" placeholder="Apartamento" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          (document.getElementById('swal-input1') as HTMLInputElement).value,
          (document.getElementById('swal-input2') as HTMLInputElement).value,
        ];
      },
    });

    if (formValues[0] === '') {
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        icon: TYPE.ERROR,
        boolean: false,
        timer: 5000,
        title: 'Ingrese los datos Torre y Numero Apartamento',
      });
    } else {
      this.dataSource.push({
        id: uuidv4(),
        torre: 'Torre ' + formValues[0],
        numero: 'Apto ' + formValues[1],
      });
    }
  }
}
