import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Pedido } from '../models';

const STORAGE_KEY = 'chickie_pedidos_locais';

@Injectable({ providedIn: 'root' })
export class PedidoLocalStorageService {
  private readonly platformId = inject(PLATFORM_ID);

  private readonly _pedidos = signal<Pedido[]>(this.load());
  readonly pedidos = this._pedidos.asReadonly();

  private normalizar(p: any): Pedido {
    return {
      ...p,
      status: typeof p.status === 'string' ? p.status.toLowerCase() as Pedido['status'] : p.status,
      total:        typeof p.total        === 'string' ? parseFloat(p.total)              : (p.total        ?? 0),
      subtotal:     typeof p.subtotal     === 'string' ? parseFloat(p.subtotal)           : (p.subtotal     ?? 0),
      taxa_entrega: typeof p.taxa_entrega === 'string' ? parseFloat(p.taxa_entrega ?? '0'): (p.taxa_entrega ?? 0),
      desconto:     typeof p.desconto     === 'string' ? parseFloat(p.desconto     ?? '0'): (p.desconto     ?? 0),
      itens: (p.itens ?? []).map((item: any) => ({
        ...item,
        adicionais: item.adicionais ?? [],
        partes: (item.partes ?? []).map((parte: any) => ({
          ...parte,
          preco_unitario: typeof parte.preco_unitario === 'string'
            ? parseFloat(parte.preco_unitario)
            : (parte.preco_unitario ?? 0),
        })),
      })),
    };
  }

  private load(): Pedido[] {
    if (!isPlatformBrowser(this.platformId)) return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const pedidos = JSON.parse(raw) as any[];
      return Array.isArray(pedidos)
        ? pedidos.map(p => this.normalizar(p)).sort((a, b) => new Date(b.criado_em).getTime() - new Date(a.criado_em).getTime())
        : [];
    } catch {
      return [];
    }
  }

  private persist(pedidos: Pedido[]): void {
    const ordenados = [...pedidos].sort(
      (a, b) => new Date(b.criado_em).getTime() - new Date(a.criado_em).getTime(),
    );
    this._pedidos.set(ordenados);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ordenados));
    }
  }

  salvar(pedido: Pedido): void {
    const pedidos = this._pedidos();
    const proximo = pedidos.filter((p) => p.uuid !== pedido.uuid && p.codigo !== pedido.codigo);
    this.persist([pedido, ...proximo]);
  }

  listar(): Pedido[] {
    return this._pedidos();
  }

  buscarPorUuid(uuid: string): Pedido | null {
    return this._pedidos().find((p) => p.uuid === uuid) ?? null;
  }

  buscarPorCodigo(codigo: string): Pedido | null {
    const alvo = codigo.trim().toUpperCase();
    return this._pedidos().find((p) => p.codigo?.toUpperCase() === alvo) ?? null;
  }

  remover(uuid: string): void {
    this.persist(this._pedidos().filter((p) => p.uuid !== uuid));
  }
}
