import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../../pages/main/main.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { PropietariosComponent } from '../../pages/propietarios/propietarios.component';
import { ActasComponent } from '../../pages/actas/actas.component';
import { VotacionesComponent } from '../../pages/votaciones/votaciones.component';
import { ResultadosComponent } from '../../pages/resultados/resultados.component';
import { PropietarioComponent } from '../../pages/propietarios/propietario/propietario.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'propietarios',
        component: PropietariosComponent,
      },
      {
        path: 'propietario',
        component: PropietarioComponent,
      },
      {
        path: 'actas',
        component: ActasComponent,
      },
      {
        path: 'votaciones',
        component: VotacionesComponent,
      },
      {
        path: 'resultados',
        component: ResultadosComponent,
      },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
