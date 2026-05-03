import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { PushNotificationService } from '../../../core/services/push-notification.service';
import {
  UiInputComponent,
  UiPasswordInputComponent,
  UiButtonComponent,
  UiErrorBannerComponent,
  UiAvatarComponent,
} from '../../../shared/components';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, UiInputComponent, UiPasswordInputComponent, UiButtonComponent, UiErrorBannerComponent, UiAvatarComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private auth   = inject(AuthService);
  private router = inject(Router);
  private fb     = inject(FormBuilder);
  private push   = inject(PushNotificationService);

  form = this.fb.group({
    identifier: ['', [Validators.required]],
    senha:      ['', [Validators.required, Validators.minLength(6)]],
  });

  loading  = signal(false);
  error    = signal('');

  get f() { return this.form.controls; }

  identifierError = computed(() => {
    const c = this.f.identifier;
    if (!c.invalid || !c.touched) return null;
    if (c.errors?.['required']) return 'Identificador é obrigatório.';
    return null;
  });

  senhaError = computed(() => {
    const c = this.f.senha;
    if (!c.invalid || !c.touched) return null;
    if (c.errors?.['required'])   return 'Senha é obrigatória.';
    if (c.errors?.['minlength'])  return `Senha deve ter pelo menos ${c.errors['minlength'].requiredLength} caracteres.`;
    return null;
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error.set('Preencha identificador e senha corretamente.');
      return;
    }
    this.loading.set(true);
    this.error.set('');
    const { identifier, senha } = this.form.value;
    this.auth.login({ identifier: identifier!, senha: senha! }).subscribe({
      next: () => {
        this.auth.fetchAndSaveUserProfile().subscribe({
          next: (user) => {
            this.push.subscribe();
            if (user.classe === 'owner') {
              this.router.navigate(['/owner']);
            } else {
              this.router.navigate(['/']);
            }
          },
          error: () => this.router.navigate(['/']),
        });
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.error ?? 'Identificador ou senha incorretos.');
      },
    });
  }
}
