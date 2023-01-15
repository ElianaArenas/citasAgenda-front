import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent {
  estados: string[] = ['Activo', 'Inactivo'];
  roles: string[] = ['Administrador', 'Profesor', 'Canchero', 'Socio'];
  generos: string[] = ['F', 'M', 'Otro'];
  users: any[] = [];
  user: any;
  usersForm: FormGroup = this.fb.group({
    rol: [''],
    status: [''],
  });
  editForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    genero: ['', [Validators.required]],
    documento: ['', [Validators.required]],
    email: ['', [Validators.required]],
    codigo: ['', [Validators.required]],
    idFamiliar: [''],
    celular: [''],
    categoria: [''],
    direccion: ['', [Validators.required]],
    barrio: ['', [Validators.required]],
    rol: ['', [Validators.required]],
    activo: ['', [Validators.required]],
  });
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.getUsers();
  }

  getUsers() {
    const { rol, status } = this.usersForm.value;
    const isActive = status === 'Activo';
    this.userService.getUsers().subscribe((users: IUser[]) => {
      if (rol === 'Todos' || status === 'Todos') {
        if (status != 'Todos') {
          this.users = users.filter((user: any) => {
            return user.activo === isActive;
          });
          return;
        }
        if (rol != 'Todos') {
          this.users = users.filter((user: any) => {
            return user.rol[0].name === rol;
          });
          return;
        }
        this.users = users;
        return;
      }
      this.users = users.filter((user: any) => {
        return user.rol[0].name === rol && user.activo === isActive;
      });
    });
  }

  getUser(user: any) {
    this.user = user;
    console.log(this.user);

    this.editForm.setValue({
      nombre: user.nombre,
      genero: '',
      documento: user.documento,
      email: user.email,
      codigo: user.codigo,
      idFamiliar: '',
      celular: user.celular,
      categoria: '',
      direccion: user.direccion,
      barrio: '',
      rol: '',
      activo: user.activo,
    });
  }

  updateUser() {
    const {
      nombre,
      genero,
      documento,
      email,
      codigo,
      idFamilia,
      celular,
      categoria,
      direccion,
      barrio,
      rol,
      activo,
    } = this.editForm.value;

    const updateBody = {
      nombre,
      genero,
      documento,
      email,
      codigo,
      idFamilia,
      celular,
      categoria,
      direccion,
      barrio,
      rol,
      activo,
    };

    this.userService
      .editUser(this.user.documento, updateBody)
      .subscribe((resp) => {
        Swal.fire(
          'Operación exitosa',
          'Se actualizó el usuario correctamente',
          'success'
        );
        this.getUsers();
      });
  }

  deleteUser() {
    this.userService.deleteUser(this.user.documento).subscribe((resp) => {
      Swal.fire(
        'Operación exitosa',
        'Se eliminó el usuario correctamente',
        'success'
      );
      this.getUsers();
    });
  }
}
