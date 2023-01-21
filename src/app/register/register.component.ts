import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
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
    document: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    code: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: LoginService
  ) {}

  register() {
    if (this.registerForm.invalid) {
      Swal.fire('Error', 'Debe llenar los campos obligatorios', 'error');
      return;
    }
    this.authService.register(this.registerForm.value).subscribe((login) => {
      if (!login) {
        Swal.fire('Error', '', 'error');
      } else {
        this.router.navigateByUrl('/about');
      }
    });
  }
}
