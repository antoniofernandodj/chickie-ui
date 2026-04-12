import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ConfiguracaoDePedidosLoja, UpdateConfigPedidoRequest } from '../models';

@Injectable({ providedIn: 'root' })
export class ConfigPedidoService {
  private readonly http = inject(HttpClient);

  /** Buscar configuração de pedidos da loja */
  getConfigPedido(lojaUuid: string): Observable<ConfiguracaoDePedidosLoja> {
    return this.http.get<ConfiguracaoDePedidosLoja>(
      `${environment.apiUrl}/config-pedido/${lojaUuid}`,
    );
  }

  /** Salvar/atualizar configuração de pedidos da loja */
  saveConfigPedido(lojaUuid: string, body: UpdateConfigPedidoRequest): Observable<void> {
    return this.http.put<void>(
      `${environment.apiUrl}/config-pedido/${lojaUuid}`,
      body,
    );
  }
}
