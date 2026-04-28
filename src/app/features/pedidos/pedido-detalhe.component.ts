import { Component, inject, signal, computed, DestroyRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DecimalPipe, DatePipe } from '@angular/common';
import { switchMap, catchError, of, map, tap } from 'rxjs';
import { Subscription } from 'rxjs';
import { PedidoService } from '../../core/services/pedido.service';
import { PedidoLocalStorageService } from '../../core/services/pedido-local-storage.service';
import { PedidosLiveService } from '../../core/services/pedidos-live.service';
import { PagamentoService } from '../../core/services/pagamento.service';
import { AuthService } from '../../core/services/auth.service';
import { Pedido, StatusPedido, CreatePagamentoResponse } from '../../core/models';
import { validarCpf, formatCpf } from '../../core/utils/cpf-utils';

type Steps = {
  status: StatusPedido;
  label: string;
  icon: string
}

const STEPS: Steps[] = [
  { status: 'criado',                        label: 'Pedido criado',    icon: '🕐' },
  { status: 'aguardando_confirmacao_de_loja', label: 'Aguardando loja',  icon: '⏳' },
  { status: 'confirmado_pela_loja',          label: 'Confirmado',       icon: '✅' },
  { status: 'em_preparo',                    label: 'Em preparo',       icon: '👨‍🍳' },
  { status: 'pronto',                        label: 'Pronto',           icon: '📦' },
  { status: 'saiu_para_entrega',             label: 'Saiu p/ entrega',  icon: '🛵' },
  { status: 'entregue',                      label: 'Entregue',         icon: '🎉' },
];

const ORDER: StatusPedido[] = STEPS.map((s) => s.status);
const STATUS_TERMINAL: StatusPedido[] = ['entregue', 'cancelado'];

@Component({
  selector: 'app-pedido-detalhe',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './pedido-detalhe.component.html',
})
export class PedidoDetalheComponent {
  private route              = inject(ActivatedRoute);
  private pedidoService      = inject(PedidoService);
  private pedidoLocalStorage = inject(PedidoLocalStorageService);
  private pedidosLiveService = inject(PedidosLiveService);
  private pagamentoService   = inject(PagamentoService);
  private authService        = inject(AuthService);
  private destroyRef         = inject(DestroyRef);

  readonly steps = STEPS;

  // ── Pedido ────────────────────────────────────────────────────────────────

  private readonly _pedido = signal<Pedido | null | undefined>(undefined);
  readonly pedido = this._pedido.asReadonly();

  readonly loading     = computed(() => this._pedido() === undefined);
  readonly isCancelled = computed(() => this._pedido()?.status === 'cancelado');
  readonly podePagar   = computed(() => {
    const p = this._pedido();
    return !!p && !p.pago && !STATUS_TERMINAL.includes(p.status);
  });

  private wsSubscription: Subscription | null = null;

  private currentIndex = computed(() =>
    ORDER.indexOf(this._pedido()?.status ?? 'criado'),
  );

  // ── Pagamento ─────────────────────────────────────────────────────────────

  readonly isAuthenticated        = this.authService.isAuthenticated;
  readonly pagando                = signal(false);
  readonly pagamento              = signal<CreatePagamentoResponse | null>(null);
  readonly pagadorNome            = signal('');
  readonly pagadorCpf             = signal('');          // apenas dígitos
  readonly pagadorCpfFormatted    = signal('');          // exibição mascarada
  readonly pagadorError           = signal('');
  readonly copiado                = signal(false);

  private copiadoTimer: ReturnType<typeof setTimeout> | null = null;

  // ── Ciclo de vida ─────────────────────────────────────────────────────────

  constructor() {
    this.route.paramMap.pipe(
      map(p => p.get('uuid')?.trim() ?? ''),
      tap(() => {
        this._pedido.set(undefined);
        this.desconectarWs();
        this.resetarPagamento();
      }),
      switchMap(identificador => {
        if (!identificador) return of(null as Pedido | null);
        const obs = identificador.length === 36 && identificador.includes('-')
          ? this.pedidoService.buscar(identificador)
          : this.pedidoService.buscarPorCodigo(identificador);
        return obs.pipe(
          catchError(() => {
            const local = identificador.length === 36 && identificador.includes('-')
              ? this.pedidoLocalStorage.buscarPorUuid(identificador)
              : this.pedidoLocalStorage.buscarPorCodigo(identificador);
            return of(local ?? null);
          }),
        );
      }),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(pedido => {
      this._pedido.set(pedido);
      if (pedido?.codigo && !STATUS_TERMINAL.includes(pedido.status)) {
        this.conectarWs(pedido.codigo);
      }
    });

    this.destroyRef.onDestroy(() => {
      this.desconectarWs();
      if (this.copiadoTimer) clearTimeout(this.copiadoTimer);
    });
  }

  // ── WebSocket ─────────────────────────────────────────────────────────────

  private conectarWs(codigo: string): void {
    this.desconectarWs();
    this.wsSubscription = this.pedidosLiveService
      .acompanharPorCodigo(codigo)
      .subscribe({
        next: (pedido) => {
          const foiPago = !this._pedido()?.pago && pedido.pago;
          this._pedido.set(pedido);
          // Quando o webhook confirmar o pagamento, limpa o QR Code exibido
          if (foiPago) this.pagamento.set(null);
          if (STATUS_TERMINAL.includes(pedido.status)) this.desconectarWs();
        },
      });
  }

  private desconectarWs(): void {
    this.wsSubscription?.unsubscribe();
    this.wsSubscription = null;
  }

  // ── Pagamento PIX ─────────────────────────────────────────────────────────

  pagar(): void {
    const pedido = this._pedido();
    if (!pedido) return;

    let pagador: { nome: string; cpf: string } | undefined;

    if (!this.authService.isAuthenticated()) {
      const nome = this.pagadorNome().trim();
      const cpf  = this.pagadorCpf();
      if (!nome)            { this.pagadorError.set('Nome é obrigatório.'); return; }
      if (!validarCpf(cpf)) { this.pagadorError.set('CPF inválido.'); return; }
      this.pagadorError.set('');
      pagador = { nome, cpf };
    }

    this.pagando.set(true);
    this.pagamentoService.criar(pedido.uuid, pagador).subscribe({
      next: (res) => {
        this.pagando.set(false);
        this.pagamento.set(res);
      },
      error: (err) => {
        this.pagando.set(false);
        this.pagadorError.set(err?.error?.error ?? 'Erro ao gerar cobrança PIX.');
      },
    });
  }

  onPagadorCpfInput(event: Event): void {
    const digits = (event.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 11);
    this.pagadorCpf.set(digits);
    const formatted = formatCpf(digits);
    this.pagadorCpfFormatted.set(formatted);
    (event.target as HTMLInputElement).value = formatted;
  }

  copiarPix(): void {
    const pix = this.pagamento()?.pix_copia_cola;
    if (!pix) return;
    navigator.clipboard.writeText(pix).then(() => {
      this.copiado.set(true);
      if (this.copiadoTimer) clearTimeout(this.copiadoTimer);
      this.copiadoTimer = setTimeout(() => this.copiado.set(false), 2000);
    });
  }

  private resetarPagamento(): void {
    this.pagamento.set(null);
    this.pagando.set(false);
    this.pagadorNome.set('');
    this.pagadorCpf.set('');
    this.pagadorCpfFormatted.set('');
    this.pagadorError.set('');
    this.copiado.set(false);
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  getFormattedDate(date: string): string {
    const dp = new DatePipe('en-US');
    return `${dp.transform(date, 'dd/MM/yyyy')} às ${new Date(date).toLocaleTimeString('pt-BR')}`;
  }

  displayCode(): string {
    return this._pedido()?.codigo ?? '';
  }

  isActive(s: StatusPedido) { return this._pedido()?.status === s; }
  isDone  (s: StatusPedido) { return ORDER.indexOf(s) < this.currentIndex(); }

  totalItem(item: Pedido['itens'][number]): number {
    return item.partes.reduce(
      (acc, p) =>
        acc + p.preco_unitario + p.adicionais.reduce((a, ad) => a + ad.preco, 0),
      0,
    ) * item.quantidade;
  }
}
