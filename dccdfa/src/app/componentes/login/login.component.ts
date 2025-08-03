import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { CarouselComponent } from '../carrosel/carrosel.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    CarouselComponent,
    HttpClientModule, 
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      nome: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.formLogin.invalid) {
      console.warn('Formulário inválido', this.formLogin.value);
      return;
    }

    const nome = this.formLogin.value.nome.trim();
    const senha = this.formLogin.value.senha.trim();

    console.log('Enviando login:', nome, senha);

    this.loginService.login(nome, senha).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido', response);
        this.router.navigate(['home']);
      },
      error: (error) => {
        console.error('Erro no login:', error);
        alert(error.error?.message || 'Erro ao fazer login.');
      },
    });
  }
}