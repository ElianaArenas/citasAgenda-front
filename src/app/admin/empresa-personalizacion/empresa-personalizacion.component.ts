import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { CompanyService } from '../../service/company.service';
import { CompanyI } from '../../interfaces/company';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-empresa-personalizacion',
  templateUrl: './empresa-personalizacion.component.html',
  styleUrls: ['./empresa-personalizacion.component.css'],
})
export class EmpresaPersonalizacionComponent {
  company!: CompanyI;
  showLoading: boolean = false;

  constructor(private fb: FormBuilder, private companyService: CompanyService) {
    this.getCompany();
  }

  companyForm: FormGroup = this.fb.group({
    administrador: ['', Validators.required],
    direccion: ['', Validators.required],
    telefono: [''],
    email: ['', Validators.required],
    titulo: ['', Validators.required],
    facebook: [''],
    instagram: [''],
    whatsapp: [''],
    twitter: [''],
    linkedin: [''],
    youtube: [''],
    descripcion: [''],
  });

  getCompany() {
    this.companyService.getCompany().subscribe((company: any) => {
      if (!company) {
        Swal.fire('Error', 'Hubo un error al obtener la empresa', 'error');
        return;
      }
      this.company = company;

      this.companyForm.setValue({
        administrador: company.message?.administrador,
        direccion: company.message?.direccion,
        telefono: company.message?.telefono1,
        email: company.message?.email,
        titulo: company.message?.title,
        facebook: company.message?.facebook,
        instagram: company.message?.instagram,
        whatsapp: company.message?.whatsapp,
        twitter: company.message?.twitter,
        linkedin: company.message?.linkedin,
        youtube: company.message?.youtube,
        descripcion: company.message?.descripcion,
      });
    });
  }

  updateCompany() {
    if (this.companyForm.invalid) {
      this.companyForm.markAllAsTouched();
      Swal.fire('Error', 'Debe llenar los campos obligatorios', 'error');
      return;
    }

    const {
      administrador,
      direccion,
      telefono,
      email,
      titulo,
      facebook,
      instagram,
      whatsapp,
      twitter,
      youtube,
      linkedin,
      descripcion,
    } = this.companyForm.value;

    const updateBody = {
      title: titulo,
      descripcion: descripcion,
      administrador,
      telefono1: telefono,
      direccion,
      email,
      facebook,
      instagram,
      whatsapp,
      twitter,
      linkedin,
      youtube: youtube,
    };

    this.companyService.updateCompany(updateBody).subscribe((company: any) => {
      if (!company) {
        Swal.fire('Error', 'Hubo un error en la petición', 'error');
        return;
      }
      Swal.fire('Actualizado correctamente', '', 'success');
      this.showLoading = false;
      this.getCompany();
      console.log('Updated');
    });
  }
}
