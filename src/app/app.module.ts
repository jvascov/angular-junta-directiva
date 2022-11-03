import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { MainModule } from './components/module/main/main.module';
import { AuthModule } from './components/module/auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './shared/modules/angular-material.module';
import { CookieService } from 'ngx-cookie-service';

const imports = [
  BrowserModule,
  AppRoutingModule,
  MainModule,
  AuthModule,
  AngularMaterialModule,
  BrowserAnimationsModule,
];

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [...imports],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
