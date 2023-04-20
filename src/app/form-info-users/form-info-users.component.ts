import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { IUser } from '../interfaces/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-form-info-users',
  templateUrl: './form-info-users.component.html',
  styleUrls: ['./form-info-users.component.css'],
})
export class FormInfoUsersComponent {
  registerForm: FormGroup = this.fb.group({
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
  });
  generos: string[] = ['F', 'M', 'Otro'];
  user!: IUser;
  show: boolean = true;
  userId = JSON.parse(localStorage.getItem('user') || '')._id || '';
  showLoading: boolean = false;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.getUser();
  }

  getUser() {
    this.showLoading = true;
    this.userService.getUser(this.userId).subscribe((user) => {
      this.user = user;

      console.log(user?.message?.idFamiliar);

      this.registerForm.get('nombre')?.setValue(user?.message?.nombre);
      this.registerForm.get('genero')?.setValue(user?.message?.genero);
      this.registerForm.get('documento')?.setValue(user?.message?.documento);
      this.registerForm.get('email')?.setValue(user?.message?.email);
      this.registerForm.get('codigo')?.setValue(user?.message?.codigo);
      this.registerForm.get('idFamiliar')?.setValue(user?.message?.idFamiliar);
      this.registerForm.get('celular')?.setValue(user?.message?.celular);
      this.registerForm.get('categoria')?.setValue(user?.message?.categoria);
      this.registerForm.get('direccion')?.setValue(user?.message?.direccion);
      this.registerForm.get('barrio')?.setValue(user?.message?.barrio);
      this.showLoading = false;
    });
  }

  updateUser() {
    const {
      nombre,
      genero,
      documento,
      email,
      celular,
      categoria,
      direccion,
      barrio,
      idFamiliar,
    } = this.registerForm.value;

    const updateBody = {
      nombre,
      genero,
      documento,
      email,
      codigo: documento,
      idFamilia: 1,
      celular,
      categoria,
      direccion,
      barrio,
      idFamiliar,
    };

    this.userService
      .updateUser(Number(this.user?.message?.documento), updateBody)
      .subscribe((resp) => {
        Swal.fire(
          'Operación exitosa',
          'Se actualizó el usuario correctamente',
          'success'
        );
        this.getUser();
      });
  }
}
