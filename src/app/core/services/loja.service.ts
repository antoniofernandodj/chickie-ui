import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { chickie } from '@app/proto/generated';
import { ProtobufBaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class LojaService extends ProtobufBaseService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/lojas`;

  protected getProtoType(): any {
    return chickie.Loja;
  }

  /** Público — sem autenticação */
  listar(): Observable<chickie.ILoja[]> {
    return this.getProto<chickie.IListarLojasResponse>(
      this.http,
      `${this.base}/`,
      chickie.ListarLojasResponse
    ).pipe(map(res => res.lojas || []));
  }

  /** Pesquisar lojas por termo */
  pesquisar(termo: string): Observable<chickie.ILoja[]> {
    const params = new HttpParams().set('termo', termo);
    // Nota: HttpParams ainda podem ser usados com responseType: 'arraybuffer'
    return this.http.get(`${this.base}/pesquisar`, { 
      params, 
      responseType: 'arraybuffer' 
    }).pipe(
      map(buffer => this.deserialize<chickie.IListarLojasResponse>(new Uint8Array(buffer), chickie.ListarLojasResponse)),
      map(res => res.lojas || [])
    );
  }

  /** Buscar loja por slug */
  buscarPorSlug(slug: string): Observable<chickie.ILoja> {
    return this.getProto<chickie.ILoja>(
      this.http,
      `${this.base}/slug/${slug}`,
      chickie.Loja
    );
  }

  /** Verificar disponibilidade de slug */
  verificarSlug(slug: string): Observable<chickie.ISlugDisponivelResponse> {
    return this.getProto<chickie.ISlugDisponivelResponse>(
      this.http,
      `${this.base}/verificar-slug/${slug}`,
      chickie.SlugDisponivelResponse
    );
  }

  /** Buscar loja por UUID */
  buscarPorUuid(uuid: string): Observable<chickie.ILoja> {
    return this.getProto<chickie.ILoja>(
      this.http,
      `${this.base}/${uuid}`,
      chickie.Loja
    );
  }
}
