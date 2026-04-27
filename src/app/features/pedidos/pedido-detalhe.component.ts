import { Component, inject, signal, computed, DestroyRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DecimalPipe, DatePipe } from '@angular/common';
import { switchMap, catchError, of, map, tap } from 'rxjs';
import { Subscription } from 'rxjs';
import { PedidoService } from '../../core/services/pedido.service';
import { PedidoLocalStorageService } from '../../core/services/pedido-local-storage.service';
import { PedidosLiveService } from '../../core/services/pedidos-live.service';
import { Pedido, StatusPedido } from '../../core/models';

type Steps = {
  status: StatusPedido;
  label: string;
  icon: string
}

const STEPS: Steps[] = [
  { status: 'criado', label: 'Pedido criado', icon: '🕐' },
  { status: 'aguardando_confirmacao_de_loja', label: 'Aguardando loja', icon: '⏳' },
  { status: 'confirmado_pela_loja', label: 'Confirmado', icon: '✅' },
  { status: 'em_preparo', label: 'Em preparo', icon: '👨‍🍳' },
  { status: 'pronto', label: 'Pronto', icon: '📦' },
  { status: 'saiu_para_entrega', label: 'Saiu p/ entrega', icon: '🛵' },
  { status: 'entregue', label: 'Entregue', icon: '🎉' },
];

const ORDER: StatusPedido[] = STEPS.map((s) => s.status);
const STATUS_TERMINAL: StatusPedido[] = ['entregue', 'cancelado'];

@Component({
  selector: 'app-pedido-detalhe',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './pedido-detalhe.component.html',
})
export class PedidoDetalheComponent {
  private route = inject(ActivatedRoute);
  private pedidoService = inject(PedidoService);
  private pedidoLocalStorage = inject(PedidoLocalStorageService);
  private pedidosLiveService = inject(PedidosLiveService);
  private destroyRef = inject(DestroyRef);

  readonly steps = STEPS;

  private readonly _pedido = signal<Pedido | null | undefined>(undefined);
  readonly pedido = this._pedido.asReadonly();

  readonly loading     = computed(() => this._pedido() === undefined);
  readonly isCancelled = computed(() => this._pedido()?.status === 'cancelado');

  private wsSubscription: Subscription | null = null;

  private currentIndex = computed(() =>
    ORDER.indexOf(this._pedido()?.status ?? 'criado'),
  );

  constructor() {
    this.route.paramMap.pipe(
      map(p => p.get('uuid')?.trim() ?? ''),
      tap(() => {
        this._pedido.set(undefined);
        this.desconectarWs();
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

    this.destroyRef.onDestroy(() => this.desconectarWs());
  }

  private conectarWs(codigo: string): void {
    this.desconectarWs();
    this.wsSubscription = this.pedidosLiveService
      .acompanharPorCodigo(codigo)
      .subscribe({
        next: (pedido) => {
          this._pedido.set(pedido);
          if (STATUS_TERMINAL.includes(pedido.status)) {
            this.desconectarWs();
          }
        },
      });
  }

  private desconectarWs(): void {
    this.wsSubscription?.unsubscribe();
    this.wsSubscription = null;
  }

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
        acc +
        p.preco_unitario +
        p.adicionais.reduce((a, ad) => a + ad.preco, 0),
      0,
    ) * item.quantidade;
  }
}
