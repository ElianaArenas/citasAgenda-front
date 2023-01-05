import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { CompanyService } from '../../service/company.service';
import { CompanyI } from '../../interfaces/company';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-empresa-personalizacion',
  templateUrl: './empresa-personalizacion.component.html',
  styleUrls: ['./empresa-personalizacion.component.css'],
})
export class EmpresaPersonalizacionComponent {
  company!: CompanyI;

  constructor(private fb: FormBuilder, private companyService: CompanyService) {
    this.getCompany();
  }

  companyForm: FormGroup = this.fb.group({
    administrador: [''],
    direccion: [''],
    telefono: [''],
    email: [''],
    titulo: [''],
    facebook: [''],
    instagram: [''],
    whatsapp: [''],
    twitter: [''],
    linkedin: [''],
    youtube: [''],
    descripcion: [''],
  });

  getCompany() {
    this.companyService.getCompany().subscribe((company: CompanyI) => {
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

    this.companyService
      .updateCompany(updateBody)
      .subscribe((company: CompanyI) => {
        Swal.fire('Actualizado correctamente', '', 'success');
        console.log('Updated');
      });
  }
}
