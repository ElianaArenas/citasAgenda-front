import { Component } from '@angular/core';
import { CompanyI } from 'src/app/interfaces/company';
import { CompanyService } from 'src/app/service/company.service';
import {
  faTwitter,
  faFacebookF,
  faInstagramSquare,
} from '@fortawesome/free-brands-svg-icons';

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

  constructor(private companyService: CompanyService) {
    this.getCompanyInformation();
  }

  getCompanyInformation() {
    this.companyService.getCompany().subscribe((company) => {
      this.company = company;

      console.log(this.company);
    });
  }
}
