import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs';

/**
 * GUARD DO DONO DA PLATAFORMA (ownerGuard)
 * 
 * Este guard garante que apenas o dono da plataforma (Owner) acesse rotas administrativas globais.
 * 
 * POR QUE A MUDANÇA?
 * Sem esta lógica, ao dar F5 na tela /owner, o sistema redirecionava para a Home ('/') 
 * porque o Angular ainda estava validando se você era mesmo o Owner ou apenas um cliente.
 */
export const ownerGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  /**
   * Função interna que faz a checagem final.
   * Retorna 'true' se for Owner, ou redireciona para a Home ('/') se não for.
   */
  const check = () => {
    if (auth.isAuthenticated() && auth.isOwner()) {
      return true;
    }
    return router.createUrlTree(['/']);
  };

  // 1. Se o sistema já terminou de carregar o perfil do usuário...
  const status = auth.tokenStatus();
  if (status !== 'loading') {
    // ...executamos a checagem de permissão imediatamente.
    return check();
  }

  // 2. Se ainda estiver carregando (ex: logo após um F5)...
  //
  // - toObservable: Começa a "espiar" as mudanças no status do token.
  // - pipe: Abre um canal de processamento para os dados que chegam.
  // - filter: Ignora o status enquanto ele for 'loading'. Só deixa a informação passar quando o login terminar.
  // - take(1): Pega apenas a primeira informação útil e para de espiar (economiza memória).
  // - map: Assim que a informação chega, executa a nossa função 'check()' lá de cima.
  return toObservable(auth.tokenStatus).pipe(
    filter((s) => s !== 'loading'),
    take(1),
    map(() => check()),
  );
};
