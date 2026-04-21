import {
  Component,
  inject,
  signal,
  computed,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { toast } from 'ngx-sonner';
import {
  Loja,
  Produto,
  CategoriaProdutos,
  EnderecoUsuario,
  Cupom,
  CreatePedidoRequest,
} from '../../core/models';
import { AuthService } from '../../core/services/auth.service';
import { PedidoService } from '../../core/services/pedido.service';
import { EnderecoUsuarioService } from '../../core/services/endereco-usuario.service';
import { ConfigPedidoService } from '../../core/services/config-pedido.service';
import { MarketingService } from '../../core/services/marketing.service';

// ─── Local types ──────────────────────────────────────────────────────────────

interface CartParte {
  produto: Produto;
  posicao: number;
}

interface CartItem {
  id: number;
  categoria_uuid: string;
  partes: CartParte[];
  quantidade: number;
}

interface EnderecoForm {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

interface CategoriaStep {
  tipo: 'categoria';
  categoria: CategoriaProdutos;
  produtos: Produto[];
}

interface FixedStep {
  tipo: 'endereco' | 'pagamento' | 'resumo';
}

type Step = CategoriaStep | FixedStep;

// ─── Component ────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-criar-pedido-modal',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './criar-pedido-modal.component.html',
})
export class CriarPedidoModalComponent implements OnInit {
  @Input({ required: true }) loja!: Loja;
  @Input({ required: true }) produtos!: Produto[];
  @Input({ required: true }) categorias!: CategoriaProdutos[];
  @Output() fechar = new EventEmitter<void>();
  @Output() pedidoCriado = new EventEmitter<string>();

  private auth = inject(AuthService);
  private pedidoService = inject(PedidoService);
  private enderecoService = inject(EnderecoUsuarioService);
  private configService = inject(ConfigPedidoService);
  private marketingService = inject(MarketingService);
  private router = inject(Router);

  // ── Steps ──────────────────────────────────────────────────────────────────
  steps: Step[] = [];

  readonly currentStepIndex = signal(0);

  get currentStep(): Step {
    return this.steps[this.currentStepIndex()];
  }

  get currentCategoriaStep(): CategoriaStep | null {
    const s = this.currentStep;
    return s?.tipo === 'categoria' ? (s as CategoriaStep) : null;
  }

  get isLastStep(): boolean {
    return this.currentStepIndex() === this.steps.length - 1;
  }

  get stepTitle(): string {
    const s = this.currentStep;
    if (!s) return '';
    if (s.tipo === 'categoria') return (s as CategoriaStep).categoria.nome;
    if (s.tipo === 'endereco') return 'Endereço de Entrega';
    if (s.tipo === 'pagamento') return 'Pagamento';
    return 'Resumo do Pedido';
  }

  get stepSubtitle(): string {
    const s = this.currentStep;
    if (!s) return '';
    if (s.tipo === 'categoria') {
      const cs = s as CategoriaStep;
      return cs.categoria.pizza_mode
        ? `Até ${this.maxPartes()} sabores por pizza`
        : `${cs.produtos.length} ${cs.produtos.length === 1 ? 'item disponível' : 'itens disponíveis'}`;
    }
    if (s.tipo === 'endereco') return 'Onde você quer receber?';
    if (s.tipo === 'pagamento') return 'Como você vai pagar?';
    return 'Confira antes de confirmar';
  }

  get stepNumber(): string {
    return `Passo ${this.currentStepIndex() + 1} de ${this.steps.length}`;
  }

  // ── Config ──────────────────────────────────────────────────────────────────
  readonly maxPartes = signal(2);

  // ── Cart ────────────────────────────────────────────────────────────────────
  readonly cart = signal<CartItem[]>([]);
  private nextId = 0;

  readonly cartItemCount = computed(() =>
    this.cart().reduce((s, i) => s + i.quantidade, 0),
  );

  get cartItemsForCurrentCategory(): CartItem[] {
    const s = this.currentCategoriaStep;
    if (!s) return [];
    return this.cart().filter((i) => i.categoria_uuid === s.categoria.uuid);
  }

  // ── Pizza builder ───────────────────────────────────────────────────────────
  readonly pizzaPartes = signal<CartParte[]>([]);

  // ── Endereço ────────────────────────────────────────────────────────────────
  readonly enderecosUsuario = signal<EnderecoUsuario[]>([]);
  enderecoSelecionadoUuid: string | null = null;

  enderecoForm: EnderecoForm = {
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
  };

  get enderecoValido(): boolean {
    const f = this.enderecoForm;
    return (
      f.logradouro.trim() !== '' &&
      f.numero.trim() !== '' &&
      f.bairro.trim() !== '' &&
      f.cidade.trim() !== '' &&
      f.estado.trim() !== ''
    );
  }

  // ── Pagamento ───────────────────────────────────────────────────────────────
  formaPagamento = 'PIX';
  observacoes = '';
  codigoCupom = '';

  readonly cupomValidado = signal<Cupom | null>(null);
  readonly validandoCupom = signal(false);
  readonly cupomErro = signal<string | null>(null);

  // ── Submit ──────────────────────────────────────────────────────────────────
  readonly submitting = signal(false);

  // ── Computed totals ─────────────────────────────────────────────────────────
  get subtotal(): number {
    return this.cart().reduce((total, item) => {
      const precoItem = Math.max(...item.partes.map((p) => p.produto.preco));
      return total + precoItem * item.quantidade;
    }, 0);
  }

  get desconto(): number {
    const cupom = this.cupomValidado();
    if (!cupom) return 0;
    const sub = this.subtotal;
    if (cupom.tipo_desconto === 'percentual') return (sub * cupom.valor_desconto) / 100;
    if (cupom.tipo_desconto === 'valor_fixo') return Math.min(cupom.valor_desconto, sub);
    if (cupom.tipo_desconto === 'frete_gratis') return this.loja.taxa_entrega;
    return 0;
  }

  get total(): number {
    return this.subtotal + this.loja.taxa_entrega - this.desconto;
  }

  // ── Validation ──────────────────────────────────────────────────────────────
  get canAdvance(): boolean {
    const s = this.currentStep;
    if (!s) return false;
    if (s.tipo === 'categoria') return true;
    if (s.tipo === 'endereco') return this.enderecoValido;
    if (s.tipo === 'pagamento') return this.formaPagamento !== '';
    return this.cart().length > 0;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  ngOnInit(): void {
    this.buildSteps();

    this.configService
      .getConfigPedido(this.loja.uuid)
      .pipe(catchError(() => of(null)))
      .subscribe((cfg) => {
        if (cfg) this.maxPartes.set(cfg.max_partes);
      });

    if (this.auth.isAuthenticated()) {
      this.enderecoService
        .listar()
        .pipe(catchError(() => of([])))
        .subscribe((list) => this.enderecosUsuario.set(list));
    }
  }

  private buildSteps(): void {
    const disponiveis = this.produtos.filter((p) => p.disponivel);
    const catSteps: CategoriaStep[] = [...this.categorias]
      .sort((a, b) => a.ordem - b.ordem)
      .map((cat) => ({
        tipo: 'categoria' as const,
        categoria: cat,
        produtos: disponiveis.filter((p) => p.categoria_uuid === cat.uuid),
      }))
      .filter((s) => s.produtos.length > 0);

    this.steps = [
      ...catSteps,
      { tipo: 'endereco' },
      { tipo: 'pagamento' },
      { tipo: 'resumo' },
    ];
  }

  // ── Navigation ───────────────────────────────────────────────────────────────
  avancar(): void {
    if (!this.canAdvance) return;
    this.pizzaPartes.set([]);
    if (this.currentStepIndex() < this.steps.length - 1) {
      this.currentStepIndex.update((i) => i + 1);
    }
  }

  voltar(): void {
    this.pizzaPartes.set([]);
    if (this.currentStepIndex() > 0) {
      this.currentStepIndex.update((i) => i - 1);
    }
  }

  irParaStep(index: number): void {
    if (index < this.currentStepIndex()) {
      this.pizzaPartes.set([]);
      this.currentStepIndex.set(index);
    }
  }

  // ── Non-pizza cart ────────────────────────────────────────────────────────────
  getQuantidadeProduto(produtoUuid: string): number {
    return this.cart()
      .filter((i) => i.partes.length === 1 && i.partes[0].produto.uuid === produtoUuid)
      .reduce((s, i) => s + i.quantidade, 0);
  }

  incrementarProduto(produto: Produto): void {
    const existing = this.cart().find(
      (i) => i.partes.length === 1 && i.partes[0].produto.uuid === produto.uuid,
    );
    if (existing) {
      this.cart.update((c) =>
        c.map((i) => (i.id === existing.id ? { ...i, quantidade: i.quantidade + 1 } : i)),
      );
    } else {
      this.cart.update((c) => [
        ...c,
        {
          id: this.nextId++,
          categoria_uuid: produto.categoria_uuid,
          partes: [{ produto, posicao: 1 }],
          quantidade: 1,
        },
      ]);
    }
  }

  decrementarProduto(produto: Produto): void {
    const existing = this.cart().find(
      (i) => i.partes.length === 1 && i.partes[0].produto.uuid === produto.uuid,
    );
    if (!existing) return;
    if (existing.quantidade <= 1) {
      this.cart.update((c) => c.filter((i) => i.id !== existing.id));
    } else {
      this.cart.update((c) =>
        c.map((i) => (i.id === existing.id ? { ...i, quantidade: i.quantidade - 1 } : i)),
      );
    }
  }

  // ── Pizza builder ─────────────────────────────────────────────────────────────
  togglePizzaParte(produto: Produto): void {
    const partes = this.pizzaPartes();
    const idx = partes.findIndex((p) => p.produto.uuid === produto.uuid);
    if (idx >= 0) {
      const filtered = partes
        .filter((_, i) => i !== idx)
        .map((p, i) => ({ ...p, posicao: i + 1 }));
      this.pizzaPartes.set(filtered);
    } else if (partes.length < this.maxPartes()) {
      this.pizzaPartes.set([...partes, { produto, posicao: partes.length + 1 }]);
    }
  }

  isPizzaParteSelected(produtoUuid: string): boolean {
    return this.pizzaPartes().some((p) => p.produto.uuid === produtoUuid);
  }

  getPizzaPartePosicao(produtoUuid: string): number {
    return this.pizzaPartes().find((p) => p.produto.uuid === produtoUuid)?.posicao ?? 0;
  }

  adicionarPizza(): void {
    const partes = this.pizzaPartes();
    if (partes.length === 0) return;
    this.cart.update((c) => [
      ...c,
      {
        id: this.nextId++,
        categoria_uuid: partes[0].produto.categoria_uuid,
        partes: [...partes],
        quantidade: 1,
      },
    ]);
    this.pizzaPartes.set([]);
  }

  removerCartItem(id: number): void {
    this.cart.update((c) => c.filter((i) => i.id !== id));
  }

  // ── Address ───────────────────────────────────────────────────────────────────
  selecionarEndereco(end: EnderecoUsuario): void {
    this.enderecoSelecionadoUuid = end.uuid;
    this.enderecoForm = {
      logradouro: end.logradouro,
      numero: end.numero,
      complemento: end.complemento ?? '',
      bairro: end.bairro,
      cidade: end.cidade,
      estado: end.estado,
      cep: end.cep ?? '',
    };
  }

  onEnderecoInputChange(): void {
    this.enderecoSelecionadoUuid = null;
  }

  // ── Cupom ──────────────────────────────────────────────────────────────────────
  validarCupom(): void {
    const codigo = this.codigoCupom.trim();
    if (!codigo) return;
    this.validandoCupom.set(true);
    this.cupomErro.set(null);
    this.marketingService
      .validarCupom(codigo)
      .pipe(
        catchError(() => {
          this.cupomErro.set('Cupom inválido ou expirado.');
          this.validandoCupom.set(false);
          this.cupomValidado.set(null);
          return of(null);
        }),
      )
      .subscribe((cupom) => {
        if (cupom) {
          this.cupomValidado.set(cupom);
          this.validandoCupom.set(false);
        }
      });
  }

  removerCupom(): void {
    this.cupomValidado.set(null);
    this.codigoCupom = '';
    this.cupomErro.set(null);
  }

  // ── Helpers ───────────────────────────────────────────────────────────────────
  itemLabel(item: CartItem): string {
    if (item.partes.length === 1) return item.partes[0].produto.nome;
    return item.partes.map((p) => `${p.posicao}/${item.partes.length} ${p.produto.nome}`).join(' + ');
  }

  itemPreco(item: CartItem): number {
    if (item.partes.length === 0) return 0;
    return Math.max(...item.partes.map((p) => p.produto.preco));
  }

  pizzaBuilderLabel(): string {
    const partes = this.pizzaPartes();
    if (partes.length === 0) return '';
    return partes.map((p) => p.produto.nome).join(' + ');
  }

  pizzaBuilderPreco(): number {
    const partes = this.pizzaPartes();
    if (partes.length === 0) return 0;
    return Math.max(...partes.map((p) => p.produto.preco));
  }

  isStepCompleted(index: number): boolean {
    return index < this.currentStepIndex();
  }

  readonly formasPagamento = [
    { valor: 'PIX', emoji: '📱' },
    { valor: 'Cartão', emoji: '💳' },
    { valor: 'Dinheiro', emoji: '💵' },
  ];

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.fechar.emit();
    }
  }

  // ── Submit ──────────────────────────────────────────────────────────────────
  confirmarPedido(): void {
    if (this.cart().length === 0) {
      toast.error('Adicione pelo menos um item ao pedido.');
      return;
    }
    if (!this.enderecoValido) {
      toast.error('Preencha o endereço de entrega.');
      return;
    }

    const f = this.enderecoForm;
    const body: CreatePedidoRequest = {
      loja_uuid: this.loja.uuid,
      taxa_entrega: this.loja.taxa_entrega,
      forma_pagamento: this.formaPagamento,
      observacoes: this.observacoes || null,
      codigo_cupom: this.cupomValidado()?.codigo ?? null,
      itens: this.cart().map((item) => ({
        quantidade: item.quantidade,
        partes: item.partes.map((p) => ({
          produto_uuid: p.produto.uuid,
          posicao: p.posicao,
        })),
      })),
      endereco_entrega: {
        logradouro: f.logradouro,
        numero: f.numero,
        complemento: f.complemento || null,
        bairro: f.bairro,
        cidade: f.cidade,
        estado: f.estado,
        cep: f.cep || null,
      },
    };

    this.submitting.set(true);
    this.pedidoService.criar(body).subscribe({
      next: (res) => {
        toast.success('Pedido criado com sucesso! 🎉');
        this.submitting.set(false);
        this.pedidoCriado.emit(res.uuid);
        this.router.navigate(['/pedidos', res.uuid]);
      },
      error: () => {
        toast.error('Erro ao criar pedido. Tente novamente.');
        this.submitting.set(false);
      },
    });
  }
}
