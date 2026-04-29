import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { forkJoin, catchError, of } from 'rxjs';
import { PedidoService } from '../../core/services/pedido.service';
import { PedidoLocalStorageService } from '../../core/services/pedido-local-storage.service';
import { AuthService } from '../../core/services/auth.service';
import { Pedido, StatusPedido } from '../../core/models';
import { STATUS_PEDIDO_CFG, UiModalComponent, UiEmptyStateComponent, UiStatusBadgeComponent } from '../../shared/components';

@Component({
  selector: 'app-pedidos',
  imports: [RouterLink, DecimalPipe, UiModalComponent, UiEmptyStateComponent, UiStatusBadgeComponent],
  templateUrl: './pedidos.component.html',
})
export class PedidosComponent implements OnInit {
  private pedidoService      = inject(PedidoService);
  private pedidoLocalStorage = inject(PedidoLocalStorageService);
  private auth               = inject(AuthService);

  readonly filtro            = signal<StatusPedido | 'todos'>('todos');
  readonly pedidoSelecionado = signal<Pedido | null>(null);
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

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.pedidoService.listar().pipe(catchError(() => of([]))).subscribe((pedidos) => {
        this._apiPedidos.set(pedidos);
        this.loading.set(false);
      });
    } else {
      const locais = this.pedidoLocalStorage.pedidos();
      if (locais.length === 0) {
        this.loading.set(false);
        return;
      }
      forkJoin(
        locais.map(p => this.pedidoService.buscarPorCodigo(p.codigo).pipe(catchError(() => of(p))))
      ).subscribe((frescos) => {
        frescos.forEach(p => this.pedidoLocalStorage.salvar(p));
        this.loading.set(false);
      });
    }
  }

  eLocal(uuid: string): boolean { return this.pedidosLocaisSet().has(uuid); }

  removerLocal(uuid: string, event: Event): void {
    event.stopPropagation();
    this.pedidoLocalStorage.remover(uuid);
  }

  getFormattedDate(date: string): string {
    const dp = new DatePipe('pt-BR');
    return `${dp.transform(date, 'dd/MM/yyyy')} às ${new Date(date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
  }

  statusCfg(s: StatusPedido) { return STATUS_PEDIDO_CFG[s] ?? STATUS_PEDIDO_CFG['criado']; }
  abrirDetalhe(p: Pedido)    { this.pedidoSelecionado.set(p); }
  fecharDetalhe()             { this.pedidoSelecionado.set(null); }

  totalItem(item: Pedido['itens'][number]): number {
    return item.partes.reduce((acc, p) => acc + p.preco_unitario + p.adicionais.reduce((a, ad) => a + ad.preco, 0), 0) * item.quantidade;
  }
}
