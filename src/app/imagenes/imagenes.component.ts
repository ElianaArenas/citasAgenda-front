import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
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
  imageTypes: string[] = ['carrusel', 'canchas', 'eventos'];
  imageForm: FormGroup = this.fb.group({
    descripcion: [''],
    titulo: [''],
  });
  imagesCanchas!: any;
  imagesCarrusel!: any;
  imagesEventos!: any;
  imageTypeDes!: string;

  faTrash = faTrash;
  faPencil = faPencil;

  constructor(private companyService: CompanyService, private fb: FormBuilder) {
    this.getImages();
  }

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

  getImages() {
    this.companyService.getImages().subscribe((resp: any) => {
      if (!resp) {
        Swal.fire('Error', 'Hubo un error al cargar la imagen', 'error');
        return;
      }
      this.imagesCanchas = resp.filter((img: any) => img.tipo === 'canchas');
      this.imagesCarrusel = resp.filter((img: any) => img.tipo === 'carrusel');
      this.imagesEventos = resp.filter((img: any) => img.tipo === 'eventos');
    });
  }

  imageType(image: string) {
    this.imageTypeDes = image;
  }

  uploadImages() {
    console.log(this.imageForm.get('descripcion')?.value);
    console.log(this.imageForm.get('titulo')?.value);
    this.companyService
      .uploadImages(
        this.file,
        this.imageForm.get('descripcion')?.value,
        this.imageTypeDes,
        this.imageForm.get('titulo')?.value
      )
      .subscribe((resp) => {
        if (!resp) {
          Swal.fire('Error', 'Hubo un error al cargar la imagen', 'error');
          return;
        }
        this.urlImage = null;
        this.imageForm.setValue({
          descripcion: '',
          tipo: '',
        });
        this.getImages();
        Swal.fire('Excelente', 'Imagen cargada con exito', 'success');
        this.getImages();
      });
  }

  deleteImage(id: string) {
    Swal.fire({
      title: 'Eliminar la imagen',
      text: '¿Desea eliminar la imagen?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Continuar',
    }).then((respuesta) => {
      if (respuesta.isConfirmed) {
        this.companyService.deleteImage(id).subscribe((resp) => {
          if (!resp) {
            Swal.fire('Error', 'Hubo un error al eliminar la imagen', 'error');
            return;
          }
          this.getImages();
          Swal.fire('Excelente', 'Se ha eliminado la imagen', 'success');
        });
      }
    });
  }
}
