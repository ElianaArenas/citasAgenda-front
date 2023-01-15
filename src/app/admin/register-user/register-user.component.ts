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
  registerForm: FormGroup = this.fb.group(
    {
      nombre: ['', [Validators.required]],
      genero: [''],
      documento: ['', [Validators.required]],
      email: ['', [Validators.required]],
      codigo: ['', [Validators.required]],
      idFamiliar: ['', [Validators.required]],
      celular: [''],
      categoria: [''],
      direccion: ['', [Validators.required]],
      barrio: ['', [Validators.required]],
      newPassword: ['', [Validators.required /*, Validators.minLength(6)*/]],
      confirmPassword: [
        '',
        [Validators.required /*, Validators.minLength(6)*/],
      ],
      rol: [''],
      activo: [''],
    },
    {
      validator: this.ConfirmedValidator('newPassword', 'confirmPassword'),
    }
  );

  generos: string[] = ['F', 'M', 'Otro'];
  userStatus: string[] = ['Inactivo', 'Activar', 'Desactivar'];
  roles: string[] = ['Administrador', 'Profesor', 'Canchero', 'Socio'];
  constructor(private fb: FormBuilder, private adminService: AdminService) {}

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      Swal.fire('Error', 'Debe llenar los campos obligatorios', 'error');
      return;
    }

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
      //TODO:Control errors
      Swal.fire('Excelente', 'Usuario creado exitosamente', 'success');
    });
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
