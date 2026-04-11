import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { DecimalPipe } from '@angular/common';
import { switchMap, catchError, of, map, tap, forkJoin } from 'rxjs';
import { LojaService } from '../../core/services/loja.service';
import { CatalogoService } from '../../core/services/catalogo.service';
import { HorarioService } from '../../core/services/horario.service';
import { FavoritosService } from '../../core/services/favoritos.service';
import { AuthService } from '../../core/services/auth.service';
import { Produto, CategoriaProdutos, HorarioFuncionamento } from '../../core/models';

@Component({
  selector: 'app-loja-detalhe',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './loja-detalhe.component.html',
})
export class LojaDetalheComponent {
  private route = inject(ActivatedRoute);
  private lojaService = inject(LojaService);
  private catalogoService = inject(CatalogoService);
  private horarioService = inject(HorarioService);
  private favService = inject(FavoritosService);
  readonly auth = inject(AuthService);

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

  // Horários de funcionamento
  readonly _horarios = toSignal(
    this.route.paramMap.pipe(
      map((p) => p.get('slug')!),
      switchMap((slug) =>
        this.lojaService.buscarPorSlug(slug).pipe(
          switchMap((loja) =>
            this.horarioService.listarPorLoja(loja.uuid).pipe(
              catchError(() => of([])),
            ),
          ),
          catchError(() => of([])),
        ),
      ),
    ),
  );

  readonly horarios = computed(() => this._horarios() ?? []);
  readonly diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  // Verificar se a loja está aberta agora (horário de Brasília)
  readonly lojaAbertaAgora = computed(() => {
    const horarios = this.horarios();
    if (!horarios || horarios.length === 0) {
      // Se não tem horários, usa o campo 'ativa' da loja
      return this.loja()?.ativa ?? false;
    }

    // Obter hora atual de Brasília (UTC-3)
    const agoraUTC = new Date();
    const offsetBrasilia = -3; // UTC-3
    const offsetLocal = agoraUTC.getTimezoneOffset(); // em minutos
    const offsetBrasiliaMin = offsetBrasilia * 60; // em segundos
    const agoraBrasilia = new Date(agoraUTC.getTime() + (offsetBrasiliaMin + offsetLocal * 60) * 1000);
    
    const diaSemana = agoraBrasilia.getDay(); // 0=Domingo, 1=Segunda, ..., 6=Sábado
    const horaAtual = agoraBrasilia.getHours();
    const minutoAtual = agoraBrasilia.getMinutes();
    const minutoDoDia = horaAtual * 60 + minutoAtual; // Total de minutos desde 00:00

    // Encontrar horário do dia atual
    const horarioDoDia = horarios.find(h => h.dia_semana === diaSemana && h.ativo);
    
    if (!horarioDoDia) {
      return false; // Loja fechada neste dia
    }

    // Converter horários de abertura e fechamento para minutos
    const [aberturaHora, aberturaMinuto] = horarioDoDia.abertura.split(':').map(Number);
    const [fechamentoHora, fechamentoMinuto] = horarioDoDia.fechamento.split(':').map(Number);
    
    const minutoAbertura = aberturaHora * 60 + aberturaMinuto;
    const minutoFechamento = fechamentoHora * 60 + fechamentoMinuto;

    // Verificar se está dentro do horário
    return minutoDoDia >= minutoAbertura && minutoDoDia <= minutoFechamento;
  });

  // Catálogo: Categorias e Produtos
  readonly _categorias = toSignal(
    this.route.paramMap.pipe(
      map((p) => p.get('slug')!),
      switchMap((slug) =>
        this.lojaService.buscarPorSlug(slug).pipe(
          switchMap((loja) =>
            this.catalogoService.listarCategorias(loja.uuid).pipe(
              catchError(() => of([])),
            ),
          ),
          catchError(() => of([])),
        ),
      ),
    ),
  );

  readonly categorias = computed(() => (this._categorias() ?? []).sort((a, b) => a.ordem - b.ordem));

  readonly _produtos = toSignal(
    this.route.paramMap.pipe(
      map((p) => p.get('slug')!),
      switchMap((slug) =>
        this.lojaService.buscarPorSlug(slug).pipe(
          switchMap((loja) =>
            this.catalogoService.listarProdutosPorLoja(loja.uuid).pipe(
              catchError(() => of([])),
            ),
          ),
          catchError(() => of([])),
        ),
      ),
    ),
  );

  readonly produtosLoading = computed(() => this._produtos() === undefined);
  readonly produtos = computed(() => this._produtos() ?? []);
  readonly destaques = computed(() => this.produtos().filter((p) => p.destaque && p.disponivel));
  readonly disponiveis = computed(() => this.produtos().filter((p) => p.disponivel));

  // Agrupar produtos por categoria
  readonly produtosPorCategoria = computed(() => {
    const cats = this.categorias();
    const prods = this.produtos().filter((p) => p.disponivel);
    
    console.log('📊 Categorias:', cats);
    console.log('📦 Produtos disponíveis:', prods);
    
    const grouped = cats
      .map((cat) => {
        const catProds = prods.filter((p) => p.categoria_uuid === cat.uuid);
        console.log(`📂 Categoria ${cat.nome} (${cat.uuid}): ${catProds.length} produtos`, catProds);
        return {
          categoria: cat,
          produtos: catProds,
        };
      })
      .filter((group) => group.produtos.length > 0);
    
    console.log('📊 Grupos finais:', grouped);
    return grouped;
  });

  toggleFav() {
    const l = this.loja();
    if (!l) return;
    if (this.favorita()) {
      this.favService.remover(l.uuid)
        .subscribe(() => this.favorita.set(false));
    } else {
      this.favService.adicionar(l.uuid)
        .subscribe(() => this.favorita.set(true));
    }
  }

  selecionarProduto(p: Produto) {
    // TODO: modal de carrinho
    console.log('Produto selecionado:', p.nome);
  }

  formatarDia(dia: number): string {
    return this.diasSemana[dia] || '';
  }
}
