import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { chickie } from '@app/proto/generated';
import { ProtobufBaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class CatalogoService extends ProtobufBaseService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/catalogo`;
  private readonly prodBase = `${environment.apiUrl}/produtos`;

  protected getProtoType(): any {
    return chickie.Categoria; // Default type, though this service uses many
  }

  // ── Adicionais ──────────────────────────────────────────────────────────────

  criarAdicional(
    lojaUuid: string,
    body: chickie.ICreateAdicionalRequest,
  ): Observable<chickie.IAdicional> {
    return this.postProto<chickie.IAdicional>(
      this.http,
      `${this.base}/${lojaUuid}/adicionais`,
      body,
      chickie.Adicional,
      chickie.CreateAdicionalRequest
    );
  }

  listarAdicionais(lojaUuid: string): Observable<chickie.IAdicional[]> {
    return this.getProto<chickie.IListarAdicionaisResponse>(
      this.http,
      `${this.base}/${lojaUuid}/adicionais`,
      chickie.ListarAdicionaisResponse
    ).pipe(map(res => res.adicionais || []));
  }

  listarAdicionaisDisponiveis(lojaUuid: string): Observable<chickie.IAdicional[]> {
    return this.getProto<chickie.IListarAdicionaisResponse>(
      this.http,
      `${this.base}/${lojaUuid}/adicionais/disponiveis`,
      chickie.ListarAdicionaisResponse
    ).pipe(map(res => res.adicionais || []));
  }

  toggleDisponibilidadeAdicional(
    lojaUuid: string,
    adicionalUuid: string,
    disponivel: boolean,
  ): Observable<chickie.IGenericResponse> {
    return this.putProto<chickie.IGenericResponse>(
      this.http,
      `${this.base}/${lojaUuid}/adicionais/${adicionalUuid}/disponibilidade`,
      { disponivel },
      chickie.GenericResponse,
      chickie.AtualizarDisponibilidadeRequest
    );
  }

  atualizarAdicional(
    lojaUuid: string,
    adicionalUuid: string,
    body: chickie.IUpdateAdicionalRequest,
  ): Observable<chickie.IAdicional> {
    return this.putProto<chickie.IAdicional>(
      this.http,
      `${this.base}/${lojaUuid}/adicionais/${adicionalUuid}`,
      body,
      chickie.Adicional,
      chickie.UpdateAdicionalRequest
    );
  }

  deletarAdicional(
    lojaUuid: string,
    adicionalUuid: string,
  ): Observable<chickie.IGenericResponse> {
    return this.deleteProto<chickie.IGenericResponse>(
      this.http,
      `${this.base}/${lojaUuid}/adicionais/${adicionalUuid}`,
      chickie.GenericResponse
    );
  }

  // ── Categorias ──────────────────────────────────────────────────────────────

  criarCategoria(
    lojaUuid: string,
    body: chickie.ICreateCategoriaRequest,
  ): Observable<chickie.ICategoria> {
    return this.postProto<chickie.ICategoria>(
      this.http,
      `${this.base}/${lojaUuid}/categorias`,
      body,
      chickie.Categoria,
      chickie.CreateCategoriaRequest
    );
  }

  listarCategorias(lojaUuid: string): Observable<chickie.ICategoria[]> {
    return this.getProto<chickie.IListarCategoriasResponse>(
      this.http,
      `${this.base}/${lojaUuid}/categorias`,
      chickie.ListarCategoriasResponse
    ).pipe(map(res => res.categorias || []));
  }

  atualizarCategoria(
    lojaUuid: string,
    categoriaUuid: string,
    body: chickie.IUpdateCategoriaRequest,
  ): Observable<chickie.ICategoria> {
    return this.putProto<chickie.ICategoria>(
      this.http,
      `${this.base}/${lojaUuid}/categorias/${categoriaUuid}`,
      body,
      chickie.Categoria,
      chickie.UpdateCategoriaRequest
    );
  }

  deletarCategoria(
    lojaUuid: string,
    categoriaUuid: string,
  ): Observable<chickie.IGenericResponse> {
    return this.deleteProto<chickie.IGenericResponse>(
      this.http,
      `${this.base}/${lojaUuid}/categorias/${categoriaUuid}`,
      chickie.GenericResponse
    );
  }

  // ── Produtos ────────────────────────────────────────────────────────────────

  criarProduto(body: chickie.ICreateProdutoRequest): Observable<chickie.IProduto> {
    return this.postProto<chickie.IProduto>(
      this.http,
      this.prodBase,
      body,
      chickie.Produto,
      chickie.CreateProdutoRequest
    );
  }

  atualizarProduto(uuid: string, body: chickie.IAtualizarProdutoRequest): Observable<chickie.IProduto> {
    return this.putProto<chickie.IProduto>(
      this.http,
      `${this.prodBase}/${uuid}`,
      body,
      chickie.Produto,
      chickie.AtualizarProdutoRequest
    );
  }

  listarProdutos(): Observable<chickie.IProduto[]> {
    return this.getProto<chickie.IListarProdutosResponse>(
      this.http,
      this.prodBase,
      chickie.ListarProdutosResponse
    ).pipe(map(res => res.produtos || []));
  }

  listarProdutosPorLoja(lojaUuid: string): Observable<chickie.IProduto[]> {
    return this.getProto<chickie.IListarProdutosResponse>(
      this.http,
      `${this.prodBase}/listar/${lojaUuid}`,
      chickie.ListarProdutosResponse
    ).pipe(map(res => res.produtos || []));
  }

  listarProdutosPorCategoria(categoriaUuid: string): Observable<chickie.IProduto[]> {
    return this.getProto<chickie.IListarProdutosResponse>(
      this.http,
      `${this.prodBase}/categoria/${categoriaUuid}`,
      chickie.ListarProdutosResponse
    ).pipe(map(res => res.produtos || []));
  }

  buscarProduto(uuid: string): Observable<chickie.IProduto> {
    return this.getProto<chickie.IProduto>(
      this.http,
      `${this.prodBase}/${uuid}`,
      chickie.Produto
    );
  }

  uploadImagemProduto(produtoUuid: string, file: File): Observable<chickie.ISubirImagemResponse> {
    const formData = new FormData();
    formData.append('file', file);
    // FormData doesn't use Protobuf for the request body, but the response is Protobuf
    return this.http.post(`${this.prodBase}/${produtoUuid}/imagem`, formData, {
      responseType: 'arraybuffer'
    }).pipe(
      map(buffer => this.deserialize<chickie.ISubirImagemResponse>(new Uint8Array(buffer), chickie.SubirImagemResponse))
    );
  }

  deletarProduto(uuid: string): Observable<chickie.IGenericResponse> {
    return this.deleteProto<chickie.IGenericResponse>(
      this.http,
      `${this.prodBase}/${uuid}`,
      chickie.GenericResponse
    );
  }

  toggleDisponibilidadeProduto(
    lojaUuid: string,
    produtoUuid: string,
    disponivel: boolean,
  ): Observable<chickie.IGenericResponse> {
    return this.putProto<chickie.IGenericResponse>(
      this.http,
      `${this.prodBase}/${lojaUuid}/${produtoUuid}/disponibilidade`,
      { disponivel },
      chickie.GenericResponse,
      chickie.AtualizarDisponibilidadeRequest
    );
  }
}
