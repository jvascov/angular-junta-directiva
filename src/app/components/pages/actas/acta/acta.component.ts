import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActasService } from '../../../services/actas.service';
import { v4 as uuidv4 } from 'uuid';
const Swal = require('sweetalert2');
const moment = require('moment-timezone');

export enum TYPE {
  ERROR = 'error',
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info',
  QUESTION = 'question',
}

@Component({
  selector: 'app-acta',
  templateUrl: './acta.component.html',
  styleUrls: ['./acta.component.css'],
})
export class ActaComponent implements OnInit {
  formulario = this.formBuilder.group({
    fecha: ['', [Validators.required]],
    lugar: ['', [Validators.required]],
    estado: ['Registrada', [Validators.required]],
    administrador: ['', [Validators.required, Validators.minLength(5)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private actaService: ActasService
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

  crearActa() {
    if (this.formulario.invalid) {
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        icon: TYPE.ERROR,
        boolean: false,
        timer: 5000,
        title: 'Ingrese los datos del acta',
      });
      return;
    }

    let body = {
      id: uuidv4(),
      fecha: moment.tz(
        this.formulario.get('fecha')?.value,
        'DD MMM YYYY',
        'America/Bogota'
      ),
      lugar: this.formulario.get('lugar')?.value,
      estado: this.formulario.get('estado')?.value,
      administrador: this.formulario.get('administrador')?.value,
    };

    this.actaService.createActa(body).subscribe((res: any) => {
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
          fecha: '',
          lugar: '',
          estado: '',
          administrador: '',
        });
      }
    });
  }
}
