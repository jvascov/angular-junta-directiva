import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from '../../pages/main/main.component';
import { AngularMaterialModule } from '../../../shared/modules/angular-material.module';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { PropietariosComponent } from '../../pages/propietarios/propietarios.component';
import { ActasComponent } from '../../pages/actas/actas.component';
import { VotacionesComponent } from '../../pages/votaciones/votaciones.component';
import { ResultadosComponent } from '../../pages/resultados/resultados.component';
import { HttpClientModule } from '@angular/common/http';
import { PropietarioComponent } from '../../pages/propietarios/propietario/propietario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActaComponent } from '../../pages/actas/acta/acta.component';
import { SharedModule } from '../../../shared/shared.module';

const declarations = [
  MainComponent,

  DashboardComponent,
  PropietariosComponent,
  ActasComponent,
  VotacionesComponent,
  ResultadosComponent,
  PropietarioComponent,
  ActaComponent,
];

@NgModule({
  declarations: [...declarations],
  imports: [
    CommonModule,
    MainRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [declarations],
})
export class MainModule {}
