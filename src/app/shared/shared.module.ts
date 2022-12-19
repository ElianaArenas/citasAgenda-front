import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { AgendaComponent } from '../agenda/agenda.component';

@NgModule({
  declarations: [FooterComponent, AgendaComponent],
  imports: [CommonModule],
})
export class SharedModule {}
