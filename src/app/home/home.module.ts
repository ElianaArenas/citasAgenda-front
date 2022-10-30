import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { CarruselComponent } from './carrusel/carrusel.component';



@NgModule({
  declarations: [
    AboutComponent,
    HeaderComponent,
    MenuComponent,
    CarruselComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
