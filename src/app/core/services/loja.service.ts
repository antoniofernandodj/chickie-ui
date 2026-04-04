import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Loja } from '../models';

@Injectable({ providedIn: 'root' })
export class LojaService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/lojas`;

  /** Público — sem autenticação */
  listar(): Observable<Loja[]> {
    return this.http.get<Loja[]>(`${this.base}/`);
  }
}
