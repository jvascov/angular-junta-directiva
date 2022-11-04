import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { AuthRoutingModule } from './components/module/auth/auth-routing.module';
import { MainRoutingModule } from './components/module/main/main-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthRoutingModule, MainRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
