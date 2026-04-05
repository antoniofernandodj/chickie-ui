import { Component, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, catchError, of, switchMap } from 'rxjs';
import { NgxSonnerToaster, toast } from 'ngx-sonner';
import { EnderecoUsuarioService } from '../../core/services/endereco-usuario.service';
import { AuthService } from '../../core/services/auth.service';
import { EnderecoUsuario, EnderecoUsuarioRequest } from '../../core/models';

@Component({
  selector: 'app-perfil',
  imports: [FormsModule, NgxSonnerToaster],
  templateUrl: './perfil.component.html',
})
export class PerfilComponent {
  private endService = inject(EnderecoUsuarioService);
  private auth       = inject(AuthService);

  readonly tabs = [
    { id: 'conta',      label: '👤 Conta'      },
    { id: 'enderecos',  label: '📍 Endereços'  },
  ];

  readonly abaAtiva   = signal('conta');
  readonly showForm   = signal(false);
  readonly editando   = signal<string | null>(null);
  readonly formLoading= signal(false);
  readonly formError  = signal('');

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
  readonly enderecos  = computed(() => this._enderecos() ?? []);

  formEnd: EnderecoUsuarioRequest & { _uuid?: string } = this.emptyForm();

  emptyForm() {
    return { cep: '', logradouro: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '' };
  }

  abrirFormNovo() {
    this.formEnd = this.emptyForm();
    this.editando.set(null);
    this.showForm.set(true);
    this.formError.set('');
  }

  editarEndereco(e: EnderecoUsuario) {
    this.formEnd = {
      cep: e.cep ?? '',
      logradouro: e.logradouro,
      numero: e.numero,
      complemento: e.complemento ?? '',
      bairro: e.bairro,
      cidade: e.cidade,
      estado: e.estado,
      _uuid: e.uuid,
    };
    this.editando.set(e.uuid);
    this.showForm.set(true);
    this.formError.set('');
  }

  cancelarForm() {
    this.showForm.set(false);
    this.editando.set(null);
  }

  salvarEndereco() {
    const { logradouro, numero, bairro, cidade, estado } = this.formEnd;
    if (!logradouro || !numero || !bairro || !cidade || !estado) {
      this.formError.set('Preencha os campos obrigatórios.');
      return;
    }
    this.formLoading.set(true);
    this.formError.set('');
    const payload: EnderecoUsuarioRequest = {
      cep:         this.formEnd.cep   || null,
      logradouro,
      numero,
      complemento: this.formEnd.complemento || null,
      bairro,
      cidade,
      estado,
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
