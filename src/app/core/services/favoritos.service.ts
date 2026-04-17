import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { chickie } from '@app/proto/generated';
import { ProtobufBaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class FavoritosService extends ProtobufBaseService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/favoritos`;

  protected getProtoType(): any {
    return chickie.LojaFavorita;
  }

  adicionar(lojaUuid: string): Observable<chickie.ILojaFavorita> {
    return this.postProto<chickie.ILojaFavorita>(
      this.http,
      `${this.base}/${lojaUuid}`,
      {},
      chickie.LojaFavorita,
      chickie.GenericResponse // Just a placeholder for empty body if needed, or pass null
    );
  }

  remover(lojaUuid: string): Observable<chickie.IGenericResponse> {
    return this.deleteProto<chickie.IGenericResponse>(
      this.http,
      `${this.base}/${lojaUuid}`,
      chickie.GenericResponse
    );
  }

  listarMinhas(): Observable<chickie.ILojaFavorita[]> {
    return this.getProto<chickie.IListarLojasFavoritasResponse>(
      this.http,
      `${this.base}/minhas`,
      chickie.ListarLojasFavoritasResponse
    ).pipe(map(res => res.favoritas || []));
  }

  verificar(lojaUuid: string): Observable<chickie.IDisponibilidadeResponse> {
    return this.getProto<chickie.IDisponibilidadeResponse>(
      this.http,
      `${this.base}/${lojaUuid}/verificar`,
      chickie.DisponibilidadeResponse
    );
  }
}
