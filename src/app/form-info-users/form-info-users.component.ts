import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IUser } from '../interfaces/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-form-info-users',
  templateUrl: './form-info-users.component.html',
  styleUrls: ['./form-info-users.component.css'],
})
export class FormInfoUsersComponent implements OnInit {
  updatePasswordForm: FormGroup = this.fb.group({
    oldPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  user!: IUser;
  show: boolean = true;
  userId = JSON.parse(localStorage.getItem('user') || '')._id || '';

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.getUser();
  }

  ngOnInit(): void {}

  getUser() {
    this.userService.getUser(this.userId).subscribe((user) => {
      this.user = user;
    });
  }

  navigateAgenda() {
    this.router.navigateByUrl('dashboard');
  }

  showForm() {
    this.show = false;
  }

  updatePassword() {
    const { oldPassword, newPassword } = this.updatePasswordForm.value;
    this.userService
      .updatePassword(this.userId, oldPassword, newPassword)
      .subscribe((updated) => {
        Swal.fire(
          'Operación exitosa',
          'Se actualizó correctamente la contraseña',
          'success'
        );
      });
  }
}
