import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateMensagemRequest, MensagemChat } from '../models';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;
  
  private socket$: WebSocketSubject<MensagemChat> | null = null;
  private readonly messagesSubject = new Subject<MensagemChat>();
  public readonly messages$ = this.messagesSubject.asObservable();

  /**
   * Conecta ao WebSocket do chat
   */
  public connect(token: string): void {
    if (this.socket$) {
      this.close();
    }

    // Converte https://api.../api para wss://api.../api/chat/ws
    const wsProtocol = this.baseUrl.startsWith('https') ? 'wss' : 'ws';
    const wsUrl = `${this.baseUrl.replace(/^https?/, wsProtocol)}/chat/ws?token=${token}`;

    this.socket$ = webSocket<MensagemChat>({
      url: wsUrl,
      // O backend Axum pode fechar a conexão se não houver atividade, 
      // mas o webSocket do RxJS já trata reconexão se configurado.
    });

    this.socket$.subscribe({
      next: (msg) => this.messagesSubject.next(msg),
      error: (err) => {
        console.error('Chat WebSocket Error:', err);
        // Tentar reconectar após 5 segundos se houver erro
        setTimeout(() => this.connect(token), 5000);
      },
      complete: () => console.warn('Chat WebSocket Connection Closed')
    });
  }

  /**
   * Envia uma mensagem via WebSocket
   */
  public sendMessage(msg: CreateMensagemRequest): void {
    if (this.socket$) {
      this.socket$.next(msg as any);
    } else {
      console.error('Chat WebSocket is not connected');
    }
  }

  /**
   * Fecha a conexão WebSocket
   */
  public close(): void {
    if (this.socket$) {
      this.socket$.complete();
      this.socket$ = null;
    }
  }

  /**
   * Busca o histórico de mensagens de um pedido
   */
  public getHistoricoPedido(pedidoUuid: string): Observable<MensagemChat[]> {
    return this.http.get<MensagemChat[]>(`${this.baseUrl}/chat/historico/pedido/${pedidoUuid}`);
  }

  /**
   * Busca o histórico de mensagens geral entre loja e usuário
   */
  public getHistoricoGeral(lojaUuid: string, usuarioUuid: string): Observable<MensagemChat[]> {
    return this.http.get<MensagemChat[]>(`${this.baseUrl}/chat/historico/loja/${lojaUuid}/usuario/${usuarioUuid}`);
  }

  /**
   * Marca uma mensagem como lida
   */
  public marcarComoLida(mensagemUuid: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/chat/mensagens/${mensagemUuid}/lida`, {});
  }
}
