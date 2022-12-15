import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup = this.fb.group({
    document: ['', [Validators.required]],
    code: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: LoginService
  ) {}

  register() {
    this.authService.register(this.registerForm.value).subscribe((login) => {
      if (!login?.token) {
        Swal.fire('Error', login?.message, 'error');
      } else {
        this.router.navigateByUrl('/about');
      }
    });
  }
}
