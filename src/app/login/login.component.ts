import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from '../service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  mailForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  showLoading: boolean = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  fieldTextType!: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: LoginService
  ) {}

  login() {
    const { email, password } = this.loginForm.value;

    if (this.loginForm.invalid) {
      Swal.fire('Error', 'Debe ingresar el usuario y contraseña', 'error');
      return;
    }

    this.showLoading = true;
    this.authService.login(email, password).subscribe((login) => {
      if (!login) {
        this.showLoading = false;
        this.router.navigateByUrl('/login');
        Swal.fire('Error', 'Credenciales invalidas', 'error');
      } else {
        this.showLoading = false;
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  sendMail() {
    const { email } = this.mailForm.value;

    if (this.mailForm.invalid) {
      Swal.fire('Error', 'Debe colocar un correo valido', 'error');
      return;
    }

    this.authService.SendMailForgotPassword({ email }).subscribe((resp) => {
      if (!resp) {
        Swal.fire('Error', 'Hubo un error al enviar el correo', 'error');
        return;
      }
      Swal.fire(
        'Excelente',
        'Se ha enviado el correo de recuperación de contraseña',
        'success'
      );
    });
  }
}
