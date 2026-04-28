import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreatePagamentoRequest, CreatePagamentoResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class PagamentoService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/pagamentos`;

  criar(pedidoUuid: string, pagador?: { nome: string; cpf: string }): Observable<CreatePagamentoResponse> {
    const body: CreatePagamentoRequest = pagador ? { pagador } : {};
    return this.http.post<CreatePagamentoResponse>(`${this.base}/${pedidoUuid}`, body);
  }
}
