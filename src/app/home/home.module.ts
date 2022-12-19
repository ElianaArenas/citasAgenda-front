import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { CarruselComponent } from './carrusel/carrusel.component';
import { BodyComponent } from './body/body.component';
import { HomeComponent } from './home.component';
import { AgendaComponent } from '../agenda/agenda.component';

@NgModule({
  declarations: [
    AboutComponent,
    HeaderComponent,
    MenuComponent,
    CarruselComponent,
    BodyComponent,
    HomeComponent,
    AgendaComponent,
  ],
  imports: [CommonModule],
})
export class HomeModule {}
