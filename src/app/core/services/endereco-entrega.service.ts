import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EnderecoEntrega, EnderecoEntregaInput } from '../models';

@Injectable({ providedIn: 'root' })
export class EnderecoEntregaService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/enderecos-entrega`;

  criar(
    pedidoUuid: string,
    lojaUuid: string,
    body: EnderecoEntregaInput,
  ): Observable<EnderecoEntrega> {
    return this.http.post<EnderecoEntrega>(
      `${this.base}/${pedidoUuid}/${lojaUuid}`,
      body,
    );
  }

  buscarPorPedido(pedidoUuid: string): Observable<EnderecoEntrega> {
    return this.http.get<EnderecoEntrega>(`${this.base}/${pedidoUuid}`);
  }

  listarPorLoja(lojaUuid: string): Observable<EnderecoEntrega[]> {
    return this.http.get<EnderecoEntrega[]>(`${this.base}/${lojaUuid}/loja`);
  }
}
