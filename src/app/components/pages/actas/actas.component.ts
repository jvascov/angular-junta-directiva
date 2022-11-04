import { Component, OnInit } from '@angular/core';
import { ActasService } from '../../services/actas.service';
import { Router } from '@angular/router';
const Swal = require('sweetalert2');
const moment = require('moment-timezone');

export interface ActaElement {
  id: string;
  estado: string;
  fecha: string;
  lugar: string;
  administrador: string;
}

export enum TYPE {
  ERROR = 'error',
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info',
  QUESTION = 'question',
}
@Component({
  selector: 'app-actas',
  templateUrl: './actas.component.html',
  styleUrls: ['./actas.component.css'],
})
export class ActasComponent implements OnInit {
  dataSource: ActaElement[] = [];

  constructor(private actaService: ActasService, private router: Router) {}

  ngOnInit(): void {
    this.actaService.getActas().subscribe((res) => {
      res.forEach((e: any) => {
        // e.fecha = moment.tz(e.fecha, 'YYYY/MM/DD', 'America/Bogota');
        // e.fecha = Date.parse(moment.tz(e.fecha, 'America/Bogota').format());

        // moment.tz(e.fecha, 'YYYY/MM/DD', 'America/Bogota');

        this.dataSource.push(e);
      });
      // this.dataSource = this.ELEMENT_DATA;
    });
  }

  crearActa() {
    this.router.navigate(['acta']);
  }

  ejecutar(id: string, type: string) {
    let body = {
      estado: type,
      fecha: Date.now(),
    };
    this.actaService.updateActa(id, body).subscribe((res: any) => {
      if (res.success === true) {
        this.dataSource = this.dataSource.map((e) => {
          if (e.id === id) {
            e.estado = type;
          }

          return e;
        });

        Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          icon: TYPE.SUCCESS,
          boolean: false,
          timer: 5000,
          title: 'Acta actualizada exitosamente',
        });
      }
    });
  }
}
