import { Component, inject, signal, computed, afterNextRender, LOCALE_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { forkJoin, catchError, of } from 'rxjs';
import { PedidoService } from '../../core/services/pedido.service';
import { PedidoLocalStorageService } from '../../core/services/pedido-local-storage.service';
import { AuthService } from '../../core/services/auth.service';
import { Pedido, StatusPedido } from '../../core/models';
import { STATUS_PEDIDO_CFG, UiModalComponent, UiEmptyStateComponent, UiStatusBadgeComponent, UiSkeletonComponent } from '../../shared/components';

@Component({
  selector: 'app-pedidos',
  imports: [RouterLink, DecimalPipe, UiModalComponent, UiEmptyStateComponent, UiStatusBadgeComponent, UiSkeletonComponent],
  templateUrl: './pedidos.component.html',
})
export class PedidosComponent {
  private pedidoService      = inject(PedidoService);
  private pedidoLocalStorage = inject(PedidoLocalStorageService);
  private auth               = inject(AuthService);
  private locale             = inject(LOCALE_ID);

  readonly filtro            = signal<StatusPedido | 'todos'>('todos');
  readonly loading           = signal(true);

  private readonly _apiPedidos = signal<Pedido[]>([]);

  readonly statusEntries = (Object.entries(STATUS_PEDIDO_CFG) as [StatusPedido, typeof STATUS_PEDIDO_CFG[StatusPedido]][])
    .map(([key, cfg]) => ({ key, cfg }));

  readonly pedidos = computed(() => {
    if (this.auth.isAuthenticated()) {
      const map = new Map<string, Pedido>();
      [...this.pedidoLocalStorage.pedidos(), ...this._apiPedidos()].forEach(p => map.set(p.uuid, p));
      return [...map.values()].sort((a, b) => new Date(b.criado_em).getTime() - new Date(a.criado_em).getTime());
    }
    return this.pedidoLocalStorage.pedidos();
  });

  readonly filtered = computed(() => {
    const s = this.filtro();
    return s === 'todos' ? this.pedidos() : this.pedidos().filter(p => p.status === s);
  });

  readonly pedidosLocaisSet = computed(() => new Set(this.pedidoLocalStorage.pedidos().map(p => p.uuid)));

  constructor() {
    // afterNextRender executa apenas no browser, após a hidratação SSR estabilizar.
    // Isso evita mismatch entre o DOM do servidor (sem localStorage) e o cliente.
    afterNextRender(() => {
      if (this.auth.isAuthenticated()) {
        this.pedidoService.listar().pipe(catchError(() => of([]))).subscribe((pedidos) => {
          this._apiPedidos.set(pedidos);
          this.loading.set(false);
        });
      } else {
        this.loading.set(false);
        const locais = this.pedidoLocalStorage.pedidos();
        if (locais.length === 0) return;
        forkJoin(
          locais.map(p => this.pedidoService.buscarPorCodigo(p.codigo).pipe(catchError(() => of(p))))
        ).subscribe((frescos) => {
          frescos.forEach(p => this.pedidoLocalStorage.salvar(p));
        });
      }
    });
  }

  eLocal(uuid: string): boolean { return this.pedidosLocaisSet().has(uuid); }

  removerLocal(uuid: string, event: Event): void {
    event.stopPropagation();
    this.pedidoLocalStorage.remover(uuid);
  }

  getFormattedDate(date: string | null | undefined): string {
    if (!date) return '';
    try {
      const dp = new DatePipe(this.locale);
      const dataFormatada = dp.transform(date, 'dd/MM/yyyy');
      const horaFormatada = new Date(date).toLocaleTimeString(this.locale, { hour: '2-digit', minute: '2-digit' });
      return `${dataFormatada} às ${horaFormatada}`;
    } catch (e) {
      console.error('Erro ao formatar data:', e);
      return '';
    }
  }

  statusCfg(s: StatusPedido) { return STATUS_PEDIDO_CFG[s] ?? STATUS_PEDIDO_CFG['criado']; }
}
