import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FavoritaResponse, LojaFavorita, MessageResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class FavoritosService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/favoritos`;

  adicionar(lojaUuid: string): Observable<LojaFavorita> {
    return this.http.post<LojaFavorita>(`${this.base}/${lojaUuid}`, {});
  }

  remover(lojaUuid: string): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(`${this.base}/${lojaUuid}`);
  }

  listarMinhas(): Observable<LojaFavorita[]> {
    return this.http.get<LojaFavorita[]>(`${this.base}/minhas`);
  }

  verificar(lojaUuid: string): Observable<FavoritaResponse> {
    return this.http.get<FavoritaResponse>(
      `${this.base}/${lojaUuid}/verificar`,
    );
  }
}
