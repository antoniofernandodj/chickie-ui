import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ClasseUsuario } from '../../../core/models';
import { debounceTime, distinctUntilChanged, filter, switchMap, catchError, of, map } from 'rxjs';
import { PhoneMaskDirective } from '../../../shared/directives/phone-mask.directive';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, ReactiveFormsModule, PhoneMaskDirective],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  emailAvailable = signal<boolean | null>(null);
  usernameAvailable = signal<boolean | null>(null);
  celularAvailable = signal<boolean | null>(null);
  emailChecking = signal(false);
  usernameChecking = signal(false);
  celularChecking = signal(false);

  form = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9_]+$/)]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
    celular: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
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

  constructor() {
    // Monitor email changes with debounce
    const emailControl = this.form.get('email');
    if (emailControl) {
      emailControl.valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        filter((email): email is string => {
          const emailValid = this.form.get('email')?.valid ?? false;
          return email != null && email.length > 0 && emailValid;
        }),
        switchMap(email => {
          this.emailChecking.set(true);
          this.emailAvailable.set(null);
          return this.auth.verificarEmail(email).pipe(
            catchError(() => {
              this.emailChecking.set(false);
              this.emailAvailable.set(null);
              return of({ disponivel: false });
            })
          );
        })
      ).subscribe(result => {
        this.emailChecking.set(false);
        this.emailAvailable.set(result.disponivel);
      });
    }

    // Monitor username changes with debounce
    const usernameControl = this.form.get('username');
    if (usernameControl) {
      usernameControl.valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        filter((username): username is string => username != null && username.length >= 3),
        switchMap(username => {
          this.usernameChecking.set(true);
          this.usernameAvailable.set(null);
          return this.auth.verificarUsername(username).pipe(
            catchError(() => {
              this.usernameChecking.set(false);
              this.usernameAvailable.set(null);
              return of({ disponivel: false });
            })
          );
        })
      ).subscribe(result => {
        this.usernameChecking.set(false);
        this.usernameAvailable.set(result.disponivel);
      });
    }

    // Monitor celular changes with debounce
    const celularControl = this.form.get('celular');
    if (celularControl) {
      celularControl.valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        filter((celular): celular is string => celular != null && celular.length === 11),
        switchMap(celular => {
          this.celularChecking.set(true);
          this.celularAvailable.set(null);
          return this.auth.verificarCelular(celular).pipe(
            catchError(() => {
              this.celularChecking.set(false);
              this.celularAvailable.set(null);
              return of({ disponivel: false });
            })
          );
        })
      ).subscribe(result => {
        this.celularChecking.set(false);
        this.celularAvailable.set(result.disponivel);
      });
    }
  }

  get f() {
    return this.form.controls;
  }

  get formReady(): boolean {
    const emailOk = this.emailAvailable() === true;
    const usernameOk = this.usernameAvailable() === true;
    const celularOk = this.celularAvailable() === true;
    return emailOk && usernameOk && celularOk && this.form.valid;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error.set('Preencha todos os campos obrigatórios corretamente.');
      return;
    }
    if (!this.formReady) {
      this.error.set('Aguarde a verificação dos campos ou corrija os erros.');
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
      celular: formValue.celular!,
      auth_method: formValue.auth_method!,
      classe: formValue.classe!,
    }).subscribe({
      next: (user) => {
        this.auth.saveUserMeta(user.nome);
        const { email, senha } = formValue;
        this.auth.login({ identifier: email!, senha: senha! }).subscribe({
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
