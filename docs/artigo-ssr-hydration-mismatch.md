# Cards em branco após SSR: como um mismatch de hidratação quebra bindings no Angular

Estava implementando a tela de pedidos de um app de delivery. A lógica era simples: se o usuário está logado, busca os pedidos na API; se não está, lê os pedidos salvos no `localStorage` e atualiza cada um via HTTP em paralelo. O problema apareceu logo: os cards renderizavam — dava pra ver a borda, a sombra, os textos estáticos — mas todas as interpolações dinâmicas estavam em branco.

## O sintoma

A tela mostrava um card com a estrutura correta:

```
┌─────────────────────────────────────────────┐
│                                             │
│  Total                          Ver detalhes › │
└─────────────────────────────────────────────┘
```

Onde deveria aparecer:

```
┌─────────────────────────────────────────────┐
│  29/04/2026 às 00:55          ● Criado      │
│  Pedido #QM287L                             │
│  4 itens — Pizza Margherita e mais 3...     │
│                                             │
│  Total  R$ 142,70               Ver detalhes › │
└─────────────────────────────────────────────┘
```

Os textos estáticos do HTML (`Total`, `Ver detalhes`) apareciam normalmente. Tudo que vinha de interpolação — `{{ pedido.codigo }}`, `{{ pedido.total | number }}`, `{{ getFormattedDate(...) }}` — estava vazio. O `<ui-status-badge>` também não renderizava.

O Network tab confirmava: a requisição `GET /pedidos/codigo/QM287L` retornou 200 com o payload correto. O Application tab confirmava: o `localStorage` tinha o pedido. O dado estava lá. O card estava lá. Mas os bindings não.

## O que eu achei que era o problema

Percorri várias hipóteses erradas antes de chegar na causa real:

**Valores monetários como string.** O `localStorage` tinha `"total": "142.70"` (string, não número) porque o dado foi salvo antes da normalização. O `DecimalPipe` do Angular aceita `string | number`, então não era isso — mas aproveitei e adicionei normalização no `load()` do serviço de qualquer forma.

**Timing de signals.** Achei que `loading.set(false)` estava sendo chamado antes de `salvar()` atualizar o sinal do `localStorage`. Movi o `set(false)` para depois do `forkJoin`. Não resolveu.

**Exibição imediata sem esperar a API.** Tentei mostrar os dados locais instantaneamente (sem estado de loading) e atualizar em background. Não resolveu.

Nenhuma dessas hipóteses era o problema real.

## A causa raiz: mismatch de hidratação SSR

O app usa Angular SSR com `provideClientHydration(withEventReplay())`. Esse é o detalhe que muda tudo.

Com SSR, cada request renderiza o HTML no servidor e envia pro browser. O Angular no browser então "hidrata" esse HTML — em vez de descartar o DOM do servidor e recriar tudo do zero, ele reusa os elementos existentes e apenas anexa event listeners e bindings. Para isso funcionar, o Angular verifica se o que o cliente renderizaria inicialmente é idêntico ao DOM que o servidor gerou.

O problema era que servidor e cliente geravam HTML completamente diferentes na primeira renderização:

**Servidor:**
- `localStorage` não existe no servidor → `pedidoLocalStorage.pedidos()` retorna `[]`
- `ngOnInit` rodava, chamava `loading.set(false)` imediatamente (sem dados locais)
- Template renderizava: empty state ("Nenhum pedido aqui")

**Cliente (primeira renderização antes de qualquer efeito):**
- `loading = signal(true)` inicializado → template renderizaria: skeleton (3 cards de loading)

Servidor gerou: **empty state**  
Cliente tentou hidratar com: **skeleton**

Mismatch detectado. O Angular tentava conciliar os dois, falhava parcialmente, e o resultado era uma zona cinza: o card aparecia (estrutura do DOM foi criada pelo cliente), mas os bindings ficavam quebrados porque o Angular tinha tentado reutilizar nós do DOM do servidor em posições erradas.

```
Servidor renderiza:          Cliente tenta hidratar:
┌──────────────────┐         ┌──────────────────┐
│  (empty state)   │    ≠    │  (skeleton)      │
│  Nenhum pedido   │         │  ░░░░░  ░░░░░░░  │
│  aqui            │         │  ░░░░░░░░░        │
└──────────────────┘         └──────────────────┘
         ↓
  Mismatch → bindings quebrados
```

## A solução: `afterNextRender`

O `afterNextRender` é uma função do Angular 17+ que registra um callback para rodar **apenas no browser**, **após o primeiro render**. Ao contrário do `ngOnInit`, ele não executa no servidor.

A ideia é simples: deixar o servidor e o cliente renderizarem o mesmo estado inicial (skeleton), e só depois que a hidratação estabilizar, executar a lógica de carregamento de dados.

```typescript
export class PedidosComponent {
  readonly loading = signal(true); // servidor e cliente começam iguais: skeleton

  constructor() {
    afterNextRender(() => {
      // Só chega aqui no browser, após hidratação completa
      if (this.auth.isAuthenticated()) {
        this.pedidoService.listar().pipe(catchError(() => of([]))).subscribe((pedidos) => {
          this._apiPedidos.set(pedidos);
          this.loading.set(false);
        });
      } else {
        this.loading.set(false); // mostra dados locais imediatamente
        const locais = this.pedidoLocalStorage.pedidos();
        if (locais.length === 0) return;
        forkJoin(
          locais.map(p =>
            this.pedidoService.buscarPorCodigo(p.codigo).pipe(catchError(() => of(p)))
          )
        ).subscribe((frescos) => {
          frescos.forEach(p => this.pedidoLocalStorage.salvar(p));
        });
      }
    });
  }
}
```

O fluxo correto agora:

```
Servidor renderiza:          Cliente hidrata:
┌──────────────────┐         ┌──────────────────┐
│  loading = true  │    =    │  loading = true  │
│  (skeleton)      │         │  (skeleton)      │
└──────────────────┘         └──────────────────┘
                                      ↓
                             Hidratação OK ✓
                                      ↓
                             afterNextRender dispara
                                      ↓
                             loading = false → cards
                             com dados do localStorage
```

## O padrão geral

Esse problema aparece sempre que um componente Angular SSR tenta carregar dados que **só existem no browser** (localStorage, sessionStorage, cookies via `document`, `window`, etc.) durante o ciclo de vida normal (`ngOnInit`, `ngAfterViewInit`).

A regra prática é:

| Onde buscar dado | O que usar |
|---|---|
| API pública (funciona no servidor) | `ngOnInit` ou `toSignal` |
| localStorage / sessionStorage | `afterNextRender` |
| Qualquer dado que causa mismatch | `afterNextRender` |

O `afterNextRender` garante três coisas:
1. Não executa no servidor → sem mismatch
2. Executa após a hidratação → DOM estável, bindings funcionando
3. É síncrono com o ciclo de mudança de signals → atualizações de signal dentro dele propagam normalmente

## Bônus: normalizar dados do localStorage

Descobri durante o debugging que o `localStorage` tinha os campos monetários como string (`"total": "142.70"`) porque o dado havia sido salvo antes de passar pelo `normalizar` do `PedidoService`. Para evitar que dados antigos quebrem a tela, adicionei normalização no próprio serviço de localStorage ao fazer `load()`:

```typescript
private normalizar(p: any): Pedido {
  return {
    ...p,
    status: typeof p.status === 'string'
      ? p.status.toLowerCase() as Pedido['status']
      : p.status,
    total:        typeof p.total        === 'string' ? parseFloat(p.total)        : (p.total        ?? 0),
    subtotal:     typeof p.subtotal     === 'string' ? parseFloat(p.subtotal)     : (p.subtotal     ?? 0),
    taxa_entrega: typeof p.taxa_entrega === 'string' ? parseFloat(p.taxa_entrega) : (p.taxa_entrega ?? 0),
    desconto:     typeof p.desconto     === 'string' ? parseFloat(p.desconto)     : (p.desconto     ?? 0),
    itens: (p.itens ?? []).map((item: any) => ({
      ...item,
      adicionais: item.adicionais ?? [],
      partes: (item.partes ?? []).map((parte: any) => ({
        ...parte,
        preco_unitario: typeof parte.preco_unitario === 'string'
          ? parseFloat(parte.preco_unitario)
          : (parte.preco_unitario ?? 0),
      })),
    })),
  };
}

private load(): Pedido[] {
  if (!isPlatformBrowser(this.platformId)) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const pedidos = JSON.parse(raw) as any[];
    return Array.isArray(pedidos)
      ? pedidos.map(p => this.normalizar(p)).sort(...)
      : [];
  } catch {
    return [];
  }
}
```

Isso faz o serviço ser resiliente a dados salvos em qualquer formato histórico.

---

O erro em si era sutil — o sintoma (card em branco com estrutura visível) não aponta diretamente pra hidratação SSR. Só ficou claro depois de descartar todas as outras hipóteses e perceber que o único componente que havia mudado na arquitetura era justamente o fluxo de inicialização que corria antes da hidratação estabilizar.
