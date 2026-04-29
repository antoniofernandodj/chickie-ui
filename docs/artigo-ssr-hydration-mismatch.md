# Cards em branco após SSR: como um mismatch de hidratação quebra bindings no Angular

Estava implementando a tela de pedidos de um app de delivery. A lógica era simples: se o usuário está logado, busca os pedidos na API; se não está, lê os pedidos salvos no `localStorage` e atualiza cada um via HTTP em paralelo. O problema apareceu logo: os cards renderizavam — dava pra ver a borda, a sombra, os textos estáticos — mas todas as interpolações dinâmicas estavam em branco.

## O sintoma
A tela mostrava um card com a estrutura correta:

```
┌─────────────────────────────────────────────┐
│ Pedido #                                    │  <-- Código sumiu
│                                             │
│ 0 itens —                                   │  <-- Nome do produto sumiu
│                                             │
│ Total R$                                    │  <-- Valor sumiu
└─────────────────────────────────────────────┘
```

Ao inspecionar o HTML, as tags estavam lá, mas vazias. O mais estranho? O log no console mostrava que os dados estavam chegando corretamente da API e o `signal` do Angular estava populado.

## O que NÃO era o problema
1. **Tipagem de dados:** Pensei que o `total` sendo string ("142.70") pudesse estar quebrando o `DecimalPipe`. Normalizei para `number`, mas continuou em branco.
2. **Timing de Signals:** Achei que o signal estivesse sendo atualizado tarde demais. Tentei `computed`, `effect`, etc. Sem sucesso.
3. **Loading State:** Forcei o `loading` como `false` desde o início. Os cards apareciam em branco instantaneamente.

## A Causa Raiz: SSR Mismatch
A aplicação utiliza **Server-Side Rendering (SSR)** com **Client Hydration**. Eis o que acontecia:

1. **No Servidor (SSR):** O Angular renderiza a página. Como o servidor não tem acesso ao `localStorage`, ele assume que não há pedidos. Ele gera o HTML do "Empty State" ou um estado inicial vazio.
2. **No Navegador (Hidratação):** O navegador recebe o HTML do servidor. O Angular tenta "hidratar" esse HTML. 
3. **O Erro:** No `ngOnInit`, o componente lia o `localStorage` e populava os pedidos. Isso mudava o DOM no cliente *exatamente no momento em que a hidratação estava tentando casar o DOM do servidor com o do cliente*.

Quando o Angular detecta que o DOM que ele esperava (vazio, do servidor) é diferente do que ele gerou no cliente (com cards), ele pode entrar em um estado de "mismatch". Em alguns casos, ele falha ao vincular os `bindings` (interpolações) às propriedades do componente, deixando os elementos no lugar mas sem conteúdo.

## A Solução: `afterNextRender`

A solução foi garantir que a lógica de busca de pedidos locais (que depende do navegador) só execute **após** a hidratação ter estabilizado. O Angular fornece o hook `afterNextRender` para isso.

### Código Corrigido

```typescript
constructor() {
  // afterNextRender executa apenas no browser, após a hidratação SSR estabilizar.
  afterNextRender(() => {
    if (this.auth.isAuthenticated()) {
      this.fetchPedidosDaApi();
    } else {
      this.loading.set(false);
      const locais = this.pedidoLocalStorage.pedidos();
      // ... busca atualizações em background
    }
  });
}
```

## A Armadilha Extra: Missing Locale Data

Além do mismatch de hidratação, descobrimos outro culpado: o `DatePipe` e o `DecimalPipe` falham silenciosamente (ou quebram o render) se você tentar usar uma locale como `pt-BR` sem registrá-la.

No `app.config.ts`, é obrigatório:
1. Registrar os dados da locale com `registerLocaleData`.
2. Prover o `LOCALE_ID`.

```typescript
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    // ...
  ]
};
```

Sem isso, chamadas como `new DatePipe('pt-BR')` no código TypeScript ou `| number` no template podem interromper o ciclo de renderização do componente, resultando nos temidos "cards em branco".

## Conclusão
Ao lidar com SSR e dados locais (`localStorage`):
1. **Normalize** seus dados ao ler (previna strings onde deveriam ser números).
2. **Use `afterNextRender`** para qualquer lógica que dependa do estado do cliente.
3. **Registre sua Locale** globalmente para evitar quebras nos pipes de data e moeda.

Seguindo essas práticas, você garante que sua aplicação Angular seja resiliente, performática e, acima de tudo, que os dados apareçam para o usuário assim que ele abrir a página.
