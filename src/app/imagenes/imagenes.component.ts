import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CompanyService } from '../service/company.service';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.css'],
})
export class ImagenesComponent {
  file: any = null; // Variable to store file
  urlImage: any;
  constructor(private companyService: CompanyService) {}

  preUploadImages(event: any) {
    this.file = event.target.files[0];

    const extencionName = /.(jpe?g|gif|png|jfif)$/i;

    if (this.file) {
      let validateExtention = extencionName.test(this.file.name);
      if (!validateExtention) {
        Swal.fire('Error', 'Extensión no valida', 'error');
        return;
      }
    }

    this.urlImage = URL.createObjectURL(this.file);
  }

  uploadImages() {
    this.companyService.uploadImages(this.file).subscribe((resp) => {
      if (!resp) {
        Swal.fire('Error', 'Hubo un error al cargar la imagen', 'error');
        return;
      }
      Swal.fire('Excelente', 'Imagen cargada con exito', 'success');
    });
  }
}
