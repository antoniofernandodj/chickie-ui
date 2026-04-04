import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EnderecoUsuario, EnderecoUsuarioRequest } from '../models';

@Injectable({ providedIn: 'root' })
export class EnderecoUsuarioService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/enderecos-usuario`;

  criar(body: EnderecoUsuarioRequest): Observable<EnderecoUsuario> {
    return this.http.post<EnderecoUsuario>(`${this.base}/`, body);
  }

  listar(): Observable<EnderecoUsuario[]> {
    return this.http.get<EnderecoUsuario[]>(`${this.base}/`);
  }

  buscar(uuid: string): Observable<EnderecoUsuario> {
    return this.http.get<EnderecoUsuario>(`${this.base}/${uuid}`);
  }

  atualizar(
    uuid: string,
    body: EnderecoUsuarioRequest,
  ): Observable<EnderecoUsuario> {
    return this.http.put<EnderecoUsuario>(`${this.base}/${uuid}`, body);
  }

  deletar(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${uuid}`);
  }
}
