import { Component, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { PedidoService } from '../../core/services/pedido.service';
import { StatusPedido } from '../../core/models';
import { catchError, of } from 'rxjs';

const STATUS_CONFIG: Record<StatusPedido, { label: string; color: string; bg: string; icon: string }> = {
  criado: { label: 'Criado', color: 'text-gray-600', bg: 'bg-gray-100',   icon: '🕐' },
  aguardando_confirmacao_de_loja:{ label: 'Aguardando loja', color: 'text-yellow-700', bg: 'bg-yellow-100', icon: '⏳' },
  confirmado_pela_loja: { label: 'Confirmado', color: 'text-blue-700',   bg: 'bg-blue-100', icon: '✅' },
  em_preparo: { label: 'Em preparo', color: 'text-purple-700', bg: 'bg-purple-100', icon: '👨‍🍳' },
  pronto_para_retirada: { label: 'Pronto', color: 'text-teal-700', bg: 'bg-teal-100',   icon: '📦' },
  saiu_para_entrega: { label: 'Saiu para entrega', color: 'text-orange-700', bg: 'bg-orange-100', icon: '🛵' },
  entregue: { label: 'Entregue', color: 'text-green-700', bg: 'bg-green-100',  icon: '🎉' },
};

@Component({
  selector: 'app-pedidos',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './pedidos.component.html',
})
export class PedidosComponent {
  private pedidoService = inject(PedidoService);

  readonly filtro = signal<StatusPedido | 'todos'>('todos');

  readonly statusEntries = (Object.entries(STATUS_CONFIG) as [StatusPedido, typeof STATUS_CONFIG[StatusPedido]][])
    .map(([key, cfg]) => ({ key, cfg }));

  readonly _pedidos = toSignal(
    this.pedidoService.listar().pipe(catchError(() => of([]))),
  );

  readonly loading = computed(() => this._pedidos() === undefined);
  readonly filtered = computed(() => {
    const all = this._pedidos() ?? [];
    const status = this.filtro();
    return status === 'todos' ? all : all.filter((p) => p.status === status);
  });
  
  // Method to format the date safely
  getFormattedDate(date: string): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'dd/MM/yyyy') + " às " + new Date(date).toLocaleTimeString('pt-BR');
  }

  statusCfg(s: StatusPedido) {
    return STATUS_CONFIG[s];
  }
}
