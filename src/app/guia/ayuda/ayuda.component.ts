import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css'],
})
export class AyudaComponent {
  pagina: number = 1;
  constructor() {}

  next() {
    if (this.pagina < 4) this.pagina++;
    if (this.pagina === 4) {
      this.pagina = 1;
    }
  }

  previous() {
    if (this.pagina > 1) {
      this.pagina--;
    }
    if (this.pagina === 1) {
      this.pagina = 4;
    }
  }

  setPage(page: number) {
    this.pagina = page;
  }
}
