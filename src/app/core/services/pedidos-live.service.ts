import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, EMPTY } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Pedido, StatusPedido } from '../models';


@Injectable({ providedIn: 'root' })
export class PedidosLiveService {
  private readonly platformId = inject(PLATFORM_ID);

  private wsUrl(lojaUuid: string, status: StatusPedido, token: string): string {
    const base = environment.apiUrl.replace(/^https/, 'wss').replace(/^http$/, 'ws');
    return `${base}/pedidos/por-loja/${lojaUuid}/ws?status=${status}&token=${encodeURIComponent(token)}`;
  }

  private normalizar(p: any): Pedido {
    return {
      ...p,
      status: (p.status as string).toLowerCase() as StatusPedido,
      total:        typeof p.total        === 'string' ? parseFloat(p.total)              : (p.total        ?? 0),
      subtotal:     typeof p.subtotal     === 'string' ? parseFloat(p.subtotal)           : (p.subtotal     ?? 0),
      taxa_entrega: typeof p.taxa_entrega === 'string' ? parseFloat(p.taxa_entrega ?? '0'): (p.taxa_entrega ?? 0),
      desconto:     typeof p.desconto     === 'string' ? parseFloat(p.desconto     ?? '0'): (p.desconto     ?? 0),
      itens: (p.itens ?? []).map((item: any) => ({
        ...item,
        partes: (item.partes ?? []).map((parte: any) => ({
          ...parte,
          preco_unitario: typeof parte.preco_unitario === 'string'
            ? parseFloat(parte.preco_unitario)
            : (parte.preco_unitario ?? 0),
          adicionais: (parte.adicionais ?? []).map((ad: any) => ({
            ...ad,
            preco: typeof ad.preco === 'string' ? parseFloat(ad.preco) : (ad.preco ?? 0),
          })),
        })),
      })),
    };
  }

  acompanharPorCodigo(codigo: string): Observable<Pedido> {
    if (!isPlatformBrowser(this.platformId)) return EMPTY;

    const url = `${environment.apiUrl.replace(/^https/, 'wss').replace(/^http$/, 'ws')}/pedidos/codigo/${encodeURIComponent(codigo)}/ws`;

    return new Observable<Pedido>(observer => {
      let ws: WebSocket | null = null;
      let active = true;
      let retryTimer: ReturnType<typeof setTimeout> | null = null;
      let retryDelay = 2000;

      const connect = () => {
        if (!active) return;
        console.log(`[WS] Conectando ao pedido: ${codigo}...`);
        ws = new WebSocket(url);

        ws.onopen = () => {
          console.log(`[WS] Conectado: ${codigo}`);
          retryDelay = 2000;
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data && typeof data === 'object' && !Array.isArray(data)) {
              observer.next(this.normalizar(data));
            }
          } catch { /* JSON inválido: ignorar */ }
        };

        ws.onerror = (err) => {
          console.error(`[WS] Erro no pedido ${codigo}:`, err);
          ws?.close();
        };

        ws.onclose = () => {
          if (!active) {
            console.log(`[WS] Conexão encerrada pelo cliente: ${codigo}`);
            return;
          }
          console.warn(`[WS] Conexão perdida: ${codigo}. Tentando reconectar em ${retryDelay}ms...`);
          retryTimer = setTimeout(() => {
            retryDelay = Math.min(retryDelay * 1.5, 30_000);
            connect();
          }, retryDelay);
        };
      };

      connect();

      return () => {
        console.log(`[WS] Limpando observable (unsubscribed): ${codigo}`);
        active = false;
        if (retryTimer) clearTimeout(retryTimer);
        if (ws) {
          console.log(`[WS] Fechando WebSocket: ${codigo} (readyState: ${ws.readyState})`);
          ws.close();
        }
      };
    });
  }

  conectar(lojaUuid: string, status: StatusPedido, token: string): Observable<Pedido[]> {
    if (!isPlatformBrowser(this.platformId)) return EMPTY;

    const url = this.wsUrl(lojaUuid, status, token);

    return new Observable<Pedido[]>(observer => {
      let ws: WebSocket | null = null;
      let active = true;
      let retryTimer: ReturnType<typeof setTimeout> | null = null;
      let retryDelay = 2000;

      const connect = () => {
        if (!active) return;
        console.log(`[WS Admin] Conectando à loja: ${lojaUuid}...`);
        ws = new WebSocket(url);

        ws.onopen = () => {
          console.log(`[WS Admin] Conectado: ${lojaUuid}`);
          retryDelay = 2000;
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (Array.isArray(data)) {
              observer.next(data.map(p => this.normalizar(p)));
            }
          } catch { /* JSON inválido: ignorar */ }
        };

        ws.onerror = (err) => {
          console.error(`[WS Admin] Erro na loja ${lojaUuid}:`, err);
          ws?.close();
        };

        ws.onclose = () => {
          if (!active) {
            console.log(`[WS Admin] Conexão encerrada pelo cliente: ${lojaUuid}`);
            return;
          }
          console.warn(`[WS Admin] Conexão perdida: ${lojaUuid}. Tentando reconectar em ${retryDelay}ms...`);
          retryTimer = setTimeout(() => {
            retryDelay = Math.min(retryDelay * 1.5, 30_000);
            connect();
          }, retryDelay);
        };
      };

      connect();

      return () => {
        console.log(`[WS Admin] Limpando observable (unsubscribed): ${lojaUuid}`);
        active = false;
        if (retryTimer) clearTimeout(retryTimer);
        if (ws) {
          console.log(`[WS Admin] Fechando WebSocket: ${lojaUuid} (readyState: ${ws.readyState})`);
          ws.close();
        }
      };
    });
  }
}
