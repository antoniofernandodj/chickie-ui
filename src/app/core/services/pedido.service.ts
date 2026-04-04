import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  CreatePedidoRequest,
  CreatePedidoResponse,
  Pedido,
  PedidoComEntrega,
  StatusPedidoResponse,
  UpdateStatusPedidoRequest,
} from '../models';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/pedidos`;

  criar(body: CreatePedidoRequest): Observable<CreatePedidoResponse> {
    return this.http.post<CreatePedidoResponse>(`${this.base}/criar`, body);
  }

  listar(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.base}/listar`);
  }

  buscar(uuid: string): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.base}/${uuid}`);
  }

  listarPorLoja(lojaUuid: string): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.base}/por-loja/${lojaUuid}`);
  }

  buscarComEntrega(uuid: string): Observable<PedidoComEntrega> {
    return this.http.get<PedidoComEntrega>(`${this.base}/${uuid}/com-entrega`);
  }

  atualizarStatus(
    uuid: string,
    body: UpdateStatusPedidoRequest,
  ): Observable<StatusPedidoResponse> {
    return this.http.put<StatusPedidoResponse>(
      `${this.base}/${uuid}/status`,
      body,
    );
  }
}
