import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  mailForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  showLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: LoginService
  ) {}

  login() {
    const { email, password } = this.loginForm.value;
    this.showLoading = true;
    this.authService.login(email, password).subscribe((login) => {
      if (!login?.token) {
        this.showLoading = false;
        this.router.navigateByUrl('/login');
        Swal.fire('Error', 'Credenciales invalidas', 'error');
      } else {
        // this.showLoading = false;
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

  sendMail() {
    const { email } = this.mailForm.value;

    if (this.mailForm.invalid) {
      Swal.fire('Error', 'Debe colocar un correo valido', 'error');
      return;
    }

    this.authService.SendMailForgotPassword({ email }).subscribe((resp) => {
      Swal.fire(
        'Excelente',
        'Se ha enviado el correo de recuperación de contraseña',
        'success'
      );
      console.log(resp);
    });
  }
}
