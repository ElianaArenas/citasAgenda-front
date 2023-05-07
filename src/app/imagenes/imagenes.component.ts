import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  imageId!: string;
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
        this.imageForm.get('descripcion')?.setValue('');
        this.imageForm.get('titulo')?.setValue('');
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

  preUpdateImage(imageId: string, image: any) {
    this.imageForm.get('descripcion')?.setValue(image.descripcion);
    this.imageForm.get('titulo')?.setValue(image.titulo);
    this.imageId = imageId;
  }

  updateImage() {
    const { descripcion, titulo } = this.imageForm.value;

    let body = {} as any;

    if (descripcion) body.descripcion = descripcion;
    if (titulo) body = { ...body, titulo };

    this.companyService.updateImage(this.imageId, body).subscribe((resp) => {
      if (!resp) {
        Swal.fire('Error', 'Hubo un error al cargar la imagen', 'error');
        return;
      }
      this.imageForm.get('descripcion')?.setValue('');
      this.imageForm.get('titulo')?.setValue('');
      this.getImages();
      Swal.fire('Excelente', 'Titulo y descripción actualizada', 'success');
    });
  }
}
