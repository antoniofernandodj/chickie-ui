import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import {
  UiInputComponent,
  UiButtonComponent,
  UiErrorBannerComponent,
  UiAvatarComponent,
} from '../../../shared/components';

@Component({
  selector: 'app-esqueci-senha',
  imports: [RouterLink, ReactiveFormsModule, UiInputComponent, UiButtonComponent, UiErrorBannerComponent, UiAvatarComponent],
  templateUrl: './esqueci-senha.component.html',
})
export class EsqueciSenhaComponent {
  private auth = inject(AuthService);
  private fb   = inject(FormBuilder);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  loading = signal(false);
  error   = signal('');
  enviado = signal(false);

  get f() { return this.form.controls; }

  emailError = computed(() => {
    const c = this.f.email;
    if (!c.invalid || !c.touched) return null;
    if (c.errors?.['required']) return 'E-mail é obrigatório.';
    if (c.errors?.['email'])    return 'Informe um e-mail válido.';
    return null;
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.error.set('');

    this.auth.esquecerSenha(this.f.email.value!).subscribe({
      next: () => {
        this.loading.set(false);
        this.enviado.set(true);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.error ?? 'Não foi possível enviar o email. Tente novamente.');
      },
    });
  }
}
