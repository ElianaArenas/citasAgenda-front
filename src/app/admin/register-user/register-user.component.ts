import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent {
  registerForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    genero: [''],
    documento: [''],
    email: [''],
    codigo: [''],
    idFamiliar: [''],
    celular: [''],
    categoria: [''],
    direccion: [''],
    barrio: [''],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    rol: [''],
    activo: [''],
  });

  generos: string[] = ['F', 'M', 'Otro'];
  userStatus: string[] = ['Inactivo', 'Activar', 'Desactivar'];
  roles: string[] = ['Administrador', 'Profesor', 'Canchero', 'Socio'];
  constructor(private fb: FormBuilder, private adminService: AdminService) {}

  register() {
    const {
      nombre,
      genero,
      documento,
      email,
      codigo,
      idFamiliar,
      celular,
      categoria,
      direccion,
      barrio,
      torneos,
      newPassword,
      confirmPassword,
      rol,
      activo,
    } = this.registerForm.value;

    const createUser = {
      nombre: nombre,
      codigo: codigo,
      documento: documento,
      celular: celular,
      direccion: direccion,
      activo: activo === 'Activar',
      grupoFamiliar: idFamiliar,
      rol,
      contra: newPassword,
      email,
      genero: genero,
      barrio: barrio,
    };

    this.adminService.createUser(createUser).subscribe((res) => {
      Swal.fire('Excelente', 'Usuario creado exitosamente', 'success');
      //TODO:Control errors
      if (res._id) {
        Swal.fire('Excelente', 'Usuario creado exitosamente', 'success');
      } else {
        Swal.fire('Error', 'Ocurrió un problema al crear el usuario', 'error');
      }
    });
  }
}
