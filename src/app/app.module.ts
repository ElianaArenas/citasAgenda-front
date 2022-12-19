import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarruselComponent } from './home/carrusel/carrusel.component';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BodyComponent } from './home/body/body.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './home/about/about.component';
import { AgendaComponent } from './agenda/agenda.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormInfoUsersComponent } from './form-info-users/form-info-users.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    BodyComponent,
    CarruselComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    AgendaComponent,
    DashboardComponent,
    FormInfoUsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
