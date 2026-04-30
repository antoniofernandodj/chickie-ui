import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, tap } from 'rxjs';

export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

@Injectable({ providedIn: 'root' })
export class CepService {
  private readonly http = inject(HttpClient);
  private readonly CACHE_KEY = 'chickie_cep_cache';
  private cache = new Map<string, ViaCepResponse>();

  constructor() {
    this.loadCache();
  }

  private loadCache() {
    if (typeof localStorage === 'undefined') return;
    try {
      const saved = localStorage.getItem(this.CACHE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        this.cache = new Map(Object.entries(data));
      }
    } catch {
      // Ignora erro no parse do localStorage
    }
  }

  private saveCache() {
    if (typeof localStorage === 'undefined') return;
    try {
      const data = Object.fromEntries(this.cache.entries());
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(data));
    } catch {
      // Ignora erro ao salvar no localStorage (ex: quota excedida)
    }
  }

  buscar(cep: string): Observable<ViaCepResponse> {
    const cleanCep = cep.replace(/\D/g, '');
    
    if (this.cache.has(cleanCep)) {
      return of(this.cache.get(cleanCep)!);
    }

    return this.http.get<ViaCepResponse>(`https://viacep.com.br/ws/${cleanCep}/json/`).pipe(
      map(res => {
        if (res.erro) {
          throw new Error('CEP não encontrado');
        }
        return res;
      }),
      tap(res => {
        this.cache.set(cleanCep, res);
        this.saveCache();
      })
    );
  }
}
