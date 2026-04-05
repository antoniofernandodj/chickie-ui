import { Component, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, catchError, of, switchMap } from 'rxjs';
import { NgxSonnerToaster, toast } from 'ngx-sonner';
import { EnderecoUsuarioService } from '../../core/services/endereco-usuario.service';
import { AuthService } from '../../core/services/auth.service';
import { EnderecoUsuario, EnderecoUsuarioRequest } from '../../core/models';

@Component({
  selector: 'app-perfil',
  imports: [ReactiveFormsModule, NgxSonnerToaster],
  templateUrl: './perfil.component.html',
})
export class PerfilComponent {
  private endService = inject(EnderecoUsuarioService);
  private auth = inject(AuthService);
  private fb = inject(FormBuilder);

  readonly tabs = [
    { id: 'conta', label: '👤 Conta' },
    { id: 'enderecos', label: '📍 Endereços' },
  ];

  readonly abaAtiva = signal('conta');
  readonly showForm = signal(false);
  readonly editando = signal<string | null>(null);
  readonly formLoading = signal(false);
  readonly formError = signal('');

  readonly nomeExibido = () => {
    try { return localStorage.getItem('chickie_nome') ?? 'Usuário'; } catch { return 'Usuário'; }
  };
  readonly initial = () => this.nomeExibido().charAt(0).toUpperCase();

  private readonly refreshTrigger = new BehaviorSubject<void>(undefined);

  readonly _enderecos = toSignal(
    this.refreshTrigger.pipe(
      switchMap(() => this.endService.listar()),
      catchError(() => of([])),
    ),
    { initialValue: [] as EnderecoUsuario[] },
  );
  readonly endLoading = computed(() => this._enderecos() === undefined);
  readonly enderecos = computed(() => this._enderecos() ?? []);

  formEnd = this.fb.group({
    cep: [''],
    logradouro: ['', Validators.required],
    numero: ['', Validators.required],
    complemento: [''],
    bairro: ['', Validators.required],
    cidade: ['', Validators.required],
    estado: ['', [Validators.required, Validators.maxLength(2), Validators.pattern(/^[A-Z]{2}$/)]],
    _uuid: ['' as string | null],
  });

  get fe() {
    return this.formEnd.controls;
  }

  emptyForm() {
    this.formEnd.reset({
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      _uuid: null,
    });
  }

  abrirFormNovo() {
    this.emptyForm();
    this.editando.set(null);
    this.showForm.set(true);
    this.formError.set('');
  }

  editarEndereco(e: EnderecoUsuario) {
    this.formEnd.patchValue({
      cep: e.cep ?? '',
      logradouro: e.logradouro,
      numero: e.numero,
      complemento: e.complemento ?? '',
      bairro: e.bairro,
      cidade: e.cidade,
      estado: e.estado,
      _uuid: e.uuid,
    });
    this.editando.set(e.uuid);
    this.showForm.set(true);
    this.formError.set('');
  }

  cancelarForm() {
    this.showForm.set(false);
    this.editando.set(null);
  }

  salvarEndereco() {
    if (this.formEnd.invalid) {
      this.formEnd.markAllAsTouched();
      this.formError.set('Preencha os campos obrigatórios corretamente.');
      return;
    }
    this.formLoading.set(true);
    this.formError.set('');
    const { logradouro, numero, bairro, cidade, estado, cep, complemento } = this.formEnd.value;
    const payload: EnderecoUsuarioRequest = {
      cep: cep || null,
      logradouro: logradouro!,
      numero: numero!,
      complemento: complemento || null,
      bairro: bairro!,
      cidade: cidade!,
      estado: estado!,
    };
    const uuid = this.editando();
    const op = uuid
      ? this.endService.atualizar(uuid, payload)
      : this.endService.criar(payload);

    op.subscribe({
      next: () => {
        this.formLoading.set(false);
        this.cancelarForm();
        this.refreshTrigger.next();
        toast.success(
          uuid ? 'Endereço atualizado com sucesso!' : 'Endereço adicionado com sucesso!'
        );
      },
      error: (e) => {
        this.formLoading.set(false);
        this.formError.set(e?.error?.error ?? 'Erro ao salvar endereço.');
      },
    });
  }

  deletarEndereco(uuid: string) {
    if (!confirm('Remover este endereço?')) return;
    this.endService.deletar(uuid).subscribe({
      next: () => {
        this.refreshTrigger.next();
        toast.success('Endereço removido com sucesso!');
      },
    });
  }

  logout() {
    this.auth.logout();
    location.href = '/';
  }
}
