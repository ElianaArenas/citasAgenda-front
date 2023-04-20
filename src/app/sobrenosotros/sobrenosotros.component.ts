import { Component, OnInit } from '@angular/core';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sobrenosotros',
  templateUrl: './sobrenosotros.component.html',
  styleUrls: ['./sobrenosotros.component.css'],
})
export class SobrenosotrosComponent {
  faLinkedinIn = faLinkedinIn;
  faEnvelope = faEnvelope;
  constructor() {}
}
