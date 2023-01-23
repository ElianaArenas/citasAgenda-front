import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './home/about/about.component';
import { AgendaComponent } from './agenda/agenda.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormInfoUsersComponent } from './form-info-users/form-info-users.component';
import { ValidarTokenGuard } from './validar-token.guard';
import { EmpresaPersonalizacionComponent } from './admin/empresa-personalizacion/empresa-personalizacion.component';
import { AgendaConfigureComponent } from './agenda/agenda-configure/agenda-configure.component';
import { RegisterUserComponent } from './admin/register-user/register-user.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AyudaComponent } from './guia/ayuda/ayuda.component';
import { SobrenosotrosComponent } from './sobrenosotros/sobrenosotros.component';
import { ImagenesComponent } from './imagenes/imagenes.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'agenda', component: AgendaComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard],
  },
  {
    path: 'formUsers',
    component: FormInfoUsersComponent,
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard],
  },
  {
    path: 'personalizar',
    component: EmpresaPersonalizacionComponent,
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard],
  },
  {
    path: 'imagenes',
    component: ImagenesComponent,
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard],
  },
  {
    path: 'admin/register',
    component: RegisterUserComponent,
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard],
  },
  {
    path: 'admin/users',
    component: AdminUsersComponent,
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard],
  },
  {
    path: 'configureAgenda',
    component: AgendaConfigureComponent,
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard],
  },
  {
    path: 'guia/ayuda',
    component: AyudaComponent,
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard],
  },
  {
    path: 'aboutUs',
    component: SobrenosotrosComponent,
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
