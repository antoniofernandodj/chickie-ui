import { Injectable, inject, PLATFORM_ID, signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Loja, Produto, Adicional } from '../models';

export interface CartParte {
  produto:    Produto;
  posicao:    number;
  adicionais: Adicional[];
}

export interface CartItem {
  id:             number;
  categoria_uuid: string;
  partes:         CartParte[];
  quantidade:     number;
}

const KEY = 'chickie_cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly platformId = inject(PLATFORM_ID);

  readonly lojaAtual  = signal<Loja | null>(null);
  readonly itens      = signal<CartItem[]>([]);
  readonly drawerOpen = signal(false);

  readonly subtotal = computed(() =>
    this.itens().reduce((total, item) => {
      const base   = Math.max(...item.partes.map(p => Number(p.produto.preco)));
      const extras = item.partes.reduce(
        (s, p) => s + p.adicionais.reduce((sa, a) => sa + Number(a.preco), 0), 0,
      );
      return total + (base + extras) * item.quantidade;
    }, 0),
  );

  readonly totalItens = computed(() =>
    this.itens().reduce((s, i) => s + i.quantidade, 0),
  );

  constructor() {
    if (isPlatformBrowser(this.platformId)) this._load();
  }

  sincronizar(loja: Loja, itens: CartItem[]): void {
    this.lojaAtual.set(loja);
    this.itens.set([...itens]);
    this._save();
  }

  incrementar(id: number): void {
    this.itens.update(c =>
      c.map(i => i.id === id ? { ...i, quantidade: i.quantidade + 1 } : i),
    );
    this._save();
  }

  decrementar(id: number): void {
    this.itens.update(c => {
      const item = c.find(i => i.id === id);
      if (!item) return c;
      return item.quantidade <= 1
        ? c.filter(i => i.id !== id)
        : c.map(i => i.id === id ? { ...i, quantidade: i.quantidade - 1 } : i);
    });
    this._save();
  }

  removerItem(id: number): void {
    this.itens.update(c => c.filter(i => i.id !== id));
    this._save();
  }

  limpar(): void {
    this.lojaAtual.set(null);
    this.itens.set([]);
    if (isPlatformBrowser(this.platformId)) localStorage.removeItem(KEY);
  }

  openDrawer()  { this.drawerOpen.set(true); }
  closeDrawer() { this.drawerOpen.set(false); }
  toggleDrawer(){ this.drawerOpen.update(v => !v); }

  private _save(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const loja  = this.lojaAtual();
    const itens = this.itens();
    if (!loja || itens.length === 0) { localStorage.removeItem(KEY); return; }
    localStorage.setItem(KEY, JSON.stringify({ loja, itens }));
  }

  private _load(): void {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return;
      const { loja, itens } = JSON.parse(raw);
      this.lojaAtual.set(loja);
      this.itens.set(itens);
    } catch {
      localStorage.removeItem(KEY);
    }
  }
}
