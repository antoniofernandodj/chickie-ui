import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
  });

  loading = signal(false);
  error = signal('');
  showPass = signal(false);

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error.set('Preencha e-mail e senha corretamente.');
      return;
    }
    this.loading.set(true);
    this.error.set('');
    const { email, senha } = this.form.value;
    this.auth.login({ email: email!, senha: senha! }).subscribe({
      next: () => {
        // Busca o perfil via GET /api/auth/me para salvar chickie_classe
        this.auth.fetchAndSaveUserProfile().subscribe({
          next: () => this.router.navigate(['/']),
          error: () => this.router.navigate(['/']), // Continua mesmo se falhar
        });
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.error ?? 'E-mail ou senha incorretos.');
      },
    });
  }
}
