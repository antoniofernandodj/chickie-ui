import { Component, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { LojaService } from '../../core/services/loja.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DecimalPipe],
  template: `
    <!-- Hero -->
    <section
      class="relative overflow-hidden py-16 sm:py-24"
      style="background: linear-gradient(135deg, oklch(20% 0.01 270) 0%, oklch(28% 0.05 280) 100%)"
    >
      <div class="absolute inset-0 opacity-10 pointer-events-none"
           style="background-image: radial-gradient(circle at 20% 50%, var(--color-brand) 0%, transparent 50%), radial-gradient(circle at 80% 20%, oklch(70% 0.2 300) 0%, transparent 40%)">
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
             style="background: oklch(65% 0.22 40 / 0.15); color: oklch(85% 0.15 40)">
          <span class="w-2 h-2 rounded-full animate-pulse" style="background:var(--color-brand)"></span>
          Delivery online
        </div>
        <h1 class="text-4xl sm:text-6xl font-black text-white leading-tight tracking-tight mb-4">
          Comida boa,<br>
          <span style="color: var(--color-brand)">na hora certa.</span>
        </h1>
        <p class="text-lg text-gray-400 max-w-xl mx-auto mb-8">
          Escolha entre as melhores lojas e receba seu pedido onde estiver.
        </p>
        <div class="max-w-lg mx-auto flex items-center gap-3 bg-white/10 backdrop-blur rounded-2xl px-4 py-3 border border-white/10">
          <svg class="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0"/>
          </svg>
          <input
            [value]="search()"
            (input)="search.set($any($event.target).value)"
            placeholder="Buscar lojas, pratos..."
            class="bg-transparent flex-1 outline-none text-white placeholder-gray-500 text-sm"
          />
        </div>
      </div>
    </section>

    <!-- Grid de lojas -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      @if (loading()) {
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          @for (_ of skeletons; track $index) {
            <div class="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div class="h-40 skeleton bg-gray-200"></div>
              <div class="p-4 space-y-3">
                <div class="h-4 skeleton bg-gray-200 rounded-lg w-3/4"></div>
                <div class="h-3 skeleton bg-gray-100 rounded-lg w-1/2"></div>
                <div class="h-3 skeleton bg-gray-100 rounded-lg w-2/3"></div>
              </div>
            </div>
          }
        </div>
      } @else if (filtered().length === 0) {
        <div class="text-center py-24">
          <div class="text-6xl mb-4">🏪</div>
          <h2 class="text-xl font-semibold text-gray-800 mb-2">Nenhuma loja encontrada</h2>
          <p class="text-gray-500">Tente outro termo de busca.</p>
        </div>
      } @else {
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">Lojas disponíveis</h2>
            <p class="text-gray-500 text-sm mt-1">{{ filtered().length }} lojas</p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          @for (loja of filtered(); track loja.uuid) {
            <a [routerLink]="['/loja', loja.uuid]"
               class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:-translate-y-0.5">
              <!-- Banner -->
              <div class="relative h-40 overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100">
                @if (loja.banner_url) {
                  <img [src]="loja.banner_url" [alt]="loja.nome"
                       class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                } @else {
                  <div class="w-full h-full flex items-center justify-center">
                    <span class="text-5xl opacity-30">🍽️</span>
                  </div>
                }
                <div class="absolute top-3 left-3">
                  @if (loja.ativa) {
                    <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-green-500 text-white">
                      <span class="w-1.5 h-1.5 bg-white rounded-full"></span>Aberto
                    </span>
                  } @else {
                    <span class="px-2 py-1 rounded-full text-xs font-semibold bg-black/60 text-gray-300">Fechado</span>
                  }
                </div>
                @if (loja.logo_url) {
                  <div class="absolute -bottom-4 left-4 w-12 h-12 rounded-xl bg-white shadow border-2 border-white overflow-hidden">
                    <img [src]="loja.logo_url" [alt]="loja.nome" class="w-full h-full object-cover"/>
                  </div>
                }
              </div>

              <!-- Info -->
              <div class="p-4" [class.pt-6]="loja.logo_url">
                <h3 class="font-bold text-gray-900 leading-tight mb-1 group-hover:text-orange-600 transition-colors">
                  {{ loja.nome }}
                </h3>
                @if (loja.descricao) {
                  <p class="text-xs text-gray-500 line-clamp-2 mb-3">{{ loja.descricao }}</p>
                }
                <div class="grid grid-cols-3 gap-x-2 text-xs text-gray-500 border-t border-gray-100 pt-3">
                  <div class="flex flex-col items-center gap-0.5">
                    <span>⏱</span>
                    <span class="font-medium text-gray-700">{{ loja.tempo_preparo_min }}min</span>
                  </div>
                  <div class="flex flex-col items-center gap-0.5">
                    <span>🛵</span>
                    <span class="font-medium text-gray-700">
                      @if (loja.taxa_entrega === 0) {
                      Grátis
                    } @else {
                      R$ {{ loja.taxa_entrega | number:'1.2-2' }}
                    }
                    </span>
                  </div>
                  <div class="flex flex-col items-center gap-0.5">
                    <span>💳</span>
                    <span class="font-medium text-gray-700">R$ {{ loja.valor_minimo_pedido | number:'1.0-0' }}</span>
                  </div>
                </div>
              </div>
            </a>
          }
        </div>
      }
    </main>
  `,
})
export class HomeComponent {
  private lojaService = inject(LojaService);

  readonly skeletons = Array(8);
  readonly search    = signal('');

  readonly _lojas = toSignal(
    this.lojaService.listar().pipe(catchError(() => of([]))),
  );

  readonly loading  = computed(() => this._lojas() === undefined);
  readonly filtered = computed(() => {
    const all  = this._lojas() ?? [];
    const term = this.search().toLowerCase().trim();
    return term
      ? all.filter(
          (l) =>
            l.nome.toLowerCase().includes(term) ||
            (l.descricao ?? '').toLowerCase().includes(term),
        )
      : all;
  });
}
