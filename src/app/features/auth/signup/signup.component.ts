import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ClasseUsuario } from '../../../core/models';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, FormsModule],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  private auth   = inject(AuthService);
  private router = inject(Router);

  form = {
    nome:        '',
    username:    '',
    email:       '',
    senha:       '',
    telefone:    '',
    auth_method: 'email',
    classe:      'cliente' as ClasseUsuario,
  };

  readonly classOptions: { value: ClasseUsuario; label: string; icon: string }[] = [
    { value: 'cliente',        label: 'Cliente',        icon: '🛒' },
    { value: 'administrador',  label: 'Administrador',  icon: '👑' },
  ];

  loading  = signal(false);
  error    = signal('');
  showPass = signal(false);

  submit() {
    const { nome, username, email, senha, telefone } = this.form;
    if (!nome || !username || !email || !senha || !telefone) {
      this.error.set('Preencha todos os campos obrigatórios.');
      return;
    }
    this.loading.set(true);
    this.error.set('');
    this.auth.signup(this.form).subscribe({
      next: (user) => {
        this.auth.saveUserMeta(user.nome);
        this.auth.login({ email, senha }).subscribe({
          next: () => this.router.navigate(['/']),
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
