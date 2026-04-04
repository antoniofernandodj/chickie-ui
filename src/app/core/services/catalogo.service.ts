import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Adicional,
  CategoriaProdutos,
  CreateAdicionalRequest,
  CreateCategoriaRequest,
} from '../models';

@Injectable({ providedIn: 'root' })
export class CatalogoService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/catalogo`;

  // ── Adicionais ──────────────────────────────────────────────────────────────

  criarAdicional(
    lojaUuid: string,
    body: CreateAdicionalRequest,
  ): Observable<Adicional> {
    return this.http.post<Adicional>(
      `${this.base}/${lojaUuid}/adicionais`,
      body,
    );
  }

  listarAdicionais(lojaUuid: string): Observable<Adicional[]> {
    return this.http.get<Adicional[]>(`${this.base}/${lojaUuid}/adicionais`);
  }

  listarAdicionaisDisponiveis(lojaUuid: string): Observable<Adicional[]> {
    return this.http.get<Adicional[]>(
      `${this.base}/${lojaUuid}/adicionais/disponiveis`,
    );
  }

  marcarAdicionalIndisponivel(
    lojaUuid: string,
    adicionalUuid: string,
  ): Observable<void> {
    return this.http.put<void>(
      `${this.base}/${lojaUuid}/adicionais/${adicionalUuid}/indisponivel`,
      {},
    );
  }

  // ── Categorias ──────────────────────────────────────────────────────────────

  criarCategoria(
    lojaUuid: string,
    body: CreateCategoriaRequest,
  ): Observable<CategoriaProdutos> {
    return this.http.post<CategoriaProdutos>(
      `${this.base}/${lojaUuid}/categorias`,
      body,
    );
  }
}
