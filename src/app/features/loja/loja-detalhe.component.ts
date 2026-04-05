import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { DecimalPipe } from '@angular/common';
import { switchMap, catchError, of, map, tap, forkJoin } from 'rxjs';
import { LojaService } from '../../core/services/loja.service';
import { ProdutoService } from '../../core/services/produto.service';
import { FavoritosService } from '../../core/services/favoritos.service';
import { AuthService } from '../../core/services/auth.service';
import { Produto } from '../../core/models';

@Component({
  selector: 'app-loja-detalhe',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './loja-detalhe.component.html',
})
export class LojaDetalheComponent {
  private route          = inject(ActivatedRoute);
  private lojaService    = inject(LojaService);
  private produtoService = inject(ProdutoService);
  private favService     = inject(FavoritosService);
  readonly auth          = inject(AuthService);

  readonly skeletons = Array(6);
  readonly favorita  = signal(false);

  readonly loja = toSignal(
    this.route.paramMap.pipe(
      map((p) => p.get('slug')!),
      switchMap((slug) =>
        this.lojaService.buscarPorSlug(slug).pipe(
          tap((loja) => {
            if (this.auth.isAuthenticated()) {
              this.favService.verificar(loja.uuid).subscribe({
                next: (res) => this.favorita.set(res.favorita ?? false),
                error: () => this.favorita.set(false),
              });
            }
          }),
          catchError(() => of(null)),
        ),
      ),
    ),
  );

  readonly lojaLoading = computed(() => this.loja() === undefined);

  readonly _produtos = toSignal(
    this.produtoService.listar().pipe(catchError(() => of([]))),
  );

  readonly produtosLoading = computed(() => this._produtos() === undefined);
  readonly produtos        = computed(() => this._produtos() ?? []);
  readonly destaques       = computed(() => this.produtos().filter((p) => p.destaque && p.disponivel));
  readonly disponiveis     = computed(() => this.produtos().filter((p) => p.disponivel));

  toggleFav() {
    const l = this.loja();
    if (!l) return;
    if (this.favorita()) {
      this.favService.remover(l.uuid).subscribe(() => this.favorita.set(false));
    } else {
      this.favService.adicionar(l.uuid).subscribe(() => this.favorita.set(true));
    }
  }

  selecionarProduto(p: Produto) {
    // TODO: modal de carrinho
    console.log('Produto selecionado:', p.nome);
  }
}
