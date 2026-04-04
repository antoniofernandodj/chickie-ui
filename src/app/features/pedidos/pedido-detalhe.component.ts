import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe, DecimalPipe } from '@angular/common';
import { switchMap, catchError, of, map } from 'rxjs';
import { PedidoService } from '../../core/services/pedido.service';
import { Pedido, StatusPedido } from '../../core/models';

const STEPS: { status: StatusPedido; label: string; icon: string }[] = [
  { status: 'criado',                         label: 'Pedido criado',      icon: '🕐' },
  { status: 'aguardando_confirmacao_de_loja', label: 'Aguardando loja',    icon: '⏳' },
  { status: 'confirmado_pela_loja',           label: 'Confirmado',         icon: '✅' },
  { status: 'em_preparo',                     label: 'Em preparo',         icon: '👨‍🍳' },
  { status: 'pronto_para_retirada',           label: 'Pronto',             icon: '📦' },
  { status: 'saiu_para_entrega',              label: 'Saiu p/ entrega',    icon: '🛵' },
  { status: 'entregue',                       label: 'Entregue',           icon: '🎉' },
];

const ORDER: StatusPedido[] = STEPS.map((s) => s.status);

@Component({
  selector: 'app-pedido-detalhe',
  imports: [RouterLink, DatePipe, DecimalPipe],
  template: `
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <!-- Back -->
      <a routerLink="/pedidos"
         class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Voltar para pedidos
      </a>

      @if (loading()) {
        <div class="space-y-4">
          <div class="h-6 skeleton bg-gray-200 rounded w-1/2"></div>
          <div class="bg-white rounded-2xl p-6 skeleton h-32"></div>
          <div class="bg-white rounded-2xl p-6 skeleton h-48"></div>
        </div>
      } @else if (!pedido()) {
        <div class="text-center py-20">
          <div class="text-5xl mb-4">😕</div>
          <h1 class="text-xl font-bold text-gray-800 mb-2">Pedido não encontrado</h1>
          <a routerLink="/pedidos" class="text-sm font-medium" style="color:var(--color-brand)">← Ver pedidos</a>
        </div>
      } @else {
        <div class="flex items-start justify-between mb-6">
          <div>
            <p class="text-xs text-gray-400 mb-1">{{ pedido()!.criado_em | date:'dd/MM/yyyy \'às\' HH:mm' }}</p>
            <h1 class="text-xl font-bold text-gray-900">
              Pedido #{{ pedido()!.uuid.slice(-8).toUpperCase() }}
            </h1>
          </div>
        </div>

        <!-- Timeline de status -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 class="text-sm font-semibold text-gray-700 mb-5">Status do pedido</h2>
          <div class="relative">
            <!-- linha vertical -->
            <div class="absolute left-5 top-5 bottom-5 w-0.5 bg-gray-100"></div>

            <div class="space-y-4">
              @for (step of steps; track step.status) {
                <div class="flex items-center gap-4 relative z-10">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 transition-all"
                       [class.shadow-md]="isActive(step.status)"
                       [class.bg-white]="!isActive(step.status) && !isDone(step.status)"
                       [class.border-2]="!isActive(step.status) && !isDone(step.status)"
                       [class.border-gray-200]="!isActive(step.status) && !isDone(step.status)"
                       [style.background]="isActive(step.status) ? 'var(--color-brand)' : isDone(step.status) ? 'oklch(96% 0.04 40)' : ''">
                    @if (isActive(step.status)) {
                      <span class="text-white">{{ step.icon }}</span>
                    } @else if (isDone(step.status)) {
                      <svg class="w-4 h-4" style="color:var(--color-brand)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                      </svg>
                    } @else {
                      <span class="text-gray-300 text-sm">{{ step.icon }}</span>
                    }
                  </div>
                  <div>
                    <p class="text-sm font-medium"
                       [class.text-gray-900]="isActive(step.status) || isDone(step.status)"
                       [class.text-gray-400]="!isActive(step.status) && !isDone(step.status)"
                       [style.color]="isActive(step.status) ? 'var(--color-brand)' : ''">
                      {{ step.label }}
                    </p>
                    @if (isActive(step.status)) {
                      <p class="text-xs text-gray-400 mt-0.5">Status atual</p>
                    }
                  </div>
                </div>
              }
            </div>
          </div>
        </div>

        <!-- Itens -->
        @if (pedido()!.itens && pedido()!.itens.length > 0) {
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <h2 class="text-sm font-semibold text-gray-700 mb-4">Itens do pedido</h2>
            <div class="space-y-4">
              @for (item of pedido()!.itens; track item.uuid) {
                <div class="border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-medium text-gray-900">
                      {{ item.quantidade }}x
                      @if (item.partes.length > 0) { {{ item.partes[0].produto_nome }} }
                      @if (item.partes.length > 1) { + {{ item.partes.length - 1 }} sabor(es) }
                    </span>
                    @if (item.partes.length > 0) {
                      <span class="text-sm font-semibold text-gray-800">
                        R$ {{ totalItem(item) | number:'1.2-2' }}
                      </span>
                    }
                  </div>
                  @for (parte of item.partes; track parte.uuid) {
                    <p class="text-xs text-gray-500 ml-3">
                      — {{ parte.produto_nome }}
                      <span class="text-gray-400">(R$ {{ parte.preco_unitario | number:'1.2-2' }})</span>
                    </p>
                    @for (ad of parte.adicionais; track ad.uuid) {
                      <p class="text-xs text-gray-400 ml-6">+ {{ ad.nome }} (R$ {{ ad.preco | number:'1.2-2' }})</p>
                    }
                  }
                  @if (item.observacoes) {
                    <p class="text-xs text-gray-400 ml-3 mt-1 italic">Obs: {{ item.observacoes }}</p>
                  }
                </div>
              }
            </div>
          </div>
        }

        <!-- Resumo financeiro -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 class="text-sm font-semibold text-gray-700 mb-4">Resumo</h2>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>R$ {{ pedido()!.subtotal | number:'1.2-2' }}</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Taxa de entrega</span>
              @if (pedido()!.taxa_entrega === 0) {
                <span class="text-green-600 font-medium">Grátis</span>
              } @else {
                <span>R$ {{ pedido()!.taxa_entrega | number:'1.2-2' }}</span>
              }
            </div>
            @if (pedido()!.desconto > 0) {
              <div class="flex justify-between text-green-600">
                <span>Desconto</span>
                <span>- R$ {{ pedido()!.desconto | number:'1.2-2' }}</span>
              </div>
            }
            <div class="flex justify-between font-bold text-base text-gray-900 pt-3 border-t border-gray-100 mt-3">
              <span>Total</span>
              <span>R$ {{ pedido()!.total | number:'1.2-2' }}</span>
            </div>
            <div class="flex justify-between text-xs text-gray-400 mt-2">
              <span>Pagamento</span>
              <span class="font-medium text-gray-600">{{ pedido()!.forma_pagamento }}</span>
            </div>
            @if (pedido()!.observacoes) {
              <div class="pt-3 border-t border-gray-50">
                <p class="text-xs text-gray-500 italic">Obs: {{ pedido()!.observacoes }}</p>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
})
export class PedidoDetalheComponent {
  private route         = inject(ActivatedRoute);
  private pedidoService = inject(PedidoService);

  readonly steps = STEPS;

  readonly pedido = toSignal(
    this.route.paramMap.pipe(
      map((p) => p.get('uuid')!),
      switchMap((uuid) =>
        this.pedidoService.buscar(uuid).pipe(catchError(() => of(null))),
      ),
    ),
  );

  readonly loading = computed(() => this.pedido() === undefined);

  private currentIndex = computed(() =>
    ORDER.indexOf(this.pedido()?.status ?? 'criado'),
  );

  isActive(s: StatusPedido) { return this.pedido()?.status === s; }
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
