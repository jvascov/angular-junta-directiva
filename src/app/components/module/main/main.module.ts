import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from '../../pages/main/main.component';
import { AngularMaterialModule } from '../../../shared/modules/angular-material.module';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { PropietariosComponent } from '../../pages/propietarios/propietarios.component';
import { ActasComponent } from '../../pages/actas/actas.component';
import { VotacionesComponent } from '../../pages/votaciones/votaciones.component';
import { ResultadosComponent } from '../../pages/resultados/resultados.component';
import { HttpClientModule } from '@angular/common/http';
import { PropietarioComponent } from '../../pages/propietarios/propietario/propietario.component';

const declarations = [
  MainComponent,
  NavBarComponent,
  HeaderComponent,
  DashboardComponent,
  PropietariosComponent,
  ActasComponent,
  VotacionesComponent,
  ResultadosComponent,
  PropietarioComponent,
];

@NgModule({
  declarations: [...declarations],
  imports: [
    CommonModule,
    MainRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
  ],
  exports: [MainComponent],
})
export class MainModule {}
