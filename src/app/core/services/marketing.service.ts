import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { chickie } from '@app/proto/generated';
import { ProtobufBaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class MarketingService extends ProtobufBaseService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/marketing`;

  protected getProtoType(): any {
    return chickie.Cupom;
  }

  // ── Cupons ──────────────────────────────────────────────────────────────────

  /** Lista todos os cupons (todas as lojas) */
  listarCupons(): Observable<chickie.ICupom[]> {
    return this.getProto<chickie.IListarCuponsResponse>(
      this.http,
      `${environment.apiUrl}/cupons`,
      chickie.ListarCuponsResponse
    ).pipe(map(res => res.cupons || []));
  }

  /** Busca cupom por UUID */
  buscarCupom(uuid: string): Observable<chickie.ICupom> {
    return this.getProto<chickie.ICupom>(
      this.http,
      `${environment.apiUrl}/cupons/${uuid}`,
      chickie.Cupom
    );
  }

  /** Cria cupom genérico com loja_uuid no body */
  criarCupom(body: chickie.ICriarCupomGenericoRequest): Observable<chickie.ICupom> {
    return this.postProto<chickie.ICupom>(
      this.http,
      `${environment.apiUrl}/cupons`,
      body,
      chickie.Cupom,
      chickie.CriarCupomGenericoRequest
    );
  }

  /** Atualiza cupom por UUID */
  atualizarCupom(uuid: string, body: chickie.IAtualizarCupomRequest): Observable<chickie.ICupom> {
    return this.putProto<chickie.ICupom>(
      this.http,
      `${environment.apiUrl}/cupons/${uuid}`,
      body,
      chickie.Cupom,
      chickie.AtualizarCupomRequest
    );
  }

  /** Atualiza status do cupom (ativar/inativar) */
  atualizarStatusCupom(uuid: string, ativo: boolean): Observable<chickie.IGenericResponse> {
    return this.patchProto<chickie.IGenericResponse>(
      this.http,
      `${environment.apiUrl}/cupons/${uuid}/status`,
      { ativo },
      chickie.GenericResponse,
      chickie.AtualizarStatusCupomRequest
    );
  }

  /** Deleta cupom por UUID */
  deletarCupom(uuid: string): Observable<chickie.IGenericResponse> {
    return this.deleteProto<chickie.IGenericResponse>(
      this.http,
      `${environment.apiUrl}/cupons/${uuid}`,
      chickie.GenericResponse
    );
  }

  /** Público — valida cupom pelo código (rota legada) */
  validarCupom(codigo: string): Observable<chickie.ICupom> {
    return this.getProto<chickie.ICupom>(
      this.http,
      `${this.base}/cupons/${codigo}`,
      chickie.Cupom
    );
  }

  // ── Avaliações de Loja ──────────────────────────────────────────────────────

  /** Criar ou atualizar avaliação de loja (upsert) */
  avaliarLoja(
    lojaUuid: string,
    body: chickie.IAvaliarLojaRequest,
  ): Observable<chickie.IAvaliacaoLoja> {
    return this.postProto<chickie.IAvaliacaoLoja>(
      this.http,
      `${this.base}/${lojaUuid}/avaliar-loja`,
      body,
      chickie.AvaliacaoLoja,
      chickie.AvaliarLojaRequest
    );
  }

  /** Listar todas as avaliações de uma loja (uso admin/loja) */
  listarAvaliacoesLoja(lojaUuid: string): Observable<chickie.IAvaliacaoLoja[]> {
    return this.getProto<chickie.IListarAvaliacoesLojaResponse>(
      this.http,
      `${this.base}/${lojaUuid}/avaliacoes-loja`,
      chickie.ListarAvaliacoesLojaResponse
    ).pipe(map(res => res.avaliacoes || []));
  }

  /** Buscar avaliação de loja por UUID */
  buscarAvaliacaoLoja(uuid: string): Observable<chickie.IAvaliacaoLoja> {
    return this.getProto<chickie.IAvaliacaoLoja>(
      this.http,
      `${this.base}/avaliacoes-loja/${uuid}`,
      chickie.AvaliacaoLoja
    );
  }

  /** Atualizar avaliação de loja por UUID */
  atualizarAvaliacaoLoja(
    uuid: string,
    body: chickie.IAtualizarAvaliacaoLojaRequest,
  ): Observable<chickie.IAvaliacaoLoja> {
    return this.putProto<chickie.IAvaliacaoLoja>(
      this.http,
      `${this.base}/avaliacoes-loja/${uuid}`,
      body,
      chickie.AvaliacaoLoja,
      chickie.AtualizarAvaliacaoLojaRequest
    );
  }

  /** Deletar avaliação de loja por UUID */
  deletarAvaliacaoLoja(uuid: string): Observable<chickie.IGenericResponse> {
    return this.deleteProto<chickie.IGenericResponse>(
      this.http,
      `${this.base}/avaliacoes-loja/${uuid}`,
      chickie.GenericResponse
    );
  }

  /**
   * Upsert: cria ou atualiza avaliação de loja do usuário.
   */
  upsertAvaliacaoLoja(
    lojaUuid: string,
    body: chickie.IAvaliarLojaRequest,
    avaliacaoExistente?: chickie.IAvaliacaoLoja,
  ): Observable<chickie.IAvaliacaoLoja> {
    if (avaliacaoExistente && avaliacaoExistente.uuid) {
      return this.atualizarAvaliacaoLoja(avaliacaoExistente.uuid, body);
    }
    return this.avaliarLoja(lojaUuid, body);
  }

  // ── Avaliações de Produto ───────────────────────────────────────────────────

  /** Criar avaliação de produto */
  avaliarProduto(
    lojaUuid: string,
    body: chickie.IAvaliarProdutoRequest,
  ): Observable<chickie.IAvaliacaoProduto> {
    return this.postProto<chickie.IAvaliacaoProduto>(
      this.http,
      `${this.base}/${lojaUuid}/avaliar-produto`,
      body,
      chickie.AvaliacaoProduto,
      chickie.AvaliarProdutoRequest
    );
  }

  /** Listar todas as avaliações de produto de uma loja */
  listarAvaliacoesProduto(lojaUuid: string): Observable<chickie.IAvaliacaoProduto[]> {
    return this.getProto<chickie.IListarAvaliacoesProdutoResponse>(
      this.http,
      `${this.base}/${lojaUuid}/avaliacoes-produto`,
      chickie.ListarAvaliacoesProdutoResponse
    ).pipe(map(res => res.avaliacoes || []));
  }

  /** Listar avaliações de produto por produto específico */
  listarAvaliacoesProdutoPorProduto(produtoUuid: string): Observable<chickie.IAvaliacaoProduto[]> {
    return this.getProto<chickie.IListarAvaliacoesProdutoResponse>(
      this.http,
      `${this.base}/avaliacoes-produto/produto/${produtoUuid}`,
      chickie.ListarAvaliacoesProdutoResponse
    ).pipe(map(res => res.avaliacoes || []));
  }

  /** Buscar avaliação de produto por UUID */
  buscarAvaliacaoProduto(uuid: string): Observable<chickie.IAvaliacaoProduto> {
    return this.getProto<chickie.IAvaliacaoProduto>(
      this.http,
      `${this.base}/avaliacoes-produto/${uuid}`,
      chickie.AvaliacaoProduto
    );
  }

  /** Atualizar avaliação de produto por UUID */
  atualizarAvaliacaoProduto(
    uuid: string,
    body: chickie.IAtualizarAvaliacaoProdutoRequest,
  ): Observable<chickie.IAvaliacaoProduto> {
    return this.putProto<chickie.IAvaliacaoProduto>(
      this.http,
      `${this.base}/avaliacoes-produto/${uuid}`,
      body,
      chickie.AvaliacaoProduto,
      chickie.AtualizarAvaliacaoProdutoRequest
    );
  }

  /** Deletar avaliação de produto por UUID */
  deletarAvaliacaoProduto(uuid: string): Observable<chickie.IGenericResponse> {
    return this.deleteProto<chickie.IGenericResponse>(
      this.http,
      `${this.base}/avaliacoes-produto/${uuid}`,
      chickie.GenericResponse
    );
  }

  // ── Promoções ───────────────────────────────────────────────────────────────

  criarPromocao(
    lojaUuid: string,
    body: chickie.ICriarPromocaoRequest,
  ): Observable<chickie.IPromocao> {
    return this.postProto<chickie.IPromocao>(
      this.http,
      `${this.base}/${lojaUuid}/promocoes`,
      body,
      chickie.Promocao,
      chickie.CriarPromocaoRequest
    );
  }

  listarPromocoes(lojaUuid: string): Observable<chickie.IPromocao[]> {
    return this.getProto<chickie.IListarPromocoesResponse>(
      this.http,
      `${this.base}/${lojaUuid}/promocoes`,
      chickie.ListarPromocoesResponse
    ).pipe(map(res => res.promocoes || []));
  }

  atualizarPromocao(
    lojaUuid: string,
    uuid: string,
    body: chickie.IAtualizarPromocaoRequest,
  ): Observable<chickie.IGenericResponse> {
    return this.putProto<chickie.IGenericResponse>(
      this.http,
      `${this.base}/${lojaUuid}/promocoes/${uuid}`,
      body,
      chickie.GenericResponse,
      chickie.AtualizarPromocaoRequest
    );
  }

  deletarPromocao(lojaUuid: string, uuid: string): Observable<chickie.IGenericResponse> {
    return this.deleteProto<chickie.IGenericResponse>(
      this.http,
      `${this.base}/${lojaUuid}/promocoes/${uuid}`,
      chickie.GenericResponse
    );
  }
}
