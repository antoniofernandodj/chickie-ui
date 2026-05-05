import { Observable, EMPTY } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export interface ReconnectingWSOptions {
  logPrefix: string;
  baseDelay: number;
  maxDelay: number;
  filterFn?: (data: any) => boolean;
}

const defaults: ReconnectingWSOptions = {
  logPrefix: '[WS]',
  baseDelay: 2000,
  maxDelay: 30_000,
};

export function createReconnectingWS<T>(
  urlFn: () => string,
  normalizer: (data: any) => T,
  platformId: object,
  opts?: Partial<ReconnectingWSOptions>,
): Observable<T> {
  if (!isPlatformBrowser(platformId)) return EMPTY;

  const { logPrefix, baseDelay, maxDelay, filterFn } = { ...defaults, ...opts };

  return new Observable<T>(observer => {
    let ws: WebSocket | null = null;
    let active = true;
    let retryTimer: ReturnType<typeof setTimeout> | null = null;
    let retryDelay = baseDelay;

    const connect = () => {
      if (!active) return;
      const url = urlFn();
      console.log(`${logPrefix} Conectando...`);
      ws = new WebSocket(url);

      ws.onopen = () => {
        console.log(`${logPrefix} Conectado.`);
        retryDelay = baseDelay;
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (filterFn && !filterFn(data)) return;
          observer.next(normalizer(data));
        } catch { /* JSON inválido: ignorar */ }
      };

      ws.onerror = (err) => {
        console.error(`${logPrefix} Erro:`, err);
        ws?.close();
      };

      ws.onclose = (event) => {
        if (!active) {
          console.log(`${logPrefix} Conexão encerrada pelo cliente.`);
          return;
        }
        // Códigos 4000-4999 indicam fechamento intencional do servidor (ex: recurso não encontrado).
        if (event.code >= 4000) {
          console.warn(`${logPrefix} Servidor encerrou a conexão (${event.code}: ${event.reason}). Não reconectando.`);
          observer.complete();
          return;
        }
        console.warn(`${logPrefix} Conexão perdida. Tentando reconectar em ${retryDelay}ms...`);
        retryTimer = setTimeout(() => {
          retryDelay = Math.min(retryDelay * 1.5, maxDelay);
          connect();
        }, retryDelay);
      };
    };

    connect();

    return () => {
      console.log(`${logPrefix} Limpando observable (unsubscribed).`);
      active = false;
      if (retryTimer) clearTimeout(retryTimer);
      if (ws) {
        console.log(`${logPrefix} Fechando WebSocket (readyState: ${ws.readyState}).`);
        ws.close();
      }
    };
  });
}