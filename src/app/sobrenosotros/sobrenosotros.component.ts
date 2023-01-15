import { Component, OnInit } from '@angular/core';
import {
  faTwitter,
  faFacebookF,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-sobrenosotros',
  templateUrl: './sobrenosotros.component.html',
  styleUrls: ['./sobrenosotros.component.css'],
})
export class SobrenosotrosComponent {
  faFacebook = faFacebookF;
  faTwitter = faTwitter;
  faLinkedinIn = faLinkedinIn;
  constructor() {}
}
