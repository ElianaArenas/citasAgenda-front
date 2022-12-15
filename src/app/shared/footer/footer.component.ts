import { Component, OnInit } from '@angular/core';
import { CompanyI } from 'src/app/interfaces/company';
import { CompanyService } from 'src/app/service/company.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  company!: CompanyI;

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
