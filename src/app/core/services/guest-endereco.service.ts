import { Injectable } from '@angular/core';
import { EnderecoFormValue } from '../models';

export interface EnderecoGuestSalvo extends EnderecoFormValue {
  id: string;
}

const STORAGE_KEY = 'chickie_enderecos_guest';
const MAX_SAVED   = 5;

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
    const lista = this.listar().filter(
      e => !(e.logradouro === endereco.logradouro && e.numero === endereco.numero && e.bairro === endereco.bairro),
    );
    const novo: EnderecoGuestSalvo = { ...endereco, id: crypto.randomUUID() };
    lista.unshift(novo);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista.slice(0, MAX_SAVED)));
  }

  remover(id: string): void {
    const lista = this.listar().filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
  }
}
