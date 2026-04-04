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
} from '../models';

@Injectable({ providedIn: 'root' })
export class MarketingService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/marketing`;

  // ── Cupons ──────────────────────────────────────────────────────────────────

  criarCupom(lojaUuid: string, body: CreateCupomRequest): Observable<Cupom> {
    return this.http.post<Cupom>(`${this.base}/${lojaUuid}/cupons`, body);
  }

  listarCupons(): Observable<Cupom[]> {
    return this.http.get<Cupom[]>(`${this.base}/cupons`);
  }

  /** Público — valida cupom pelo código */
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
