import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { LoginService } from '../service/auth.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css'],
})
export class NewPasswordComponent {
  constructor(
    private fb: FormBuilder,
    private authService: LoginService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  faEye = faEye;
  faEyeSlash = faEyeSlash;
  fieldTextType!: boolean;
  fieldTextType1!: boolean;
  fieldTextType2!: boolean;

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

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleFieldTextType1() {
    this.fieldTextType1 = !this.fieldTextType1;
  }
  toggleFieldTextType2() {
    this.fieldTextType2 = !this.fieldTextType2;
  }

  updatePassword() {
    if (this.updatePasswordForm.invalid) {
      this.updatePasswordForm.markAllAsTouched();
      Swal.fire('Error', 'Debe llenar los campos obligatorios', 'error');
      return;
    }
    const { oldPassword, newPassword, confirmPassword } =
      this.updatePasswordForm.value;
    console.log({ oldPassword, newPassword, confirmPassword });
    const token = this.route.snapshot.paramMap.get('token');

    console.log({ token });

    this.authService
      .newPassword({ newPassword }, token as string)
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

        this.router.navigateByUrl('/login');
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
