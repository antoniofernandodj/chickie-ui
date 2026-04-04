import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Cliente,
  CreateClienteRequest,
  CreateEntregadorRequest,
  CreateFuncionarioRequest,
  CreateLojaRequest,
  Entregador,
  Funcionario,
  Loja,
} from '../models';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/admin`;

  criarLoja(body: CreateLojaRequest): Observable<Loja> {
    return this.http.post<Loja>(`${this.base}/lojas`, body);
  }

  listarLojas(): Observable<Loja[]> {
    return this.http.get<Loja[]>(`${this.base}/minhas-lojas`);
  }

  adicionarFuncionario(
    lojaUuid: string,
    body: CreateFuncionarioRequest,
  ): Observable<Funcionario> {
    return this.http.post<Funcionario>(
      `${this.base}/lojas/${lojaUuid}/funcionarios`,
      body,
    );
  }

  adicionarEntregador(
    lojaUuid: string,
    body: CreateEntregadorRequest,
  ): Observable<Entregador> {
    return this.http.post<Entregador>(
      `${this.base}/lojas/${lojaUuid}/entregadores`,
      body,
    );
  }

  adicionarCliente(
    lojaUuid: string,
    body: CreateClienteRequest,
  ): Observable<Cliente> {
    return this.http.post<Cliente>(
      `${this.base}/lojas/${lojaUuid}/clientes`,
      body,
    );
  }
}
