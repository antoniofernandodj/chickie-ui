import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs';

/**
 * GUARD DE AUTENTICAÇÃO (authGuard)
 * 
 * Este guard decide se um usuário pode ou não acessar uma rota que exige login.
 * 
 * O PROBLEMA DO REFRESH:
 * Quando você dá F5, o Angular reinicia do zero. O AuthService lê o token do localStorage
 * e pergunta ao servidor: "Este token ainda vale?". Isso demora alguns milissegundos.
 * Se o Guard rodar nesse meio tempo, ele vai achar que você não está logado.
 * 
 * A SOLUÇÃO:
 * Este guard agora sabe "esperar". Se o status for 'loading' (carregando), ele aguarda
 * a resposta do servidor antes de decidir.
 */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // 1. Pegamos o status atual (Pode ser: 'loading', 'valid' ou 'unauthenticated')
  const status = auth.tokenStatus();

  // 2. Se já sabemos que é válido, liberamos na hora (true)
  if (status === 'valid') return true;

  // 3. Se já sabemos que não está logado, mandamos para o login na hora
  if (status === 'unauthenticated') return router.createUrlTree(['/auth/login']);

  // 4. Se estiver em 'loading' (carregando após um F5), usamos RxJS para "observar" a mudança:
  //
  // - toObservable(auth.tokenStatus): Transforma o sinal de status em um "fluxo de dados" que podemos monitorar.
  // - pipe(...): É um cano por onde os dados passam e são transformados por "operadores".
  // - filter((s) => s !== 'loading'): Este operador barra o valor 'loading'. Ele só deixa passar quando o status mudar para 'valid' ou 'unauthenticated'.
  // - take(1): Diz ao Angular: "Assim que vier o primeiro valor válido (que passou pelo filtro), pegue-o e encerre a observação".
  // - map((s) => ...): Transforma o resultado final. Se for 'valid', vira 'true' (acesso permitido). Se não, vira um comando de redirecionamento para o login.
  return toObservable(auth.tokenStatus).pipe(
    filter((s) => s !== 'loading'),
    take(1),
    map((s) => (s === 'valid' ? true : router.createUrlTree(['/auth/login']))),
  );
};
