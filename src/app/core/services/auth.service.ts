import { Injectable, inject, PLATFORM_ID, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  Usuario,
  ClasseUsuario,
} from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly base = `${environment.apiUrl}/auth`;

  private readonly _token = signal<string | null>(this.loadToken());
  readonly token = this._token.asReadonly();
  readonly isAuthenticated = computed(() => !!this._token());

  readonly userClass = computed<ClasseUsuario | null>(() => {
    if (!isPlatformBrowser(this.platformId)) return null;
    return (localStorage.getItem('chickie_classe') as ClasseUsuario | null) ?? null;
  });

  readonly isAdmin = computed(() => this.userClass() === 'administrador' || this.userClass() === 'owner');

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

  signup(body: SignupRequest): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.base}/signup`, body).pipe(
      tap((user) => {
        this.saveItem('chickie_classe', user.classe);
      }),
    );
  }

  login(body: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.base}/login`, body).pipe(
      tap((res) => {
        this.saveItem('chickie_token', res.access_token);
        // Tenta extrair a classe do JWT
        const classe = this.extractClasseFromToken(res.access_token);
        if (classe) this.saveItem('chickie_classe', classe);
        this._token.set(res.access_token);
      }),
    );
  }

  private extractClasseFromToken(token: string): string | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const payload = JSON.parse(atob(parts[1]));
      return payload?.classe ?? null;
    } catch {
      return null;
    }
  }

  saveUserMeta(nome: string): void {
    this.saveItem('chickie_nome', nome);
  }

  logout(): void {
    this.removeItem('chickie_token');
    this.removeItem('chickie_nome');
    this.removeItem('chickie_classe');
    this._token.set(null);
  }
}
