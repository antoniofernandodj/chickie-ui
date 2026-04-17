import { Injectable, inject, PLATFORM_ID, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { chickie } from '@app/proto/generated';
import { ProtobufBaseService } from './base.service';
import { ClasseUsuario } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService extends ProtobufBaseService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly base = `${environment.apiUrl}/auth`;

  private readonly _token = signal<string | null>(this.loadToken());
  readonly token = this._token.asReadonly();
  readonly isAuthenticated = computed(() => !!this._token());

  // Signal para forçar reatividade quando userClass muda
  private readonly _userClassTrigger = signal<Date>(new Date());

  readonly userClass = computed<ClasseUsuario | null>(() => {
    // Depende do signal para forçar recalculo quando _userClassTrigger muda
    this._userClassTrigger();
    if (!isPlatformBrowser(this.platformId)) return null;
    return (localStorage.getItem('chickie_classe') as ClasseUsuario | null) ?? null;
  });

  readonly isAdmin = computed(() => this.userClass() === 'administrador' || this.userClass() === 'owner');
  readonly isOwner = computed(() => this.userClass() === 'owner');

  protected getProtoType(): any {
    return chickie.Usuario;
  }

  private loadToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem('chickie_token');
  }

  private saveItem(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }

  private removeItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }

  signup(body: chickie.ICreateUsuarioRequest): Observable<chickie.Usuario> {
    return this.postProto<chickie.Usuario>(
      this.http,
      `${this.base}/signup`,
      body,
      chickie.Usuario,
      chickie.CreateUsuarioRequest
    ).pipe(
      tap((user) => {
        if (user.classe) {
          this.saveItem('chickie_classe', user.classe);
          this._userClassTrigger.set(new Date()); // Força atualização reativa
        }
      }),
    );
  }

  login(body: chickie.ILoginRequest): Observable<chickie.LoginResponse> {
    return this.postProto<chickie.LoginResponse>(
      this.http,
      `${this.base}/login`,
      body,
      chickie.LoginResponse,
      chickie.LoginRequest
    ).pipe(
      tap((res) => {
        if (res.access_token) {
          this.saveItem('chickie_token', res.access_token);
          this._token.set(res.access_token);
          // Tenta extrair do JWT como fallback
          const classe = this.extractClasseFromToken(res.access_token);
          if (classe) {
            this.saveItem('chickie_classe', classe);
            this._userClassTrigger.set(new Date()); // Força atualização reativa
          }
        }
      }),
    );
  }

  /**
   * GET /proto/auth/me - Seção 2.3 da API
   * Busca o perfil do usuário autenticado e salva chickie_classe no localStorage.
   * Deve ser chamado após o login para garantir que a classe seja armazenada.
   */
  fetchAndSaveUserProfile(): Observable<chickie.Usuario> {
    return this.getProto<chickie.Usuario>(this.http, `${this.base}/me`, chickie.Usuario).pipe(
      tap((user) => {
        if (user.classe) {
          this.saveItem('chickie_classe', user.classe);
          this._userClassTrigger.set(new Date()); // Força atualização reativa
        }
        if (user.nome) {
          this.saveItem('chickie_nome', user.nome);
        }
      }),
    );
  }

  private extractClasseFromToken(token: string): string | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      
      // Adiciona padding se necessário
      const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const padLength = (4 - (base64.length % 4)) % 4;
      const padded = base64 + '='.repeat(padLength);
      
      const payload = JSON.parse(atob(padded));
      
      // Tenta diferentes campos possíveis para a classe
      return payload?.classe 
        ?? payload?.userClass 
        ?? payload?.role 
        ?? payload?.user_class 
        ?? null;
    } catch (e) {
      console.warn('Failed to extract classe from JWT:', e);
      return null;
    }
  }

  saveUserMeta(nome: string): void {
    this.saveItem('chickie_nome', nome);
  }

  /** Verificar disponibilidade de email */
  verificarEmail(email: string): Observable<chickie.DisponibilidadeResponse> {
    return this.postProto<chickie.DisponibilidadeResponse>(
      this.http,
      `${this.base}/verificar-email`,
      { email },
      chickie.DisponibilidadeResponse,
      chickie.VerificarEmailRequest
    );
  }

  /** Verificar disponibilidade de username */
  verificarUsername(username: string): Observable<chickie.DisponibilidadeResponse> {
    return this.postProto<chickie.DisponibilidadeResponse>(
      this.http,
      `${this.base}/verificar-username`,
      { username },
      chickie.DisponibilidadeResponse,
      chickie.VerificarUsernameRequest
    );
  }

  /** Verificar disponibilidade de celular */
  verificarCelular(celular: string): Observable<chickie.DisponibilidadeResponse> {
    return this.postProto<chickie.DisponibilidadeResponse>(
      this.http,
      `${this.base}/verificar-celular`,
      { celular },
      chickie.DisponibilidadeResponse,
      chickie.VerificarCelularRequest
    );
  }

  logout(): void {
    this.removeItem('chickie_token');
    this.removeItem('chickie_nome');
    this.removeItem('chickie_classe');
    this._token.set(null);
  }

  /** Extrai o UUID do usuário do token JWT */
  getUsuarioUuid(): string | null {
    const token = this._token();
    if (!token) return null;
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const padLength = (4 - (base64.length % 4)) % 4;
      const padded = base64 + '='.repeat(padLength);

      const payload = JSON.parse(atob(padded));
      return payload?.sub ?? payload?.uuid ?? payload?.user_uuid ?? null;
    } catch (e) {
      console.warn('Failed to extract usuario_uuid from JWT:', e);
      return null;
    }
  }
}
