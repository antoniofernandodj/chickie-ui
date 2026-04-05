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
  template: `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Painel Admin</h1>
        <p class="text-gray-500 text-sm mt-1">Gerencie lojas, equipe e catálogo</p>
      </div>

      <!-- Tabs -->
      <div class="flex gap-1 bg-gray-100 rounded-xl p-1 mb-8 overflow-x-auto">
        @for (tab of tabs; track tab.id) {
          <button
            (click)="aba.set(tab.id)"
            class="shrink-0 py-2 px-4 rounded-lg text-sm font-medium transition-all"
            [class.bg-white]="aba() === tab.id"
            [class.shadow-sm]="aba() === tab.id"
            [class.text-gray-900]="aba() === tab.id"
            [class.text-gray-500]="aba() !== tab.id"
          >{{ tab.label }}</button>
        }
      </div>

      <!-- ── ABA: LOJAS ──────────────────────────────────────────────────── -->
      @if (aba() === 'lojas') {
        <div class="grid lg:grid-cols-2 gap-8">
          <!-- Criar loja -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 class="text-base font-semibold text-gray-900 mb-5">Criar nova loja</h2>
            <form (ngSubmit)="criarLoja()" class="space-y-4">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1.5">Nome *</label>
                  <input type="text" [(ngModel)]="lojaForm.nome" name="lnome" required
                         class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400"/>
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1.5">Slug *</label>
                  <input type="text" [(ngModel)]="lojaForm.slug" name="lslug" required
                         placeholder="minha-loja"
                         class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400"/>
                </div>
                <div class="col-span-2">
                  <label class="block text-xs font-medium text-gray-700 mb-1.5">E-mail de contato *</label>
                  <input type="email" [(ngModel)]="lojaForm.email_contato" name="lemail" required
                         class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400"/>
                </div>
                <div class="col-span-2">
                  <label class="block text-xs font-medium text-gray-700 mb-1.5">Descrição</label>
                  <textarea [(ngModel)]="lojaForm.descricao" name="ldesc" rows="2"
                            class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400 resize-none"></textarea>
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1.5">Taxa entrega (R$)</label>
                  <input type="number" [(ngModel)]="lojaForm.taxa_entrega_base" name="ltaxa" min="0" step="0.5"
                         class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400"/>
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1.5">Pedido mínimo (R$)</label>
                  <input type="number" [(ngModel)]="lojaForm.pedido_minimo" name="lmin" min="0" step="1"
                         class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400"/>
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1.5">Tempo médio (min)</label>
                  <input type="number" [(ngModel)]="lojaForm.tempo_medio" name="ltempo" min="1"
                         class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400"/>
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1.5">Máx. partes</label>
                  <input type="number" [(ngModel)]="lojaForm.max_partes" name="lpartes" min="1" max="8"
                         class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400"/>
                </div>
              </div>

              @if (lojaError()) {
                <p class="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{{ lojaError() }}</p>
              }
              @if (lojaSuccess()) {
                <p class="text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg">✅ {{ lojaSuccess() }}</p>
              }

              <button type="submit" [disabled]="lojaLoading()"
                      class="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-60"
                      style="background:var(--color-brand)">
                @if (lojaLoading()) { Criando... } @else { Criar loja }
              </button>
            </form>
          </div>

          <!-- Lista de lojas -->
          <div>
            <h2 class="text-base font-semibold text-gray-900 mb-4">Lojas cadastradas</h2>
            @if (lojasLoading()) {
              <div class="space-y-3">
                @for (_ of [1,2,3]; track $index) {
                  <div class="bg-white rounded-2xl h-20 skeleton"></div>
                }
              </div>
            } @else if (lojas().length === 0) {
              <div class="text-center py-10 text-gray-400 text-sm">Nenhuma loja cadastrada.</div>
            } @else {
              <div class="space-y-3">
                @for (loja of lojas(); track loja.uuid) {
                  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-4
                              flex items-center gap-4 cursor-pointer hover:border-orange-200 transition-colors"
                       (click)="selecionarLoja(loja)">
                    <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shrink-0"
                         style="background:var(--color-brand)">
                      {{ loja.nome.charAt(0) }}
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="font-semibold text-gray-900 text-sm truncate">{{ loja.nome }}</p>
                      <p class="text-xs text-gray-500">{{ loja.slug }} · R$ {{ loja.taxa_entrega | number:'1.2-2' }} entrega</p>
                    </div>
                    <span class="shrink-0 text-xs px-2 py-1 rounded-full font-medium"
                          [class.bg-green-100]="loja.ativa"
                          [class.text-green-700]="loja.ativa"
                          [class.bg-gray-100]="!loja.ativa"
                          [class.text-gray-500]="!loja.ativa">
                      {{ loja.ativa ? 'Ativa' : 'Inativa' }}
                    </span>
                  </div>
                }
              </div>
            }
          </div>
        </div>
      }

      <!-- ── ABA: EQUIPE ─────────────────────────────────────────────────── -->
      @if (aba() === 'equipe') {
        @if (!lojaSelecionada()) {
          <div class="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <div class="text-5xl mb-3">🏪</div>
            <h2 class="text-lg font-semibold text-gray-800 mb-2">Selecione uma loja</h2>
            <p class="text-gray-500 text-sm">Vá para a aba <strong>Lojas</strong> e clique em uma loja para gerenciar sua equipe.</p>
          </div>
        } @else {
          <div class="mb-6 flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shrink-0"
                 style="background:var(--color-brand)">
              {{ lojaSelecionada()!.nome.charAt(0) }}
            </div>
            <div>
              <p class="font-bold text-gray-900">{{ lojaSelecionada()!.nome }}</p>
              <p class="text-xs text-gray-500">{{ lojaSelecionada()!.slug }}</p>
            </div>
            <button (click)="lojaSelecionada.set(null)" class="ml-auto text-xs text-gray-400 hover:text-gray-700">Trocar loja</button>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <!-- Funcionário -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 class="text-sm font-semibold text-gray-700 mb-4">➕ Adicionar Funcionário</h3>
              <form (ngSubmit)="adicionarFuncionario()" class="space-y-3">
                @for (field of funcFields; track field.name) {
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">{{ field.label }}</label>
                    <input [type]="field.type" [(ngModel)]="funcForm[field.name]" [name]="'f_'+field.name"
                           [required]="field.required"
                           class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400"/>
                  </div>
                }
                @if (equipeError()) {
                  <p class="text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg">{{ equipeError() }}</p>
                }
                <button type="submit" [disabled]="equipeLoading()"
                        class="w-full py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
                        style="background:var(--color-brand)">
                  @if (equipeLoading()) { Salvando... } @else { Adicionar }
                </button>
              </form>
            </div>

            <!-- Entregador -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 class="text-sm font-semibold text-gray-700 mb-4">🛵 Adicionar Entregador</h3>
              <form (ngSubmit)="adicionarEntregador()" class="space-y-3">
                @for (field of entregFields; track field.name) {
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">{{ field.label }}</label>
                    <input [type]="field.type" [(ngModel)]="entregForm[field.name]" [name]="'e_'+field.name"
                           [required]="field.required"
                           class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400"/>
                  </div>
                }
                @if (entregError()) {
                  <p class="text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg">{{ entregError() }}</p>
                }
                <button type="submit" [disabled]="entregLoading()"
                        class="w-full py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
                        style="background:var(--color-brand)">
                  @if (entregLoading()) { Salvando... } @else { Adicionar }
                </button>
              </form>
            </div>
          </div>
        }
      }
    </div>
  `,
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
