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
} from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly base = `${environment.apiUrl}/auth`;

  private readonly _token = signal<string | null>(this.loadToken());
  readonly token = this._token.asReadonly();
  readonly isAuthenticated = computed(() => !!this._token());

  private loadToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem('chickie_token');
  }

  signup(body: SignupRequest): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.base}/signup`, body);
  }

  login(body: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.base}/login`, body).pipe(
      tap((res) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('chickie_token', res.access_token);
        }
        this._token.set(res.access_token);
      }),
    );
  }

  saveUserMeta(nome: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('chickie_nome', nome);
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('chickie_token');
      localStorage.removeItem('chickie_nome');
    }
    this._token.set(null);
  }
}
