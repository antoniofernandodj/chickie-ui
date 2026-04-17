import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { chickie } from '@app/proto/generated';
import { ProtobufBaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class ConfigPedidoService extends ProtobufBaseService {
  private readonly http = inject(HttpClient);

  protected getProtoType(): any {
    return chickie.ConfigPedido;
  }

  /** Buscar configuração de pedidos da loja */
  getConfigPedido(lojaUuid: string): Observable<chickie.IConfigPedido> {
    return this.getProto<chickie.IConfigPedido>(
      this.http,
      `${environment.apiUrl}/config-pedido/${lojaUuid}`,
      chickie.ConfigPedido
    );
  }

  /** Salvar/atualizar configuração de pedidos da loja */
  saveConfigPedido(lojaUuid: string, body: chickie.ISalvarConfigPedidoRequest): Observable<chickie.IGenericResponse> {
    return this.putProto<chickie.IGenericResponse>(
      this.http,
      `${environment.apiUrl}/config-pedido/${lojaUuid}`,
      body,
      chickie.GenericResponse,
      chickie.SalvarConfigPedidoRequest
    );
  }
}
