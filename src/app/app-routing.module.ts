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
  { path: 'formUsers', component: FormInfoUsersComponent },
  { path: 'personalizar', component: EmpresaPersonalizacionComponent },
  { path: 'configureAgenda', component: AgendaConfigureComponent },
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
