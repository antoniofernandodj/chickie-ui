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

  // ── Avaliações ──────────────────────────────────────────────────────────────

  avaliarLoja(
    lojaUuid: string,
    body: AvaliarLojaRequest,
  ): Observable<AvaliacaoDeLoja> {
    return this.http.post<AvaliacaoDeLoja>(
      `${this.base}/${lojaUuid}/avaliar-loja`,
      body,
    );
  }

  avaliarProduto(
    lojaUuid: string,
    body: AvaliarProdutoRequest,
  ): Observable<AvaliacaoDeProduto> {
    return this.http.post<AvaliacaoDeProduto>(
      `${this.base}/${lojaUuid}/avaliar-produto`,
      body,
    );
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
