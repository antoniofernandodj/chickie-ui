import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HorarioFuncionamento } from '../models';

@Injectable({ providedIn: 'root' })
export class HorarioService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/horarios`;

  /** Público — sem autenticação */
  listarPorLoja(lojaUuid: string): Observable<HorarioFuncionamento[]> {
    return this.http.get<HorarioFuncionamento[]>(`${this.base}/${lojaUuid}`);
  }
}
