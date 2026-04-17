import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { chickie } from '@app/proto/generated';
import { ProtobufBaseService } from './base.service';
import { ClasseUsuario } from '../models';

@Injectable({ providedIn: 'root' })
export class UsuarioService extends ProtobufBaseService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/usuarios`;

  protected getProtoType(): any {
    return chickie.Usuario;
  }

  listar(classe?: ClasseUsuario): Observable<chickie.IUsuario[]> {
    let params = new HttpParams();
    if (classe) {
      params = params.set('classe', classe);
    }
    return this.http.get(this.base, { 
      params, 
      responseType: 'arraybuffer' 
    }).pipe(
      map(buffer => this.deserialize<chickie.IListarUsuariosResponse>(new Uint8Array(buffer), chickie.ListarUsuariosResponse)),
      map(res => res.usuarios || [])
    );
  }

  bloquearUsuario(uuid: string, bloqueado: boolean): Observable<chickie.IGenericResponse> {
    // Usando chickie.Usuario como tipo de request para carregar o campo bloqueado
    return this.postProto<chickie.IGenericResponse>(
      this.http,
      `${this.base}/${uuid}/bloqueado`,
      { bloqueado },
      chickie.GenericResponse,
      chickie.Usuario
    );
  }

  marcarRemocao(uuid: string): Observable<chickie.IGenericResponse> {
    return this.patchProto<chickie.IGenericResponse>(
      this.http,
      `${this.base}/${uuid}/marcar-remocao`,
      {},
      chickie.GenericResponse,
      chickie.GenericResponse
    );
  }

  desmarcarRemocao(uuid: string): Observable<chickie.IGenericResponse> {
    return this.patchProto<chickie.IGenericResponse>(
      this.http,
      `${this.base}/${uuid}/desmarcar-remocao`,
      {},
      chickie.GenericResponse,
      chickie.GenericResponse
    );
  }

  ativarUsuario(uuid: string, ativo: boolean): Observable<chickie.IGenericResponse> {
    return this.putProto<chickie.IGenericResponse>(
      this.http,
      `${this.base}/${uuid}/ativo`,
      { ativo },
      chickie.GenericResponse,
      chickie.AlternarAtivoRequest
    );
  }
}
