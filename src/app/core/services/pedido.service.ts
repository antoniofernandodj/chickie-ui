import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  CreatePedidoRequest,
  CreatePedidoResponse,
  Pedido,
  PedidoComEntrega,
  StatusPedido,
  StatusPedidoResponse,
  UpdateStatusPedidoRequest,
} from '../models';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/pedidos`;

  // A API retorna status capitalizado ("Criado") e valores monetários como string ("80.33")
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

  criar(body: CreatePedidoRequest): Observable<CreatePedidoResponse> {
    return this.http.post<CreatePedidoResponse>(`${this.base}/criar`, body);
  }

  listar(): Observable<Pedido[]> {
    return this.http.get<any[]>(`${this.base}/meus`).pipe(
      map((lista) => lista.map((p) => this.normalizar(p))),
    );
  }

  avancar(uuid: string, isRetirada: boolean): Observable<StatusPedidoResponse> {
    return this.http.post<StatusPedidoResponse>(
      `${this.base}/${uuid}/avancar`,
      { is_retirada: isRetirada },
    );
  }

  cancelar(uuid: string): Observable<{ uuid: string; status: StatusPedido }> {
    return this.http.post<{ uuid: string; status: StatusPedido }>(
      `${this.base}/${uuid}/cancelar`,
      {},
    );
  }

  buscar(uuid: string): Observable<Pedido> {
    return this.http.get<any>(`${this.base}/${uuid}`).pipe(
      map((p) => this.normalizar(p)),
    );
  }

  buscarPorCodigo(codigo: string): Observable<Pedido> {
    return this.http.get<any>(`${this.base}/codigo/${codigo}`).pipe(
      map((p) => this.normalizar(p)),
    );
  }

  listarPorLoja(lojaUuid: string): Observable<Pedido[]> {
    return this.http.get<any[]>(`${this.base}/por-loja/${lojaUuid}`).pipe(
      map((lista) => lista.map((p) => this.normalizar(p))),
    );
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
