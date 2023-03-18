import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../service/company.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  constructor(private companyService: CompanyService) {
    this.getCompanyInformation();
    this.getImages();
  }

  images!: any;

  description: string = '';
  title: string = '';

  getCompanyInformation() {
    this.companyService.getCompany().subscribe((message: any) => {
      this.description = message.descripcion;
      this.title = message.title;
    });
  }

  getImages() {
    this.companyService.getImages().subscribe((resp: any) => {
      if (!resp) {
        Swal.fire('Error', 'Hubo un error al cargar la imagen', 'error');
        return;
      }
      console.log({ resp });
      this.images = resp.filter((img: any) => img.tipo === 'eventos');

      console.log(this.images);
    });
  }
}
