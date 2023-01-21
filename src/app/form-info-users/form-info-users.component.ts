import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { IUser } from '../interfaces/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-form-info-users',
  templateUrl: './form-info-users.component.html',
  styleUrls: ['./form-info-users.component.css'],
})
export class FormInfoUsersComponent implements OnInit {
  updatePasswordForm: FormGroup = this.fb.group(
    {
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validator: this.ConfirmedValidator('newPassword', 'confirmPassword'),
    }
  );

  user!: IUser;
  show: boolean = true;
  userId = JSON.parse(localStorage.getItem('user') || '')._id || '';
  showLoading: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.getUser();
  }

  ngOnInit(): void {}

  getUser() {
    this.showLoading = true;
    this.userService.getUser(this.userId).subscribe((user) => {
      this.user = user;
      this.showLoading = false;
    });
  }

  navigateAgenda() {
    this.router.navigateByUrl('dashboard');
  }

  showForm() {
    this.show = false;
  }

  updatePassword() {
    if (this.updatePasswordForm.invalid) {
      this.updatePasswordForm.markAllAsTouched();
      Swal.fire('Error', 'Debe llenar los campos obligatorios', 'error');
      return;
    }
    const { oldPassword, newPassword } = this.updatePasswordForm.value;
    this.userService
      .updatePassword(this.userId, oldPassword, newPassword)
      .subscribe((updated) => {
        if (!updated) {
          Swal.fire(
            'Error',
            'Hubo un error al actualizar la contraseña',
            'error'
          );
          return;
        }

        Swal.fire(
          'Operación exitosa',
          'Se actualizó correctamente la contraseña',
          'success'
        );
        this.updatePasswordForm.setValue({
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        this.updatePasswordForm.markAsUntouched();
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
