import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../service/company.service';
import { CompanyI } from '../../interfaces/company';

@Component({
  selector: 'app-empresa-personalizacion',
  templateUrl: './empresa-personalizacion.component.html',
  styleUrls: ['./empresa-personalizacion.component.css'],
})
export class EmpresaPersonalizacionComponent {
  company!: CompanyI;

  constructor(private companyService: CompanyService) {
    this.getCompany();
  }

  getCompany() {
    this.companyService.getCompany().subscribe((company: CompanyI) => {
      this.company = company;
    });
  }
}
