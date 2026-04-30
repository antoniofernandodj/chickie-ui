import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HorarioFuncionamento, StatusLojaAberta } from '../models';

@Injectable({ providedIn: 'root' })
export class HorarioService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/horarios`;

  /** Público — sem autenticação */
  listarPorLoja(lojaUuid: string): Observable<HorarioFuncionamento[]> {
    return this.http.get<HorarioFuncionamento[]>(`${this.base}/${lojaUuid}`);
  }

  /** Público — verifica se a loja está aberta agora (horário de Brasília) */
  verificarStatus(lojaUuid: string): Observable<StatusLojaAberta> {
    return this.http.get<StatusLojaAberta>(`${this.base}/${lojaUuid}/status`);
  }
}
