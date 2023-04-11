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
    documento: ['', [Validators.required]],
    email: ['', [Validators.required]],
    celular: [''],
    categoria: [''],
    direccion: ['', [Validators.required]],
    barrio: ['', [Validators.required]],
    rol: [''],
    activo: [''],
    color: [''],
  });

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
      celular,
      categoria,
      direccion,
      barrio,
      torneos,
      newPassword,
      rol,
      activo,
      color,
    } = this.registerForm.value;

    const createUser = {
      nombre: nombre,
      codigo: documento,
      documento: documento,
      celular: celular,
      direccion: direccion,
      activo: activo === 'Activar',
      grupoFamiliar: 1,
      rol,
      contra: documento,
      email,
      genero: genero,
      barrio: barrio,
      color,
    };

    this.adminService.createUser(createUser).subscribe((res) => {
      if (!res) {
        Swal.fire('Error', 'Hubo un error al crear el usuario', 'error');
        return;
      }
      Swal.fire('Excelente', 'Usuario creado exitosamente', 'success');
      this.registerForm.get('nombre')?.setValue('');
      this.registerForm.get('genero')?.setValue('');
      this.registerForm.get('documento')?.setValue('');
      this.registerForm.get('email')?.setValue('');
      this.registerForm.get('celular')?.setValue('');
      this.registerForm.get('categoria')?.setValue('');
      this.registerForm.get('direccion')?.setValue('');
      this.registerForm.get('barrio')?.setValue('');
      this.registerForm.get('rol')?.setValue('');
      this.registerForm.get('activo')?.setValue('');

      this.registerForm.markAsUntouched();
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
