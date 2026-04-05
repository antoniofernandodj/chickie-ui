import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ClasseUsuario } from '../../../core/models';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9_]+$/)]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
    telefone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
    auth_method: ['email'],
    classe: ['cliente' as ClasseUsuario],
  });

  readonly classOptions: { value: ClasseUsuario; label: string; icon: string }[] = [
    { value: 'cliente', label: 'Cliente', icon: '🛒' },
    { value: 'administrador', label: 'Administrador', icon: '👑' },
  ];

  loading = signal(false);
  error = signal('');
  showPass = signal(false);

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error.set('Preencha todos os campos obrigatórios corretamente.');
      return;
    }
    this.loading.set(true);
    this.error.set('');
    const formValue = this.form.value;
    this.auth.signup({
      nome: formValue.nome!,
      username: formValue.username!,
      email: formValue.email!,
      senha: formValue.senha!,
      telefone: formValue.telefone!,
      auth_method: formValue.auth_method!,
      classe: formValue.classe!,
    }).subscribe({
      next: (user) => {
        this.auth.saveUserMeta(user.nome);
        const { email, senha } = formValue;
        this.auth.login({ email: email!, senha: senha! }).subscribe({
          next: () => {
            // Busca o perfil via GET /api/auth/me para salvar chickie_classe
            this.auth.fetchAndSaveUserProfile().subscribe({
              next: () => this.router.navigate(['/']),
              error: () => this.router.navigate(['/auth/login']),
            });
          },
          error: () => this.router.navigate(['/auth/login']),
        });
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.error ?? 'Erro ao criar conta. Tente novamente.');
      },
    });
  }
}
