import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario, ClasseUsuario, MessageResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/usuarios`;

  listar(classe?: ClasseUsuario): Observable<Usuario[]> {
    let params = new HttpParams();
    if (classe) {
      params = params.set('classe', classe);
    }
    return this.http.get<Usuario[]>(this.base, { params });
  }

  bloquearUsuario(uuid: string, bloqueado: boolean): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${this.base}/${uuid}/bloqueado`, { bloqueado });
  }

  marcarRemocao(uuid: string): Observable<MessageResponse> {
    return this.http.patch<MessageResponse>(`${this.base}/${uuid}/marcar-remocao`, {});
  }

  desmarcarRemocao(uuid: string): Observable<MessageResponse> {
    return this.http.patch<MessageResponse>(`${this.base}/${uuid}/desmarcar-remocao`, {});
  }

  ativarUsuario(uuid: string, ativo: boolean): Observable<MessageResponse> {
    return this.http.put<MessageResponse>(`${this.base}/${uuid}/ativo`, { ativo });
  }
}
