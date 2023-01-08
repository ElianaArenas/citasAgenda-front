import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent {
  registerForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    genero: [''],
    documento: [''],
    email: [''],
    codigo: [''],
    idFamiliar: [''],
    celuar: [''],
    categoria: [''],
    direccion: [''],
    barrio: [''],
    torneos: [''],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    rol: [''],
    activo: [''],
  });

  generos: string[] = ['F', 'M', 'Otro'];
  constructor(private fb: FormBuilder) {}

  register() {
    const {
      nombre,
      genero,
      documento,
      email,
      codigo,
      idFamiliar,
      celuar,
      categoria,
      direccion,
      barrio,
      torneos,
      newPassword,
      confirmPassword,
      rol,
      activo,
    } = this.registerForm.value;
  }
}
