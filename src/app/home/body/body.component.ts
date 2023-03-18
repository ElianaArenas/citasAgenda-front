import { Component } from '@angular/core';
import { CompanyService } from 'src/app/service/company.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent {
  constructor(private companyService: CompanyService) {
    this.getImages();
  }

  images!: any;

  getImages() {
    this.companyService.getImages().subscribe((resp: any) => {
      if (!resp) {
        Swal.fire('Error', 'Hubo un error al cargar la imagen', 'error');
        return;
      }
      console.log({ resp });
      this.images = resp.filter((img: any) => img.tipo === 'canchas');

      console.log(this.images);
    });
  }
}
