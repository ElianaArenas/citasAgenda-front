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
}
