import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { chickie } from '@app/proto/generated';
import { ProtobufBaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class HorarioService extends ProtobufBaseService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/horarios`;

  protected getProtoType(): any {
    return chickie.HorarioFuncionamento;
  }

  /** Público — sem autenticação */
  listarPorLoja(lojaUuid: string): Observable<chickie.IHorarioFuncionamento[]> {
    return this.getProto<chickie.IListarHorariosResponse>(
      this.http,
      `${this.base}/${lojaUuid}`,
      chickie.ListarHorariosResponse
    ).pipe(map(res => res.horarios || []));
  }
}
