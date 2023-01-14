import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  users: any[] = [];
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
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
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

  getUser(user: any) {}
}
