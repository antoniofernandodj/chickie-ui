import { Injectable } from '@angular/core';
import { EnderecoFormValue } from '../models';

export interface EnderecoGuestSalvo extends EnderecoFormValue {
  id: string;
}

const STORAGE_KEY = 'chickie_enderecos_guest';
const MAX_SAVED   = 5;

function gerarId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

@Injectable({ providedIn: 'root' })
export class GuestEnderecoService {
  listar(): EnderecoGuestSalvo[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    } catch {
      return [];
    }
  }

  salvar(endereco: EnderecoFormValue): void {
    try {
      const lista = this.listar().filter(
        e => !(e.logradouro === endereco.logradouro && e.numero === endereco.numero && e.bairro === endereco.bairro),
      );
      lista.unshift({ ...endereco, id: gerarId() });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lista.slice(0, MAX_SAVED)));
    } catch {
      // silently ignore (e.g. private browsing with storage blocked)
    }
  }

  remover(id: string): void {
    try {
      const lista = this.listar().filter(e => e.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
    } catch {
      // silently ignore
    }
  }
}
