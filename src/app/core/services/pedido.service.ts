import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { chickie } from '@app/proto/generated';
import { ProtobufBaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class PedidoService extends ProtobufBaseService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/pedidos`;

  protected getProtoType(): any {
    return chickie.Pedido;
  }

  criar(body: chickie.ICriarPedidoRequest): Observable<chickie.IPedido> {
    return this.postProto<chickie.IPedido>(
      this.http,
      `${this.base}/criar`,
      body,
      chickie.Pedido,
      chickie.CriarPedidoRequest
    );
  }

  listar(): Observable<chickie.IPedido[]> {
    return this.getProto<chickie.IListarPedidosResponse>(
      this.http,
      `${this.base}/`,
      chickie.ListarPedidosResponse
    ).pipe(map(res => res.pedidos || []));
  }

  buscar(uuid: string): Observable<chickie.IPedido> {
    return this.getProto<chickie.IPedido>(
      this.http,
      `${this.base}/${uuid}`,
      chickie.Pedido
    );
  }

  listarPorLoja(lojaUuid: string): Observable<chickie.IPedido[]> {
    return this.getProto<chickie.IListarPedidosResponse>(
      this.http,
      `${this.base}/por-loja/${lojaUuid}`,
      chickie.ListarPedidosResponse
    ).pipe(map(res => res.pedidos || []));
  }

  buscarComEntrega(uuid: string): Observable<chickie.IPedidoComEntregaResponse> {
    return this.getProto<chickie.IPedidoComEntregaResponse>(
      this.http,
      `${this.base}/${uuid}/com-entrega`,
      chickie.PedidoComEntregaResponse
    );
  }

  atualizarStatus(
    uuid: string,
    body: chickie.IAtualizarStatusPedidoRequest,
  ): Observable<chickie.IPedidoStatusResponse> {
    return this.putProto<chickie.IPedidoStatusResponse>(
      this.http,
      `${this.base}/${uuid}/status`,
      body,
      chickie.PedidoStatusResponse,
      chickie.AtualizarStatusPedidoRequest
    );
  }
}
