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
  UpdateFuncionarioRequest,
  UpdateEntregadorRequest,
  MessageResponse,
} from '../models';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/admin`;

  criarLoja(body: CreateLojaRequest): Observable<Loja> {
    return this.http.post<Loja>(`${this.base}/lojas`, body);
  }

  listarLojas(): Observable<Loja[]> {
    return this.http.get<Loja[]>(`${this.base}/lojas/minhas-lojas`);
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

  listarFuncionarios(lojaUuid: string): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${environment.apiUrl}/funcionarios/${lojaUuid}`);
  }

  atualizarFuncionario(
    lojaUuid: string,
    funcionarioUuid: string,
    body: UpdateFuncionarioRequest,
  ): Observable<MessageResponse> {
    return this.http.put<MessageResponse>(
      `${environment.apiUrl}/funcionarios/${lojaUuid}/${funcionarioUuid}`,
      body,
    );
  }

  listarEntregadores(lojaUuid: string): Observable<Entregador[]> {
    return this.http.get<Entregador[]>(`${environment.apiUrl}/entregadores/${lojaUuid}`);
  }

  atualizarEntregador(
    lojaUuid: string,
    entregadorUuid: string,
    body: UpdateEntregadorRequest,
  ): Observable<MessageResponse> {
    return this.http.put<MessageResponse>(
      `${environment.apiUrl}/entregadores/${lojaUuid}/${entregadorUuid}`,
      body,
    );
  }

  toggleDisponibilidadeEntregador(
    lojaUuid: string,
    entregadorUuid: string,
    disponivel: boolean,
  ): Observable<void> {
    return this.http.put<void>(
      `${environment.apiUrl}/entregadores/${lojaUuid}/${entregadorUuid}/disponibilidade`,
      { disponivel },
    );
  }
}
