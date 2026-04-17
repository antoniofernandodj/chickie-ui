import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { chickie } from '@app/proto/generated';
import { ProtobufBaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class AdminService extends ProtobufBaseService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/admin`;

  protected getProtoType(): any {
    return chickie.Loja;
  }

  criarLoja(body: chickie.ICreateLojaRequest): Observable<chickie.ILoja> {
    return this.postProto<chickie.ILoja>(
      this.http,
      `${this.base}/lojas`,
      body,
      chickie.Loja,
      chickie.CreateLojaRequest
    );
  }

  listarLojas(): Observable<chickie.ILoja[]> {
    return this.getProto<chickie.IListarLojasResponse>(
      this.http,
      `${this.base}/lojas/minhas-lojas`,
      chickie.ListarLojasResponse
    ).pipe(map(res => res.lojas || []));
  }

  /** Alias semântico para listagem de lojas do admin logado */
  listarMinhasLojas(): Observable<chickie.ILoja[]> {
    return this.listarLojas();
  }

  adicionarFuncionario(
    lojaUuid: string,
    body: chickie.IAdicionarFuncionarioRequest,
  ): Observable<chickie.IFuncionario> {
    return this.postProto<chickie.IFuncionario>(
      this.http,
      `${this.base}/lojas/${lojaUuid}/funcionarios`,
      body,
      chickie.Funcionario,
      chickie.AdicionarFuncionarioRequest
    );
  }

  adicionarEntregador(
    lojaUuid: string,
    body: chickie.IAdicionarEntregadorRequest,
  ): Observable<chickie.IEntregador> {
    return this.postProto<chickie.IEntregador>(
      this.http,
      `${this.base}/lojas/${lojaUuid}/entregadores`,
      body,
      chickie.Entregador,
      chickie.AdicionarEntregadorRequest
    );
  }

  adicionarCliente(
    lojaUuid: string,
    body: chickie.IAdicionarClienteRequest,
  ): Observable<chickie.ICliente> {
    return this.postProto<chickie.ICliente>(
      this.http,
      `${this.base}/lojas/${lojaUuid}/clientes`,
      body,
      chickie.Cliente,
      chickie.AdicionarClienteRequest
    );
  }

  listarFuncionarios(lojaUuid: string): Observable<chickie.IFuncionario[]> {
    return this.getProto<chickie.IListarFuncionariosResponse>(
      this.http,
      `${environment.apiUrl}/funcionarios/${lojaUuid}`,
      chickie.ListarFuncionariosResponse
    ).pipe(map(res => res.funcionarios || []));
  }

  atualizarFuncionario(
    lojaUuid: string,
    funcionarioUuid: string,
    body: chickie.IAtualizarFuncionarioRequest,
  ): Observable<chickie.IGenericResponse> {
    return this.putProto<chickie.IGenericResponse>(
      this.http,
      `${environment.apiUrl}/funcionarios/${lojaUuid}/${funcionarioUuid}`,
      body,
      chickie.GenericResponse,
      chickie.AtualizarFuncionarioRequest
    );
  }

  listarEntregadores(lojaUuid: string): Observable<chickie.IEntregador[]> {
    return this.getProto<chickie.IListarEntregadoresResponse>(
      this.http,
      `${environment.apiUrl}/entregadores/${lojaUuid}`,
      chickie.ListarEntregadoresResponse
    ).pipe(map(res => res.entregadores || []));
  }

  atualizarEntregador(
    lojaUuid: string,
    entregadorUuid: string,
    body: chickie.IAtualizarEntregadorRequest,
  ): Observable<chickie.IGenericResponse> {
    return this.putProto<chickie.IGenericResponse>(
      this.http,
      `${environment.apiUrl}/entregadores/${lojaUuid}/${entregadorUuid}`,
      body,
      chickie.GenericResponse,
      chickie.AtualizarEntregadorRequest
    );
  }

  toggleDisponibilidadeEntregador(
    lojaUuid: string,
    entregadorUuid: string,
    disponivel: boolean,
  ): Observable<chickie.IGenericResponse> {
    return this.putProto<chickie.IGenericResponse>(
      this.http,
      `${environment.apiUrl}/entregadores/${lojaUuid}/${entregadorUuid}/disponibilidade`,
      { disponivel },
      chickie.GenericResponse,
      chickie.AtualizarDisponibilidadeRequest
    );
  }

  // ── Endereços de Loja ─────────────────────────────────────────────────────

  listarEnderecosLoja(lojaUuid: string): Observable<chickie.IEndereco[]> {
    return this.getProto<chickie.IListarEnderecosResponse>(
      this.http,
      `${environment.apiUrl}/enderecos-loja/${lojaUuid}`,
      chickie.ListarEnderecosResponse
    ).pipe(map(res => res.enderecos || []));
  }

  criarEnderecoLoja(
    lojaUuid: string,
    body: chickie.IEnderecoRequest,
  ): Observable<chickie.IUuidResponse> {
    return this.postProto<chickie.IUuidResponse>(
      this.http,
      `${environment.apiUrl}/enderecos-loja/${lojaUuid}`,
      body,
      chickie.UuidResponse,
      chickie.EnderecoRequest
    );
  }

  atualizarEnderecoLoja(
    lojaUuid: string,
    enderecoUuid: string,
    body: chickie.IEnderecoRequest,
  ): Observable<chickie.IGenericResponse> {
    return this.putProto<chickie.IGenericResponse>(
      this.http,
      `${environment.apiUrl}/enderecos-loja/${lojaUuid}/${enderecoUuid}`,
      body,
      chickie.GenericResponse,
      chickie.EnderecoRequest
    );
  }

  deletarEnderecoLoja(
    lojaUuid: string,
    enderecoUuid: string,
  ): Observable<chickie.IGenericResponse> {
    return this.deleteProto<chickie.IGenericResponse>(
      this.http,
      `${environment.apiUrl}/enderecos-loja/${lojaUuid}/${enderecoUuid}`,
      chickie.GenericResponse
    );
  }

  // ── Horários de Funcionamento ─────────────────────────────────────────────

  listarHorarios(lojaUuid: string): Observable<chickie.IHorarioFuncionamento[]> {
    return this.getProto<chickie.IListarHorariosResponse>(
      this.http,
      `${environment.apiUrl}/horarios/${lojaUuid}`,
      chickie.ListarHorariosResponse
    ).pipe(map(res => res.horarios || []));
  }

  criarHorario(
    lojaUuid: string,
    body: chickie.ICriarOuAtualizarHorarioRequest,
  ): Observable<chickie.IHorarioFuncionamento> {
    return this.postProto<chickie.IHorarioFuncionamento>(
      this.http,
      `${environment.apiUrl}/horarios/${lojaUuid}`,
      body,
      chickie.HorarioFuncionamento,
      chickie.CriarOuAtualizarHorarioRequest
    );
  }

  atualizarHorario(
    lojaUuid: string,
    body: chickie.ICriarOuAtualizarHorarioRequest,
  ): Observable<chickie.IHorarioFuncionamento> {
    return this.postProto<chickie.IHorarioFuncionamento>(
      this.http,
      `${environment.apiUrl}/horarios/${lojaUuid}`,
      body,
      chickie.HorarioFuncionamento,
      chickie.CriarOuAtualizarHorarioRequest
    );
  }

  toggleDiaAtivo(
    lojaUuid: string,
    diaSemana: number,
    ativo: boolean,
  ): Observable<chickie.IGenericResponse> {
    return this.putProto<chickie.IGenericResponse>(
      this.http,
      `${environment.apiUrl}/horarios/${lojaUuid}/dia/${diaSemana}/ativo`,
      { ativo },
      chickie.GenericResponse,
      chickie.DefinirAtivoRequest
    );
  }

  deletarDia(
    lojaUuid: string,
    diaSemana: number,
  ): Observable<chickie.IGenericResponse> {
    return this.deleteProto<chickie.IGenericResponse>(
      this.http,
      `${environment.apiUrl}/horarios/${lojaUuid}/dia/${diaSemana}`,
      chickie.GenericResponse
    );
  }

  // ── Owner Endpoints ─────────────────────────────────────────────────────

  bloquearLoja(lojaUuid: string, bloqueado: boolean): Observable<chickie.IGenericResponse> {
    return this.patchProto<chickie.IGenericResponse>(
      this.http,
      `${environment.apiUrl}/lojas/${lojaUuid}/bloqueado`,
      { bloqueado },
      chickie.GenericResponse,
      chickie.Loja
    );
  }

  wipeDatabase(): Observable<chickie.IGenericResponse> {
    return this.deleteProto<chickie.IGenericResponse>(
      this.http,
      `${environment.apiUrl}/wipe`,
      chickie.GenericResponse
    );
  }
}
