import { Component, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { BehaviorSubject, catchError, of, switchMap } from 'rxjs';
import { AdminService } from '../../core/services/admin.service';
import { ProdutoService } from '../../core/services/produto.service';
import { CatalogoService } from '../../core/services/catalogo.service';
import { MarketingService } from '../../core/services/marketing.service';
import { Loja, CreateLojaRequest } from '../../core/models';

@Component({
  selector: 'app-admin',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  private adminService = inject(AdminService);

  readonly aba  = signal('lojas');
  readonly tabs = [
    { id: 'lojas',  label: '🏪 Lojas'  },
    { id: 'equipe', label: '👥 Equipe' },
  ];

  // ── Lojas ──────────────────────────────────────────────────────────────────

  lojaForm: CreateLojaRequest & { nota_media?: number } = {
    nome: '', slug: '', email_contato: '', descricao: null,
    taxa_entrega_base: 5, pedido_minimo: 20, tempo_medio: 30,
    nota_media: 0, max_partes: 4,
  };

  lojaLoading = signal(false);
  lojaError   = signal('');
  lojaSuccess = signal('');

  lojaSelecionada = signal<Loja | null>(null);

  private readonly refreshTrigger = new BehaviorSubject<void>(undefined);

  private readonly _lojas = toSignal(
    this.refreshTrigger.pipe(
      switchMap(() => this.adminService.listarLojas()),
      catchError(() => of([])),
    ),
  );
  readonly lojasLoading = computed(() => this._lojas() === undefined);
  readonly lojas        = computed(() => this._lojas() ?? []);

  private refreshLojas() {
    this.refreshTrigger.next();
  }

  criarLoja() {
    const { nome, slug, email_contato } = this.lojaForm;
    if (!nome || !slug || !email_contato) {
      this.lojaError.set('Preencha nome, slug e e-mail.');
      return;
    }
    this.lojaLoading.set(true);
    this.lojaError.set('');
    this.lojaSuccess.set('');
    this.adminService.criarLoja({ ...this.lojaForm, nota_media: 0 }).subscribe({
      next: (l) => {
        this.lojaLoading.set(false);
        this.lojaSuccess.set(`Loja "${l.nome}" criada com sucesso!`);
        this.lojaForm = { nome: '', slug: '', email_contato: '', descricao: null,
                          taxa_entrega_base: 5, pedido_minimo: 20, tempo_medio: 30,
                          nota_media: 0, max_partes: 4 };
        this.refreshLojas();
      },
      error: (e) => {
        this.lojaLoading.set(false);
        this.lojaError.set(e?.error?.error ?? 'Erro ao criar loja.');
      },
    });
  }

  selecionarLoja(l: Loja) {
    this.lojaSelecionada.set(l);
    this.aba.set('equipe');
  }

  // ── Funcionários ──────────────────────────────────────────────────────────

  funcFields = [
    { name: 'nome',          label: 'Nome',       type: 'text',     required: true  },
    { name: 'username',      label: 'Username',   type: 'text',     required: true  },
    { name: 'email',         label: 'E-mail',     type: 'email',    required: true  },
    { name: 'senha',         label: 'Senha',      type: 'password', required: true  },
    { name: 'celular',       label: 'Celular',    type: 'tel',      required: true  },
    { name: 'cargo',         label: 'Cargo',      type: 'text',     required: false },
    { name: 'salario',       label: 'Salário',    type: 'number',   required: true  },
    { name: 'data_admissao', label: 'Admissão',   type: 'date',     required: true  },
  ] as const;

  funcForm: Record<string, string | number> = {
    nome: '', username: '', email: '', senha: '', celular: '', cargo: '', salario: 0, data_admissao: '',
  };

  equipeLoading = signal(false);
  equipeError   = signal('');

  adicionarFuncionario() {
    const loja = this.lojaSelecionada();
    if (!loja) return;
    this.equipeLoading.set(true);
    this.equipeError.set('');
    this.adminService.adicionarFuncionario(loja.uuid, {
      nome:          String(this.funcForm['nome']),
      username:      String(this.funcForm['username']),
      email:         String(this.funcForm['email']),
      senha:         String(this.funcForm['senha']),
      celular:       String(this.funcForm['celular']),
      cargo:         String(this.funcForm['cargo']) || null,
      salario:       Number(this.funcForm['salario']),
      data_admissao: String(this.funcForm['data_admissao']),
    }).subscribe({
      next: () => {
        this.equipeLoading.set(false);
        alert('Funcionário adicionado com sucesso!');
        this.funcForm = { nome: '', username: '', email: '', senha: '', celular: '', cargo: '', salario: 0, data_admissao: '' };
      },
      error: (e) => {
        this.equipeLoading.set(false);
        this.equipeError.set(e?.error?.error ?? 'Erro ao adicionar funcionário.');
      },
    });
  }

  // ── Entregadores ──────────────────────────────────────────────────────────

  entregFields = [
    { name: 'nome',     label: 'Nome',    type: 'text',     required: true  },
    { name: 'username', label: 'Username',type: 'text',     required: true  },
    { name: 'email',    label: 'E-mail',  type: 'email',    required: true  },
    { name: 'senha',    label: 'Senha',   type: 'password', required: true  },
    { name: 'celular',  label: 'Celular', type: 'tel',      required: true  },
    { name: 'veiculo',  label: 'Veículo', type: 'text',     required: false },
    { name: 'placa',    label: 'Placa',   type: 'text',     required: false },
  ] as const;

  entregForm: Record<string, string> = {
    nome: '', username: '', email: '', senha: '', celular: '', veiculo: '', placa: '',
  };

  entregLoading = signal(false);
  entregError   = signal('');

  adicionarEntregador() {
    const loja = this.lojaSelecionada();
    if (!loja) return;
    this.entregLoading.set(true);
    this.entregError.set('');
    this.adminService.adicionarEntregador(loja.uuid, {
      nome:     this.entregForm['nome'],
      username: this.entregForm['username'],
      email:    this.entregForm['email'],
      senha:    this.entregForm['senha'],
      celular:  this.entregForm['celular'],
      veiculo:  this.entregForm['veiculo'] || null,
      placa:    this.entregForm['placa']   || null,
    }).subscribe({
      next: () => {
        this.entregLoading.set(false);
        alert('Entregador adicionado com sucesso!');
        this.entregForm = { nome: '', username: '', email: '', senha: '', celular: '', veiculo: '', placa: '' };
      },
      error: (e) => {
        this.entregLoading.set(false);
        this.entregError.set(e?.error?.error ?? 'Erro ao adicionar entregador.');
      },
    });
  }
}
