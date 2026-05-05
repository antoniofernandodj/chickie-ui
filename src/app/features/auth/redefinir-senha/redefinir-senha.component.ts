import { Component, computed, inject, signal, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import {
  UiPasswordInputComponent,
  UiButtonComponent,
  UiErrorBannerComponent,
  UiSpinnerComponent,
} from '../../../shared/components';

function senhasIguaisValidator(control: AbstractControl): ValidationErrors | null {
  const senha = control.get('nova_senha');
  const confirmacao = control.get('confirmar_senha');
  if (!senha || !confirmacao) return null;
  if (senha.value !== confirmacao.value) {
    confirmacao.setErrors({ ...confirmacao.errors, senhasDivergentes: true });
    return { senhasDivergentes: true };
  }
  const erros = { ...confirmacao.errors };
  delete erros['senhasDivergentes'];
  confirmacao.setErrors(Object.keys(erros).length ? erros : null);
  return null;
}

type Estado = 'form' | 'loading' | 'success' | 'error';

@Component({
  selector: 'app-redefinir-senha',
  imports: [RouterLink, ReactiveFormsModule, UiPasswordInputComponent, UiButtonComponent, UiErrorBannerComponent, UiSpinnerComponent],
  templateUrl: './redefinir-senha.component.html',
})
export class RedefinirSenhaComponent implements OnInit {
  private auth       = inject(AuthService);
  private router     = inject(Router);
  private route      = inject(ActivatedRoute);
  private fb         = inject(FormBuilder);
  private platformId = inject(PLATFORM_ID);

  private token = '';

  form = this.fb.group({
    nova_senha:      ['', [Validators.required, Validators.minLength(8)]],
    confirmar_senha: ['', [Validators.required]],
  }, { validators: senhasIguaisValidator });

  estado  = signal<Estado>('loading');
  error   = signal('');
  loading = signal(false);

  get f() { return this.form.controls; }

  novaSenhaError = computed(() => {
    const c = this.f.nova_senha;
    if (!c.invalid || !c.touched) return null;
    if (c.errors?.['required'])   return 'Nova senha é obrigatória.';
    if (c.errors?.['minlength'])  return 'A senha deve ter no mínimo 8 caracteres.';
    return null;
  });

  confirmarSenhaError = computed(() => {
    const c = this.f.confirmar_senha;
    if (!c.invalid || !c.touched) return null;
    if (c.errors?.['required'])         return 'Confirmação de senha é obrigatória.';
    if (c.errors?.['senhasDivergentes']) return 'As senhas não coincidem.';
    return null;
  });

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const token = this.route.snapshot.queryParamMap.get('token');
    if (!token) {
      this.estado.set('error');
      this.error.set('Link de redefinição inválido. Solicite um novo link.');
      return;
    }
    this.token = token;
    this.estado.set('form');
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.error.set('');

    this.auth.redefinirSenha(this.token, this.f.nova_senha.value!).subscribe({
      next: () => {
        this.loading.set(false);
        this.estado.set('success');
        setTimeout(() => this.router.navigate(['/auth/login']), 2500);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.error ?? 'Token inválido ou expirado. Solicite um novo link.');
        this.estado.set('error');
      },
    });
  }
}
