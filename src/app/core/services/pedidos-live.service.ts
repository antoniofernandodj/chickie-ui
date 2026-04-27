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
      total: parseFloat(p.total),
      subtotal: parseFloat(p.subtotal),
      taxa_entrega: parseFloat(p.taxa_entrega ?? '0'),
      desconto: parseFloat(p.desconto ?? '0'),
      itens: (p.itens ?? []).map((item: any) => ({
        ...item,
        partes: (item.partes ?? []).map((parte: any) => ({
          ...parte,
          preco_unitario: parseFloat(parte.preco_unitario),
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
        ws = new WebSocket(url);

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data && typeof data === 'object' && !Array.isArray(data)) {
              observer.next(this.normalizar(data));
            }
          } catch { /* JSON inválido: ignorar */ }
        };

        ws.onerror = () => ws?.close();

        ws.onclose = () => {
          if (!active) return;
          retryTimer = setTimeout(() => {
            retryDelay = Math.min(retryDelay * 1.5, 30_000);
            connect();
          }, retryDelay);
        };
      };

      connect();

      return () => {
        active = false;
        if (retryTimer) clearTimeout(retryTimer);
        if (ws && ws.readyState < WebSocket.CLOSING) ws.close();
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
        ws = new WebSocket(url);

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (Array.isArray(data)) {
              observer.next(data.map(p => this.normalizar(p)));
            }
          } catch { /* JSON inválido: ignorar */ }
        };

        ws.onerror = () => ws?.close();

        ws.onclose = () => {
          if (!active) return;
          retryTimer = setTimeout(() => {
            retryDelay = Math.min(retryDelay * 1.5, 30_000);
            connect();
          }, retryDelay);
        };
      };

      connect();

      return () => {
        active = false;
        if (retryTimer) clearTimeout(retryTimer);
        if (ws && ws.readyState < WebSocket.CLOSING) ws.close();
      };
    });
  }
}
