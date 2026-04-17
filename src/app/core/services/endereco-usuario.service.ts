import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { chickie } from '@app/proto/generated';
import { ProtobufBaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class EnderecoUsuarioService extends ProtobufBaseService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/enderecos-usuario`;

  protected getProtoType(): any {
    return chickie.Endereco;
  }

  criar(body: chickie.IEnderecoRequest): Observable<chickie.IEndereco> {
    return this.postProto<chickie.IEndereco>(
      this.http,
      `${this.base}`,
      body,
      chickie.Endereco,
      chickie.EnderecoRequest
    );
  }

  listar(): Observable<chickie.IEndereco[]> {
    return this.getProto<chickie.IListarEnderecosResponse>(
      this.http,
      `${this.base}`,
      chickie.ListarEnderecosResponse
    ).pipe(map(res => res.enderecos || []));
  }

  buscar(uuid: string): Observable<chickie.IEndereco> {
    return this.getProto<chickie.IEndereco>(
      this.http,
      `${this.base}/${uuid}`,
      chickie.Endereco
    );
  }

  atualizar(
    uuid: string,
    body: chickie.IEnderecoRequest,
  ): Observable<chickie.IEndereco> {
    return this.putProto<chickie.IEndereco>(
      this.http,
      `${this.base}/${uuid}`,
      body,
      chickie.Endereco,
      chickie.EnderecoRequest
    );
  }

  deletar(uuid: string): Observable<chickie.IGenericResponse> {
    return this.deleteProto<chickie.IGenericResponse>(
      this.http,
      `${this.base}/${uuid}`,
      chickie.GenericResponse
    );
  }
}
