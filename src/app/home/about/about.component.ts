import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../service/company.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  constructor(private companyService: CompanyService) {
    this.getCompanyInformation();
  }

  description: string = '';
  title: string = '';

  getCompanyInformation() {
    this.companyService.getCompany().subscribe((message: any) => {
      this.description = message.descripcion;
      this.title = message.title;
    });
  }
}
