import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private auth   = inject(AuthService);
  private router = inject(Router);

  form = { email: '', senha: '' };
  loading = signal(false);
  error = signal('');
  showPass = signal(false);

  submit() {
    if (!this.form.email || !this.form.senha) {
      this.error.set('Preencha e-mail e senha.');
      return;
    }
    this.loading.set(true);
    this.error.set('');
    this.auth.login(this.form).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.error ?? 'E-mail ou senha incorretos.');
      },
    });
  }
}
