import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AvaliacaoDeLoja,
  AvaliacaoDeProduto,
  AvaliarLojaRequest,
  AvaliarProdutoRequest,
  CreateCupomRequest,
  CreatePromocaoRequest,
  Cupom,
  Promocao,
  UpdateCupomRequest,
} from '../models';

@Injectable({ providedIn: 'root' })
export class MarketingService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/marketing`;

  // ── Cupons ──────────────────────────────────────────────────────────────────

  /** Lista todos os cupons (todas as lojas) */
  listarCupons(): Observable<Cupom[]> {
    return this.http.get<Cupom[]>(`${environment.apiUrl}/cupons`);
  }

  /** Busca cupom por UUID */
  buscarCupom(uuid: string): Observable<Cupom> {
    return this.http.get<Cupom>(`${environment.apiUrl}/cupons/${uuid}`);
  }

  /** Cria cupom genérico com loja_uuid no body */
  criarCupom(body: CreateCupomRequest & { loja_uuid: string }): Observable<Cupom> {
    return this.http.post<Cupom>(`${environment.apiUrl}/cupons`, body);
  }

  /** Atualiza cupom por UUID */
  atualizarCupom(uuid: string, body: UpdateCupomRequest): Observable<Cupom> {
    return this.http.put<Cupom>(`${environment.apiUrl}/cupons/${uuid}`, body);
  }

  /** Atualiza status do cupom (ativar/inativar) */
  atualizarStatusCupom(uuid: string, ativo: boolean): Observable<void> {
    return this.http.patch<void>(`${environment.apiUrl}/cupons/${uuid}/status`, { ativo });
  }

  /** Deleta cupom por UUID */
  deletarCupom(uuid: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/cupons/${uuid}`);
  }

  /** Público — valida cupom pelo código (rota legada) */
  validarCupom(codigo: string): Observable<Cupom> {
    return this.http.get<Cupom>(`${this.base}/cupons/${codigo}`);
  }

  // ── Avaliações de Loja ──────────────────────────────────────────────────────

  /** Criar ou atualizar avaliação de loja (upsert) */
  avaliarLoja(
    lojaUuid: string,
    body: AvaliarLojaRequest,
  ): Observable<AvaliacaoDeLoja> {
    return this.http.post<AvaliacaoDeLoja>(
      `${this.base}/${lojaUuid}/avaliar-loja`,
      body,
    );
  }

  /** Listar todas as avaliações de uma loja (uso admin/loja) */
  listarAvaliacoesLoja(lojaUuid: string): Observable<AvaliacaoDeLoja[]> {
    return this.http.get<AvaliacaoDeLoja[]>(
      `${this.base}/${lojaUuid}/avaliacoes-loja`,
    );
  }

  /** Buscar avaliação de loja por UUID */
  buscarAvaliacaoLoja(uuid: string): Observable<AvaliacaoDeLoja> {
    return this.http.get<AvaliacaoDeLoja>(
      `${this.base}/avaliacoes-loja/${uuid}`,
    );
  }

  /** Atualizar avaliação de loja por UUID */
  atualizarAvaliacaoLoja(
    uuid: string,
    body: AvaliarLojaRequest,
  ): Observable<AvaliacaoDeLoja> {
    return this.http.put<AvaliacaoDeLoja>(
      `${this.base}/avaliacoes-loja/${uuid}`,
      body,
    );
  }

  /** Deletar avaliação de loja por UUID */
  deletarAvaliacaoLoja(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/avaliacoes-loja/${uuid}`);
  }

  /**
   * Upsert: cria ou atualiza avaliação de loja do usuário.
   * Se o usuário já tem avaliação, atualiza; caso contrário, cria.
   */
  upsertAvaliacaoLoja(
    lojaUuid: string,
    body: AvaliarLojaRequest,
    avaliacaoExistente?: AvaliacaoDeLoja,
  ): Observable<AvaliacaoDeLoja> {
    if (avaliacaoExistente) {
      return this.atualizarAvaliacaoLoja(avaliacaoExistente.uuid, body);
    }
    return this.avaliarLoja(lojaUuid, body);
  }

  // ── Avaliações de Produto ───────────────────────────────────────────────────

  /** Criar avaliação de produto */
  avaliarProduto(
    lojaUuid: string,
    body: AvaliarProdutoRequest,
  ): Observable<AvaliacaoDeProduto> {
    return this.http.post<AvaliacaoDeProduto>(
      `${this.base}/${lojaUuid}/avaliar-produto`,
      body,
    );
  }

  /** Listar todas as avaliações de produto de uma loja */
  listarAvaliacoesProduto(lojaUuid: string): Observable<AvaliacaoDeProduto[]> {
    return this.http.get<AvaliacaoDeProduto[]>(
      `${this.base}/${lojaUuid}/avaliacoes-produto`,
    );
  }

  /** Listar avaliações de produto por produto específico */
  listarAvaliacoesProdutoPorProduto(produtoUuid: string): Observable<AvaliacaoDeProduto[]> {
    return this.http.get<AvaliacaoDeProduto[]>(
      `${this.base}/avaliacoes-produto/produto/${produtoUuid}`,
    );
  }

  /** Buscar avaliação de produto por UUID */
  buscarAvaliacaoProduto(uuid: string): Observable<AvaliacaoDeProduto> {
    return this.http.get<AvaliacaoDeProduto>(
      `${this.base}/avaliacoes-produto/${uuid}`,
    );
  }

  /** Atualizar avaliação de produto por UUID */
  atualizarAvaliacaoProduto(
    uuid: string,
    body: AvaliarProdutoRequest,
  ): Observable<AvaliacaoDeProduto> {
    return this.http.put<AvaliacaoDeProduto>(
      `${this.base}/avaliacoes-produto/${uuid}`,
      body,
    );
  }

  /** Deletar avaliação de produto por UUID */
  deletarAvaliacaoProduto(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/avaliacoes-produto/${uuid}`);
  }

  // ── Promoções ───────────────────────────────────────────────────────────────

  criarPromocao(
    lojaUuid: string,
    body: CreatePromocaoRequest,
  ): Observable<Promocao> {
    return this.http.post<Promocao>(
      `${this.base}/${lojaUuid}/promocoes`,
      body,
    );
  }

  listarPromocoes(lojaUuid: string): Observable<Promocao[]> {
    return this.http.get<Promocao[]>(`${this.base}/${lojaUuid}/promocoes`);
  }

  atualizarPromocao(
    lojaUuid: string,
    uuid: string,
    body: CreatePromocaoRequest,
  ): Observable<void> {
    return this.http.put<void>(
      `${this.base}/${lojaUuid}/promocoes/${uuid}`,
      body,
    );
  }

  deletarPromocao(lojaUuid: string, uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${lojaUuid}/promocoes/${uuid}`);
  }
}
