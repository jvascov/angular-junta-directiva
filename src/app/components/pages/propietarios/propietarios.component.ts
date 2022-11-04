import { Component, OnInit } from '@angular/core';
import { PropietariosService } from '../../services/propietarios.service';
import { Router } from '@angular/router';
const Swal = require('sweetalert2');

export interface PeriodicElement {
  id: string;
  nombre: string;
  celular: string;
  email: string;
  role: string;
  opciones: string;
}

export enum TYPE {
  ERROR = 'error',
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info',
  QUESTION = 'question',
}

@Component({
  selector: 'app-propietarios',
  templateUrl: './propietarios.component.html',
  styleUrls: ['./propietarios.component.css'],
})
export class PropietariosComponent implements OnInit {
  ELEMENT_DATA: PeriodicElement[] = [];

  displayedColumns: string[] = [
    'nombre',
    'celular',
    'email',
    'role',
    'opciones',
  ];
  dataSource: PeriodicElement[] = [];

  constructor(
    private propService: PropietariosService,
    private router: Router
  ) {}

  ngOnInit(): any {
    this.propService.getPropietarios().subscribe((res) => {
      res.forEach((e: any) => {
        if (e.estado === 'activo') {
          this.ELEMENT_DATA.push({
            id: e.id,
            nombre: e.nombre,
            celular: e.celular,
            email: e.email,
            role: e.role,
            opciones: 'Eliminar',
          });
        }
      });
      this.dataSource = this.ELEMENT_DATA;
    });
  }

  createPropietario() {
    this.router.navigate(['propietario']);
  }

  updatePropietario(id: string, type: string) {
    let body;
    if (type === 'eliminar') {
      body = {
        estado: 'inactivo',
      };

      this.propService.updatePropietario(id, body).subscribe((res: any) => {
        if (res.success === true) {
          this.ELEMENT_DATA = this.ELEMENT_DATA.filter((e) => e.id !== id);

          this.dataSource = this.ELEMENT_DATA;
          Swal.fire({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            icon: TYPE.SUCCESS,
            boolean: false,
            timer: 5000,
            title: 'Propietario eliminado exitosamente',
          });
        }
      });
    } else {
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        icon: TYPE.ERROR,
        boolean: false,
        timer: 5000,
        title: 'Error eliminando propietario',
      });
    }
  }
}
