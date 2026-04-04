import { Component, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { PedidoService } from '../../core/services/pedido.service';
import { StatusPedido } from '../../core/models';
import { catchError, of } from 'rxjs';

const STATUS_CONFIG: Record<StatusPedido, { label: string; color: string; bg: string; icon: string }> = {
  criado:                        { label: 'Criado',              color: 'text-gray-600',   bg: 'bg-gray-100',   icon: '🕐' },
  aguardando_confirmacao_de_loja:{ label: 'Aguardando loja',     color: 'text-yellow-700', bg: 'bg-yellow-100', icon: '⏳' },
  confirmado_pela_loja:          { label: 'Confirmado',          color: 'text-blue-700',   bg: 'bg-blue-100',   icon: '✅' },
  em_preparo:                    { label: 'Em preparo',          color: 'text-purple-700', bg: 'bg-purple-100', icon: '👨‍🍳' },
  pronto_para_retirada:          { label: 'Pronto',              color: 'text-teal-700',   bg: 'bg-teal-100',   icon: '📦' },
  saiu_para_entrega:             { label: 'Saiu para entrega',   color: 'text-orange-700', bg: 'bg-orange-100', icon: '🛵' },
  entregue:                      { label: 'Entregue',            color: 'text-green-700',  bg: 'bg-green-100',  icon: '🎉' },
};

@Component({
  selector: 'app-pedidos',
  imports: [RouterLink, DatePipe, DecimalPipe],
  template: `
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Meus Pedidos</h1>
          <p class="text-gray-500 text-sm mt-1">Acompanhe seus pedidos em tempo real</p>
        </div>
      </div>

      <!-- Filtros -->
      <div class="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        <button
          (click)="filtro.set('todos')"
          class="shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all"
          [class.text-white]="filtro() === 'todos'"
          [class.text-gray-600]="filtro() !== 'todos'"
          [class.bg-gray-900]="filtro() === 'todos'"
          [class.bg-white]="filtro() !== 'todos'"
          [class.border]="filtro() !== 'todos'"
          [class.border-gray-200]="filtro() !== 'todos'"
        >Todos</button>
        @for (entry of statusEntries; track entry.key) {
          <button
            (click)="filtro.set(entry.key)"
            class="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all"
            [class.text-white]="filtro() === entry.key"
            [class.bg-gray-900]="filtro() === entry.key"
            [class.bg-white]="filtro() !== entry.key"
            [class.border]="filtro() !== entry.key"
            [class.border-gray-200]="filtro() !== entry.key"
            [class.text-gray-600]="filtro() !== entry.key"
          >
            {{ entry.cfg.icon }} {{ entry.cfg.label }}
          </button>
        }
      </div>

      @if (loading()) {
        <div class="space-y-4">
          @for (_ of [1,2,3]; track $index) {
            <div class="bg-white rounded-2xl shadow-sm p-5 space-y-3">
              <div class="flex justify-between">
                <div class="h-4 skeleton bg-gray-200 rounded w-1/3"></div>
                <div class="h-6 skeleton bg-gray-100 rounded-full w-24"></div>
              </div>
              <div class="h-3 skeleton bg-gray-100 rounded w-2/3"></div>
              <div class="h-5 skeleton bg-gray-100 rounded w-1/4"></div>
            </div>
          }
        </div>
      } @else if (filtered().length === 0) {
        <div class="text-center py-20">
          <div class="text-6xl mb-4">🛒</div>
          <h2 class="text-xl font-semibold text-gray-800 mb-2">Nenhum pedido aqui</h2>
          <p class="text-gray-500 text-sm mb-6">
            @if (filtro() === 'todos') { Você ainda não fez nenhum pedido. }
            @else { Nenhum pedido com este status. }
          </p>
          <a routerLink="/"
             class="inline-block px-6 py-3 rounded-xl font-semibold text-white text-sm"
             style="background:var(--color-brand)">
            Explorar lojas
          </a>
        </div>
      } @else {
        <div class="space-y-4">
          @for (pedido of filtered(); track pedido.uuid) {
            <a [routerLink]="['/pedidos', pedido.uuid]"
               class="block bg-white rounded-2xl shadow-sm border border-gray-100
                      hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-5">
              <div class="flex items-start justify-between mb-3">
                <div>
                  <p class="text-xs text-gray-400 mb-1">
                    {{ getFormattedDate(pedido.criado_em) }}
                  </p>
                  <p class="text-sm font-medium text-gray-700">
                    Pedido #{{ pedido.uuid.slice(-8).toUpperCase() }}
                  </p>
                </div>
                @if (statusCfg(pedido.status); as cfg) {
                  <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold {{ cfg.bg }} {{ cfg.color }}">
                    {{ cfg.icon }} {{ cfg.label }}
                  </span>
                }
              </div>

              @if (pedido.itens && pedido.itens.length > 0) {
                <p class="text-xs text-gray-500 mb-3 line-clamp-1">
                  {{ pedido.itens.length }} {{ pedido.itens.length === 1 ? 'item' : 'itens' }}
                  @if (pedido.itens[0].partes[0]; as parte) {
                    — {{ parte.produto_nome }}
                    @if (pedido.itens.length > 1) { e mais {{ pedido.itens.length - 1 }}... }
                  }
                </p>
              }

              <div class="flex items-center justify-between pt-3 border-t border-gray-50">
                <div class="text-sm">
                  <span class="text-gray-500">Total </span>
                  <span class="font-bold text-gray-900">R$ {{ pedido.total | number:'1.2-2' }}</span>
                </div>
                <div class="flex items-center gap-1 text-xs text-gray-400 font-medium">
                  Ver detalhes
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </a>
          }
        </div>
      }
    </div>
  `,
})
export class PedidosComponent {
  private pedidoService = inject(PedidoService);

  readonly filtro = signal<StatusPedido | 'todos'>('todos');

  readonly statusEntries = (Object.entries(STATUS_CONFIG) as [StatusPedido, typeof STATUS_CONFIG[StatusPedido]][])
    .map(([key, cfg]) => ({ key, cfg }));

  readonly _pedidos = toSignal(
    this.pedidoService.listar().pipe(catchError(() => of([]))),
  );

  readonly loading  = computed(() => this._pedidos() === undefined);
  readonly filtered = computed(() => {
    const all    = this._pedidos() ?? [];
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
