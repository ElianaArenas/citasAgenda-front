import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxColorsModule } from 'ngx-colors';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings,
} from 'ng-recaptcha';
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
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormInfoUsersComponent } from './form-info-users/form-info-users.component';
import { EmpresaPersonalizacionComponent } from './admin/empresa-personalizacion/empresa-personalizacion.component';
import { AgendaConfigureComponent } from './agenda/agenda-configure/agenda-configure.component';
import { RegisterUserComponent } from './admin/register-user/register-user.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AyudaComponent } from './guia/ayuda/ayuda.component';
import { SobrenosotrosComponent } from './sobrenosotros/sobrenosotros.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImagenesComponent } from './imagenes/imagenes.component';
import { SafeUrlPipePipe } from './safe-url-pipe.pipe';
import { SpinnerModule } from './shared/components/spinner/spinner.module';
import { SpinnerInterceptor } from './shared/interceptors/spinner.interceptor';
import { NotificationsComponent } from './admin/notifications/notifications.component';
import { NewPasswordComponent } from './new-password/new-password.component';

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
    EmpresaPersonalizacionComponent,
    AgendaConfigureComponent,
    RegisterUserComponent,
    AdminUsersComponent,
    AyudaComponent,
    SobrenosotrosComponent,
    ImagenesComponent,
    SafeUrlPipePipe,
    NotificationsComponent,
    NewPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgxColorsModule,
    FontAwesomeModule,
    SpinnerModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6LeXIyUkAAAAAOPbh3HUnrYDyoBI9kexkMK7RyHM',
      } as RecaptchaSettings,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
