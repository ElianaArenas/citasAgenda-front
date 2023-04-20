import { Component } from '@angular/core';
import { CompanyI } from 'src/app/interfaces/company';
import { CompanyService } from 'src/app/service/company.service';
import {
  faTwitter,
  faFacebookF,
  faInstagramSquare,
} from '@fortawesome/free-brands-svg-icons';

import {
  faHeart,
  faLocationDot,
  faPhone,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  company!: CompanyI;
  faFacebook = faFacebookF;
  faTwitter = faTwitter;
  faInstagram = faInstagramSquare;
  faHeart = faHeart;
  faLocationDot = faLocationDot;
  faPhone = faPhone;
  faEnvelope = faEnvelope;

  constructor(private companyService: CompanyService) {
    this.getCompanyInformation();
  }

  getCompanyInformation() {
    this.companyService.getCompany().subscribe((company: any) => {
      this.company = company;
    });
  }
}
