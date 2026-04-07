import { Component, inject, signal, computed, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DecimalPipe, DatePipe } from '@angular/common';
import { BehaviorSubject, catchError, of, switchMap, debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { NgxSonnerToaster, toast } from 'ngx-sonner';
import { AdminService } from '../../core/services/admin.service';
import { CatalogoService } from '../../core/services/catalogo.service';
import { LojaService } from '../../core/services/loja.service';
import { Loja, Funcionario, Entregador, CategoriaProdutos, Produto, CreateCategoriaRequest } from '../../core/models';

@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule, DecimalPipe, DatePipe, NgxSonnerToaster],
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  private adminService = inject(AdminService);
  private catalogoService = inject(CatalogoService);
  private lojaService = inject(LojaService);
  private fb = inject(FormBuilder);

  readonly aba  = signal('lojas');
  readonly tabs = [
    { id: 'lojas',    label: '🏪 Lojas'     },
    { id: 'equipe',   label: '👥 Equipe'    },
    { id: 'catalogo', label: '📦 Catálogo'  },
  ];

  // ── Lojas ──────────────────────────────────────────────────────────────────

  lojaForm = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    slug: ['', [Validators.required, Validators.pattern(/^[a-z0-9-]+$/)]],
    email_contato: ['', [Validators.required, Validators.email]],
    descricao: [''],
    taxa_entrega_base: [5, [Validators.min(0)]],
    pedido_minimo: [20, [Validators.min(0)]],
    tempo_medio: [30, [Validators.min(1)]],
    max_partes: [4, [Validators.min(1), Validators.max(8)]],
  });

  // ── Slug verification ──────────────────────────────────────────────
  slugChecking = signal(false);
  slugAvailable = signal<boolean | null>(null);
  slugMessage = signal('');

  constructor() {
    // Monitor slug field changes with debounce
    const slugControl = this.lojaForm.get('slug');
    if (slugControl) {
      slugControl.valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        filter((slug): slug is string => slug != null && slug.length > 0),
        switchMap(slug => {
          this.slugChecking.set(true);
          this.slugAvailable.set(null);
          this.slugMessage.set('');
          return this.lojaService.verificarSlug(slug).pipe(
            catchError(() => {
              this.slugChecking.set(false);
              this.slugAvailable.set(null);
              this.slugMessage.set('Erro ao verificar slug.');
              return of(null);
            })
          );
        }),
        filter((result): result is { disponivel: boolean; slug: string } => result !== null)
      ).subscribe(result => {
        this.slugChecking.set(false);
        this.slugAvailable.set(result.disponivel);
        this.slugMessage.set(result.disponivel ? 'Slug disponível!' : 'Slug já está em uso.');
      });
    }

    // Auto-load products when categories change
    effect(() => {
      const cats = this.categorias();
      if (cats.length > 0) {
        this.carregarTodosProdutos();
      } else {
        this.produtosPorCategoria.set(new Map());
      }
    });
  }

  lojaLoading = signal(false);
  lojaError   = signal('');
  lojaSuccess = signal('');

  lojaSelecionada = signal<Loja | null>(null);

  private readonly refreshTrigger = new BehaviorSubject<void>(undefined);

  private readonly _lojas = toSignal(
    this.refreshTrigger.pipe(
      switchMap(() => this.adminService.listarLojas()),
      catchError(() => of([])),
    ),
  );
  readonly lojasLoading = computed(() => this._lojas() === undefined);
  readonly lojas        = computed(() => this._lojas() ?? []);

  private refreshLojas() {
    this.refreshTrigger.next();
  }

  get fl() {
    return this.lojaForm.controls;
  }

  criarLoja() {
    if (this.lojaForm.invalid) {
      this.lojaForm.markAllAsTouched();
      this.lojaError.set('Preencha todos os campos obrigatórios corretamente.');
      return;
    }
    this.lojaLoading.set(true);
    this.lojaError.set('');
    this.lojaSuccess.set('');
    const fv = this.lojaForm.value;
    this.adminService.criarLoja({
      nome: fv.nome!,
      slug: fv.slug!,
      email_contato: fv.email_contato!,
      descricao: fv.descricao || null,
      taxa_entrega_base: fv.taxa_entrega_base ?? 5,
      pedido_minimo: fv.pedido_minimo ?? 20,
      tempo_medio: fv.tempo_medio ?? 30,
      nota_media: 0,
      max_partes: fv.max_partes ?? 4,
    }).subscribe({
      next: (l) => {
        this.lojaLoading.set(false);
        this.lojaSuccess.set(`Loja "${l.nome}" criada com sucesso!`);
        this.lojaForm.reset({
          taxa_entrega_base: 5,
          pedido_minimo: 20,
          tempo_medio: 30,
          max_partes: 4,
        });
        this.slugChecking.set(false);
        this.slugAvailable.set(null);
        this.slugMessage.set('');
        this.refreshLojas();
      },
      error: (e) => {
        this.lojaLoading.set(false);
        this.lojaError.set(e?.error?.error ?? 'Erro ao criar loja.');
      },
    });
  }

  selecionarLoja(l: Loja) {
    this.lojaSelecionada.set(l);
    this.aba.set('equipe');
  }

  // ── Equipe: Funcionários ──────────────────────────────────────────────────

  private readonly refreshFuncTrigger = new BehaviorSubject<void>(undefined);

  private readonly _funcionarios = toSignal(
    this.refreshFuncTrigger.pipe(
      switchMap(() => {
        const loja = this.lojaSelecionada();
        if (!loja) return of([] as Funcionario[]);
        return this.adminService.listarFuncionarios(loja.uuid).pipe(
          catchError(() => of([] as Funcionario[])),
        );
      }),
    ),
    { initialValue: [] as Funcionario[] },
  );
  readonly funcLoading = computed(() => this._funcionarios() === undefined);
  readonly funcionarios = computed(() => this._funcionarios() ?? []);

  private refreshFuncionarios() {
    this.refreshFuncTrigger.next();
  }

  // ── Equipe: Entregadores ──────────────────────────────────────────────────

  private readonly refreshEntregTrigger = new BehaviorSubject<void>(undefined);

  private readonly _entregadores = toSignal(
    this.refreshEntregTrigger.pipe(
      switchMap(() => {
        const loja = this.lojaSelecionada();
        if (!loja) return of([] as Entregador[]);
        return this.adminService.listarEntregadores(loja.uuid).pipe(
          catchError(() => of([] as Entregador[])),
        );
      }),
    ),
    { initialValue: [] as Entregador[] },
  );
  readonly entregLoadingList = computed(() => this._entregadores() === undefined);
  readonly entregadores = computed(() => this._entregadores() ?? []);

  private refreshEntregadores() {
    this.refreshEntregTrigger.next();
  }

  // ── Funcionários ──────────────────────────────────────────────────────────

  funcForm = this.fb.group({
    nome:          ['', Validators.required],
    username:      ['', [Validators.required, Validators.minLength(3)]],
    email:         ['', [Validators.required, Validators.email]],
    senha:         ['', [Validators.required, Validators.minLength(6)]],
    celular:       ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
    cargo:         [''],
    salario:       [0, [Validators.required, Validators.min(0)]],
    data_admissao: ['', Validators.required],
  });

  equipeLoading = signal(false);
  equipeError   = signal('');

  get ff() {
    return this.funcForm.controls;
  }

  adicionarFuncionario() {
    const loja = this.lojaSelecionada();
    if (!loja) return;
    if (this.funcForm.invalid) {
      this.funcForm.markAllAsTouched();
      this.equipeError.set('Preencha todos os campos obrigatórios corretamente.');
      return;
    }
    this.equipeLoading.set(true);
    this.equipeError.set('');
    const fv = this.funcForm.value;
    this.adminService.adicionarFuncionario(loja.uuid, {
      nome:          fv.nome!,
      username:      fv.username!,
      email:         fv.email!,
      senha:         fv.senha!,
      celular:       fv.celular!,
      cargo:         fv.cargo || null,
      salario:       fv.salario!,
      data_admissao: fv.data_admissao!,
    }).subscribe({
      next: () => {
        this.equipeLoading.set(false);
        toast.success('Funcionário adicionado com sucesso!');
        this.funcForm.reset({ salario: 0 });
        this.refreshFuncionarios();
      },
      error: (e) => {
        this.equipeLoading.set(false);
        this.equipeError.set(e?.error?.error ?? 'Erro ao adicionar funcionário.');
      },
    });
  }

  // ── Entregadores ──────────────────────────────────────────────────────────

  entregForm = this.fb.group({
    nome:     ['', Validators.required],
    username: ['', [Validators.required, Validators.minLength(3)]],
    email:    ['', [Validators.required, Validators.email]],
    senha:    ['', [Validators.required, Validators.minLength(6)]],
    celular:  ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
    veiculo:  [''],
    placa:    [''],
  });

  entregLoading = signal(false);
  entregError   = signal('');

  get ef() {
    return this.entregForm.controls;
  }

  adicionarEntregador() {
    const loja = this.lojaSelecionada();
    if (!loja) return;
    if (this.entregForm.invalid) {
      this.entregForm.markAllAsTouched();
      this.entregError.set('Preencha todos os campos obrigatórios corretamente.');
      return;
    }
    this.entregLoading.set(true);
    this.entregError.set('');
    const fv = this.entregForm.value;
    this.adminService.adicionarEntregador(loja.uuid, {
      nome:     fv.nome!,
      username: fv.username!,
      email:    fv.email!,
      senha:    fv.senha!,
      celular:  fv.celular!,
      veiculo:  fv.veiculo || null,
      placa:    fv.placa || null,
    }).subscribe({
      next: () => {
        this.entregLoading.set(false);
        toast.success('Entregador adicionado com sucesso!');
        this.entregForm.reset();
        this.refreshEntregadores();
      },
      error: (e) => {
        this.entregLoading.set(false);
        this.entregError.set(e?.error?.error ?? 'Erro ao adicionar entregador.');
      },
    });
  }

  // ── Catálogo: Categorias ──────────────────────────────────────────────────

  private readonly refreshCatTrigger = new BehaviorSubject<void>(undefined);

  private readonly _categorias = toSignal(
    this.refreshCatTrigger.pipe(
      switchMap(() => {
        const loja = this.lojaSelecionada();
        if (!loja) return of([] as CategoriaProdutos[]);
        return this.catalogoService.listarCategorias(loja.uuid).pipe(
          catchError(() => of([] as CategoriaProdutos[])),
        );
      }),
    ),
    { initialValue: [] as CategoriaProdutos[] },
  );
  readonly catLoading = computed(() => this._categorias() === undefined);
  readonly categorias = computed(() => this._categorias() ?? []);

  // Products per category (map of category UUID -> products)
  readonly produtosPorCategoria = signal<Map<string, Produto[]>>(new Map());

  private refreshCategorias() {
    this.refreshCatTrigger.next();
  }

  // Load products for a specific category
  carregarProdutosDaCategoria(categoriaUuid: string) {
    const loja = this.lojaSelecionada();
    if (!loja) return;
    
    this.catalogoService.listarProdutosPorCategoria(categoriaUuid).pipe(
      catchError(() => of([] as Produto[]))
    ).subscribe(produtos => {
      const currentMap = this.produtosPorCategoria();
      const newMap = new Map(currentMap);
      newMap.set(categoriaUuid, produtos);
      this.produtosPorCategoria.set(newMap);
    });
  }

  // Load products for all categories
  carregarTodosProdutos() {
    const cats = this.categorias();
    cats.forEach(cat => this.carregarProdutosDaCategoria(cat.uuid));
  }

  catForm = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    descricao: [''],
    ordem: [0, [Validators.min(0)]],
  });

  catLoadingSubmit = signal(false);
  catError = signal('');
  catEditId = signal<string | null>(null);

  get fc() {
    return this.catForm.controls;
  }

  criarCategoria() {
    const loja = this.lojaSelecionada();
    if (!loja) return;
    if (this.catForm.invalid) {
      this.catForm.markAllAsTouched();
      return;
    }
    this.catLoadingSubmit.set(true);
    this.catError.set('');
    const fv = this.catForm.value;
    const body: CreateCategoriaRequest = {
      nome: fv.nome!,
      descricao: fv.descricao || null,
      ordem: fv.ordem ?? 0,
    };
    this.catalogoService.criarCategoria(loja.uuid, body).subscribe({
      next: () => {
        this.catLoadingSubmit.set(false);
        toast.success('Categoria criada com sucesso!');
        this.catForm.reset({ ordem: 0 });
        this.refreshCategorias();
      },
      error: (e) => {
        this.catLoadingSubmit.set(false);
        this.catError.set(e?.error?.error ?? 'Erro ao criar categoria.');
      },
    });
  }

  editarCategoria(cat: CategoriaProdutos) {
    this.catEditId.set(cat.uuid);
    this.catForm.patchValue({
      nome: cat.nome,
      descricao: cat.descricao ?? '',
      ordem: cat.ordem,
    });
    this.catError.set('');
  }

  salvarEdicaoCategoria() {
    const loja = this.lojaSelecionada();
    const uuid = this.catEditId();
    if (!loja || !uuid) return;
    if (this.catForm.invalid) {
      this.catForm.markAllAsTouched();
      return;
    }
    this.catLoadingSubmit.set(true);
    this.catError.set('');
    const fv = this.catForm.value;
    this.catalogoService.atualizarCategoria(loja.uuid, uuid, {
      nome: fv.nome!,
      descricao: fv.descricao || null,
      ordem: fv.ordem ?? 0,
    }).subscribe({
      next: () => {
        this.catLoadingSubmit.set(false);
        this.catEditId.set(null);
        toast.success('Categoria atualizada com sucesso!');
        this.catForm.reset({ ordem: 0 });
        this.refreshCategorias();
      },
      error: (e) => {
        this.catLoadingSubmit.set(false);
        this.catError.set(e?.error?.error ?? 'Erro ao atualizar categoria.');
      },
    });
  }

  cancelarEdicaoCategoria() {
    this.catEditId.set(null);
    this.catForm.reset({ ordem: 0 });
    this.catError.set('');
  }

  deletarCategoria(uuid: string, nome: string) {
    if (!confirm(`Deletar categoria "${nome}"? Apenas funciona se não houver produtos vinculados.`)) return;
    const loja = this.lojaSelecionada();
    if (!loja) return;
    this.catalogoService.deletarCategoria(loja.uuid, uuid).subscribe({
      next: () => {
        toast.success('Categoria deletada com sucesso!');
        this.refreshCategorias();
      },
      error: (e) => {
        toast.error(e?.error?.error ?? 'Erro ao deletar categoria.');
      },
    });
  }

  // ── Catálogo: Produtos ────────────────────────────────────────────────────

  prodForm = this.fb.group({
    categoria_uuid: ['', Validators.required],
    nome: ['', [Validators.required, Validators.minLength(2)]],
    descricao: [''],
    preco: [0, [Validators.required, Validators.min(0)]],
    tempo_preparo_min: [30, [Validators.required, Validators.min(1)]],
    destaque: [false],
    disponivel: [true],
  });

  prodLoading = signal(false);
  prodError = signal('');
  prodImagem = signal<File | null>(null);
  prodImagemPreview = signal<string | null>(null);
  prodEditId = signal<string | null>(null);

  get fp() {
    return this.prodForm.controls;
  }

  onImagemSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.prodImagem.set(file);
    // Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.prodImagemPreview.set(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  criarProduto() {
    const loja = this.lojaSelecionada();
    if (!loja) return;
    if (this.prodForm.invalid) {
      this.prodForm.markAllAsTouched();
      return;
    }
    this.prodLoading.set(true);
    this.prodError.set('');
    const fv = this.prodForm.value;
    this.catalogoService.criarProduto({
      loja_uuid: loja.uuid,
      categoria_uuid: fv.categoria_uuid!,
      nome: fv.nome!,
      descricao: fv.descricao || null,
      preco: fv.preco!,
      tempo_preparo_min: fv.tempo_preparo_min ?? 30,
      destaque: fv.destaque ?? false,
      disponivel: fv.disponivel ?? true,
    }).subscribe({
      next: (prod) => {
        // Upload de imagem se houver
        const imgFile = this.prodImagem();
        if (imgFile) {
          this.catalogoService.uploadImagemProduto(prod.uuid, imgFile).subscribe({
            next: () => {
              toast.success('Produto e imagem criados com sucesso!');
              this.prodForm.reset({ preco: 0, tempo_preparo_min: 30, destaque: false, disponivel: true });
              this.prodImagem.set(null);
              this.prodImagemPreview.set(null);
              // Refresh products for this category
              const catUuid = fv.categoria_uuid!;
              this.carregarProdutosDaCategoria(catUuid);
            },
            error: (e) => {
              toast.success('Produto criado, mas falha ao enviar imagem.');
              this.prodLoading.set(false);
            },
          });
        } else {
          toast.success('Produto criado com sucesso!');
          this.prodLoading.set(false);
          this.prodForm.reset({ preco: 0, tempo_preparo_min: 30, destaque: false, disponivel: true });
          this.prodImagem.set(null);
          this.prodImagemPreview.set(null);
          // Refresh products for this category
          const catUuid = fv.categoria_uuid!;
          this.carregarProdutosDaCategoria(catUuid);
        }
      },
      error: (e) => {
        this.prodLoading.set(false);
        this.prodError.set(e?.error?.error ?? 'Erro ao criar produto.');
      },
    });
  }

  editarProduto(prod: Produto) {
    this.prodEditId.set(prod.uuid);
    this.prodForm.patchValue({
      categoria_uuid: prod.categoria_uuid ?? '',
      nome: prod.nome,
      descricao: prod.descricao ?? '',
      preco: prod.preco,
      tempo_preparo_min: prod.tempo_preparo_min,
      destaque: prod.destaque ?? false,
      disponivel: prod.disponivel ?? true,
    });
    this.prodError.set('');
    // Clear image preview
    this.prodImagem.set(null);
    this.prodImagemPreview.set(null);
  }

  salvarEdicaoProduto() {
    const loja = this.lojaSelecionada();
    const uuid = this.prodEditId();
    if (!loja || !uuid) return;
    if (this.prodForm.invalid) {
      this.prodForm.markAllAsTouched();
      return;
    }
    this.prodLoading.set(true);
    this.prodError.set('');
    const fv = this.prodForm.value;
    this.catalogoService.atualizarProduto(uuid, {
      categoria_uuid: fv.categoria_uuid ?? undefined,
      nome: fv.nome!,
      descricao: fv.descricao || null,
      preco: fv.preco!,
      tempo_preparo_min: fv.tempo_preparo_min ?? 30,
      destaque: fv.destaque ?? false,
      disponivel: fv.disponivel ?? true,
    }).subscribe({
      next: (prod) => {
        // Upload de imagem se houver
        const imgFile = this.prodImagem();
        if (imgFile) {
          this.catalogoService.uploadImagemProduto(prod.uuid, imgFile).subscribe({
            next: () => {
              toast.success('Produto e imagem atualizados com sucesso!');
              this.prodLoading.set(false);
              this.prodEditId.set(null);
              this.prodForm.reset({ preco: 0, tempo_preparo_min: 30, destaque: false, disponivel: true });
              this.prodImagem.set(null);
              this.prodImagemPreview.set(null);
              // Refresh products for this category
              const catUuid = fv.categoria_uuid!;
              this.carregarProdutosDaCategoria(catUuid);
            },
            error: (e) => {
              toast.success('Produto atualizado, mas falha ao enviar imagem.');
              this.prodLoading.set(false);
            },
          });
        } else {
          toast.success('Produto atualizado com sucesso!');
          this.prodLoading.set(false);
          this.prodEditId.set(null);
          this.prodForm.reset({ preco: 0, tempo_preparo_min: 30, destaque: false, disponivel: true });
          this.prodImagem.set(null);
          this.prodImagemPreview.set(null);
          // Refresh products for this category
          const catUuid = fv.categoria_uuid!;
          this.carregarProdutosDaCategoria(catUuid);
        }
      },
      error: (e) => {
        this.prodLoading.set(false);
        this.prodError.set(e?.error?.error ?? 'Erro ao atualizar produto.');
      },
    });
  }

  cancelarEdicaoProduto() {
    this.prodEditId.set(null);
    this.prodForm.reset({ preco: 0, tempo_preparo_min: 30, destaque: false, disponivel: true });
    this.prodImagem.set(null);
    this.prodImagemPreview.set(null);
    this.prodError.set('');
  }

  deletarProduto(uuid: string, nome: string, categoriaUuid?: string) {
    if (!confirm(`Deletar produto "${nome}"? Esta ação não pode ser desfeita.`)) return;
    this.catalogoService.deletarProduto(uuid).subscribe({
      next: () => {
        toast.success('Produto deletado com sucesso!');
        // Refresh products for this category if provided
        if (categoriaUuid) {
          this.carregarProdutosDaCategoria(categoriaUuid);
        } else {
          this.carregarTodosProdutos();
        }
      },
      error: (e) => {
        toast.error(e?.error?.error ?? 'Erro ao deletar produto.');
      },
    });
  }
}
