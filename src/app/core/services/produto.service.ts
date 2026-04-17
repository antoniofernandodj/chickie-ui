import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { chickie } from '@app/proto/generated';
import { ProtobufBaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class ProdutoService extends ProtobufBaseService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/produtos`;

  protected getProtoType(): any {
    return chickie.Produto;
  }

  criar(body: chickie.ICreateProdutoRequest): Observable<chickie.IProduto> {
    return this.postProto<chickie.IProduto>(
      this.http,
      `${this.base}/`,
      body,
      chickie.Produto,
      chickie.CreateProdutoRequest
    );
  }

  listar(): Observable<chickie.IProduto[]> {
    return this.getProto<chickie.IListarProdutosResponse>(
      this.http,
      `${this.base}/`,
      chickie.ListarProdutosResponse
    ).pipe(map(res => res.produtos || []));
  }

  listarPorLoja(lojaUuid: string): Observable<chickie.IProduto[]> {
    return this.getProto<chickie.IListarProdutosResponse>(
      this.http,
      `${this.base}/listar/${lojaUuid}`,
      chickie.ListarProdutosResponse
    ).pipe(map(res => res.produtos || []));
  }

  buscar(uuid: string): Observable<chickie.IProduto> {
    return this.getProto<chickie.IProduto>(
      this.http,
      `${this.base}/${uuid}`,
      chickie.Produto
    );
  }

  atualizar(uuid: string, body: chickie.IAtualizarProdutoRequest): Observable<chickie.IProduto> {
    return this.putProto<chickie.IProduto>(
      this.http,
      `${this.base}/${uuid}`,
      body,
      chickie.Produto,
      chickie.AtualizarProdutoRequest
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
