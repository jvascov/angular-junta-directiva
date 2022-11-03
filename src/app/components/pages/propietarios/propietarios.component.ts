import { Component, OnInit } from '@angular/core';
import { PropietariosService } from '../../services/propietarios.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

export interface PeriodicElement {
  id: string;
  nombre: string;
  celular: string;
  email: string;
  role: string;
  opciones: string;
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
        console.log('prop', e);
      });
      this.dataSource = this.ELEMENT_DATA;
    });
  }

  onClick(id: string) {
    console.log('click', id);
  }

  createPropietario() {
    this.router.navigate(['propietario']);
  }
}
