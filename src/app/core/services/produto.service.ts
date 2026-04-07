import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateProdutoRequest, Produto, UpdateProdutoRequest } from '../models';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/produtos`;

  criar(body: CreateProdutoRequest): Observable<Produto> {
    return this.http.post<Produto>(`${this.base}/`, body);
  }

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.base}/`);
  }

  listarPorLoja(lojaUuid: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.base}/${lojaUuid}`);
  }

  buscar(uuid: string): Observable<Produto> {
    return this.http.get<Produto>(`${this.base}/${uuid}`);
  }

  atualizar(uuid: string, body: UpdateProdutoRequest): Observable<Produto> {
    return this.http.put<Produto>(`${this.base}/${uuid}`, body);
  }

  deletar(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${uuid}`);
  }
}
