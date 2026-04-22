import { Component, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { PedidoService } from '../../core/services/pedido.service';
import { PedidoLocalStorageService } from '../../core/services/pedido-local-storage.service';
import { Pedido, StatusPedido } from '../../core/models';
import { catchError, of } from 'rxjs';

const STATUS_CONFIG: Record<StatusPedido, { label: string; color: string; bg: string; icon: string }> = {
  criado:                          { label: 'Criado',           color: 'text-gray-600',   bg: 'bg-gray-100',   icon: '🕐' },
  aguardando_confirmacao_de_loja:  { label: 'Aguardando loja',  color: 'text-yellow-700', bg: 'bg-yellow-100', icon: '⏳' },
  confirmado_pela_loja:            { label: 'Confirmado',       color: 'text-blue-700',   bg: 'bg-blue-100',   icon: '✅' },
  em_preparo:                      { label: 'Em preparo',       color: 'text-purple-700', bg: 'bg-purple-100', icon: '👨‍🍳' },
  pronto_para_retirada:            { label: 'Pronto',           color: 'text-teal-700',   bg: 'bg-teal-100',   icon: '📦' },
  saiu_para_entrega:               { label: 'Saiu para entrega',color: 'text-orange-700', bg: 'bg-orange-100', icon: '🛵' },
  entregue:                        { label: 'Entregue',         color: 'text-green-700',  bg: 'bg-green-100',  icon: '🎉' },
};

@Component({
  selector: 'app-pedidos',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './pedidos.component.html',
})
export class PedidosComponent {
  private pedidoService = inject(PedidoService);
  private pedidoLocalStorage = inject(PedidoLocalStorageService);

  readonly filtro = signal<StatusPedido | 'todos'>('todos');
  readonly pedidoSelecionado = signal<Pedido | null>(null);

  readonly statusEntries = (Object.entries(STATUS_CONFIG) as [StatusPedido, typeof STATUS_CONFIG[StatusPedido]][])
    .map(([key, cfg]) => ({ key, cfg }));

  readonly _pedidos = toSignal(
    this.pedidoService.listar().pipe(catchError(() => of([]))),
  );

  readonly pedidos = computed(() => {
    const api = this._pedidos() ?? [];
    const local = this.pedidoLocalStorage.pedidos();
    const combinados = new Map<string, Pedido>();

    [...local, ...api].forEach((pedido) => {
      combinados.set(pedido.uuid, pedido);
    });

    return [...combinados.values()].sort(
      (a, b) => new Date(b.criado_em).getTime() - new Date(a.criado_em).getTime(),
    );
  });

  readonly loading = computed(() => this._pedidos() === undefined && this.pedidoLocalStorage.pedidos().length === 0);
  readonly filtered = computed(() => {
    const all = this.pedidos();
    const status = this.filtro();
    return status === 'todos' ? all : all.filter((p) => p.status === status);
  });

  getFormattedDate(date: string): string {
    const datePipe = new DatePipe('pt-BR');
    return `${datePipe.transform(date, 'dd/MM/yyyy')} às ${new Date(date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
  }

  statusCfg(s: StatusPedido) {
    return STATUS_CONFIG[s] ?? STATUS_CONFIG['criado'];
  }

  abrirDetalhe(pedido: Pedido) {
    this.pedidoSelecionado.set(pedido);
  }

  pedidoCodigo(pedido: Pedido): string {
    return pedido.codigo;
  }

  fecharDetalhe() {
    this.pedidoSelecionado.set(null);
  }

  totalItem(item: Pedido['itens'][number]): number {
    return item.partes.reduce(
      (acc, p) => acc + p.preco_unitario + p.adicionais.reduce((a, ad) => a + ad.preco, 0),
      0,
    ) * item.quantidade;
  }
}
