import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/service/company.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css'],
})
export class CarruselComponent implements OnInit {
  constructor(private companyService: CompanyService) {
    this.getImages();
  }
  imagesCarrusel!: any;
  ngOnInit(): void {}

  getImages() {
    this.companyService.getImages().subscribe((resp: any) => {
      if (!resp) {
        Swal.fire('Error', 'Hubo un error al cargar la imagen', 'error');
        return;
      }
      this.imagesCarrusel = resp.filter((img: any) => img.tipo === 'carrusel');
    });
  }
}
