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
import { AuthService } from '../../core/services/auth.service';
import { MarketingService } from '../../core/services/marketing.service';
import { ConfigPedidoService } from '../../core/services/config-pedido.service';
import { PhoneMaskDirective } from '../../shared/directives/phone-mask.directive';
import { Loja, Funcionario, Entregador, CategoriaProdutos, Produto, CreateCategoriaRequest, UpdateFuncionarioRequest, UpdateEntregadorRequest, Adicional, CreateAdicionalRequest, EnderecoLoja, CreateEnderecoLojaRequest, UpdateEnderecoLojaRequest, HorarioFuncionamento, CreateHorarioFuncionamentoRequest, Cupom, CreateCupomRequest, UpdateCupomRequest, TipoDesconto, StatusCupom, ConfiguracaoDePedidosLoja, TipoCalculoPedido, AvaliacaoDeLoja } from '../../core/models';

@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule, DecimalPipe, DatePipe, NgxSonnerToaster, PhoneMaskDirective],
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  private adminService = inject(AdminService);
  private catalogoService = inject(CatalogoService);
  private lojaService = inject(LojaService);
  private authService = inject(AuthService);
  private marketingService = inject(MarketingService);
  private configPedidoService = inject(ConfigPedidoService);
  private fb = inject(FormBuilder);

  readonly aba  = signal('lojas');
  readonly tabs = [
    { id: 'lojas',       label: '🏪 Lojas'     },
    { id: 'equipe',      label: '👥 Equipe'    },
    { id: 'catalogo',    label: '📦 Catálogo'  },
    { id: 'adicionais',  label: '🧀 Adicionais' },
    { id: 'cupons',      label: '🎟️ Cupons'    },
    { id: 'avaliacoes',  label: '⭐ Avaliações' },
    { id: 'config-pedido', label: '⚙️ Config Pedido' },
    { id: 'enderecos',   label: '📍 Endereços' },
    { id: 'horarios',    label: '🕐 Horários'  },
  ];

  // ── Lojas ──────────────────────────────────────────────────────────────────

  lojaForm = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    slug: ['', [Validators.required, Validators.pattern(/^[a-z0-9-]+$/)]],
    email_contato: ['', [Validators.required, Validators.email]],
    celular: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
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
      celular: fv.celular!,
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
    this.refreshFuncionarios();
    this.refreshEntregadores();
    this.refreshAdicionais();
    this.refreshCategorias();
    this.refreshEnderecos();
    this.refreshHorarios();
    this.refreshCupons();
    this.refreshAvaliacoes();
  }

  // ── Avaliações de Loja ──────────────────────────────────────────────────

  private readonly refreshAvaliacoesTrigger = new BehaviorSubject<void>(undefined);

  private readonly _avaliacoes = toSignal(
    this.refreshAvaliacoesTrigger.pipe(
      switchMap(() => {
        const loja = this.lojaSelecionada();
        if (!loja) return of([] as AvaliacaoDeLoja[]);
        return this.marketingService.listarAvaliacoesLoja(loja.uuid).pipe(
          catchError(() => of([] as AvaliacaoDeLoja[])),
        );
      }),
    ),
    { initialValue: [] as AvaliacaoDeLoja[] },
  );
  readonly avaliacoesLoading = computed(() => this._avaliacoes() === undefined);
  readonly avaliacoes = computed(() => this._avaliacoes() ?? []);

  readonly notaMedia = computed(() => {
    const avaliacoes = this.avaliacoes();
    if (!avaliacoes || avaliacoes.length === 0) return null;
    const soma = avaliacoes.reduce((acc, a) => acc + this.toNumber(a.nota), 0);
    return parseFloat((soma / avaliacoes.length).toFixed(1));
  });

  readonly distribuicaoNotas = computed(() => {
    const avaliacoes = this.avaliacoes();
    if (!avaliacoes || avaliacoes.length === 0) return null;
    const distribuicao = [0, 0, 0, 0, 0]; // 1-5 estrelas
    avaliacoes.forEach((a) => {
      const nota = Math.round(this.toNumber(a.nota));
      const idx = nota - 1;
      if (idx >= 0 && idx < 5) distribuicao[idx]++;
    });
    return distribuicao;
  });

  private refreshAvaliacoes() {
    this.refreshAvaliacoesTrigger.next();
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
    celular:       ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
    cargo:         [''],
    salario:       [0, [Validators.required, Validators.min(0)]],
    data_admissao: ['', Validators.required],
  });

  // Funcionario email/username verification
  funcEmailChecking = signal(false);
  funcEmailAvailable = signal<boolean | null>(null);
  funcUsernameChecking = signal(false);
  funcUsernameAvailable = signal<boolean | null>(null);

  equipeLoading = signal(false);
  equipeError   = signal('');

  get ff() {
    return this.funcForm.controls;
  }

  get funcFormReady(): boolean {
    const emailOk = this.funcEmailAvailable() === true;
    const usernameOk = this.funcUsernameAvailable() === true;
    return emailOk && usernameOk && this.funcForm.valid;
  }

  constructor() {
    // Monitor funcionario email changes with debounce
    const funcEmailControl = this.funcForm.get('email');
    if (funcEmailControl) {
      funcEmailControl.valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        filter((email): email is string => {
          const emailValid = this.funcForm.get('email')?.valid ?? false;
          return email != null && email.length > 0 && emailValid;
        }),
        switchMap(email => {
          this.funcEmailChecking.set(true);
          this.funcEmailAvailable.set(null);
          return this.authService.verificarEmail(email).pipe(
            catchError(() => {
              this.funcEmailChecking.set(false);
              this.funcEmailAvailable.set(null);
              return of({ disponivel: false });
            })
          );
        })
      ).subscribe(result => {
        this.funcEmailChecking.set(false);
        this.funcEmailAvailable.set(result.disponivel);
      });
    }

    // Monitor funcionario username changes with debounce
    const funcUsernameControl = this.funcForm.get('username');
    if (funcUsernameControl) {
      funcUsernameControl.valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        filter((username): username is string => username != null && username.length >= 3),
        switchMap(username => {
          this.funcUsernameChecking.set(true);
          this.funcUsernameAvailable.set(null);
          return this.authService.verificarUsername(username).pipe(
            catchError(() => {
              this.funcUsernameChecking.set(false);
              this.funcUsernameAvailable.set(null);
              return of({ disponivel: false });
            })
          );
        })
      ).subscribe(result => {
        this.funcUsernameChecking.set(false);
        this.funcUsernameAvailable.set(result.disponivel);
      });
    }

    // Monitor entregador email changes with debounce
    const entregEmailControl = this.entregForm.get('email');
    if (entregEmailControl) {
      entregEmailControl.valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        filter((email): email is string => {
          const emailValid = this.entregForm.get('email')?.valid ?? false;
          return email != null && email.length > 0 && emailValid;
        }),
        switchMap(email => {
          this.entregEmailChecking.set(true);
          this.entregEmailAvailable.set(null);
          return this.authService.verificarEmail(email).pipe(
            catchError(() => {
              this.entregEmailChecking.set(false);
              this.entregEmailAvailable.set(null);
              return of({ disponivel: false });
            })
          );
        })
      ).subscribe(result => {
        this.entregEmailChecking.set(false);
        this.entregEmailAvailable.set(result.disponivel);
      });
    }

    // Monitor entregador username changes with debounce
    const entregUsernameControl = this.entregForm.get('username');
    if (entregUsernameControl) {
      entregUsernameControl.valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        filter((username): username is string => username != null && username.length >= 3),
        switchMap(username => {
          this.entregUsernameChecking.set(true);
          this.entregUsernameAvailable.set(null);
          return this.authService.verificarUsername(username).pipe(
            catchError(() => {
              this.entregUsernameChecking.set(false);
              this.entregUsernameAvailable.set(null);
              return of({ disponivel: false });
            })
          );
        })
      ).subscribe(result => {
        this.entregUsernameChecking.set(false);
        this.entregUsernameAvailable.set(result.disponivel);
      });
    }

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

    // Monitor tipo_desconto changes to handle frete_gratis
    const tipoDescontoControl = this.cupomForm.get('tipo_desconto');
    if (tipoDescontoControl) {
      tipoDescontoControl.valueChanges.subscribe(tipo => {
        const valorDescontoControl = this.cupomForm.get('valor_desconto');
        const valorMinimoControl = this.cupomForm.get('valor_minimo');
        
        if (tipo === 'frete_gratis') {
          // Set values to 0 and disable for frete_gratis
          valorDescontoControl?.setValue(0);
          valorMinimoControl?.setValue(0);
          valorDescontoControl?.disable();
          valorMinimoControl?.disable();
          // Remove required validators for frete_gratis
          valorDescontoControl?.clearValidators();
          valorMinimoControl?.clearValidators();
        } else {
          // Enable and add validators for other types
          valorDescontoControl?.enable();
          valorMinimoControl?.enable();
          valorDescontoControl?.setValidators([Validators.required, Validators.min(0)]);
          valorMinimoControl?.setValidators([Validators.required, Validators.min(0)]);
        }
        valorDescontoControl?.updateValueAndValidity();
        valorMinimoControl?.updateValueAndValidity();
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

    // Auto-load adicionais when tab changes to 'adicionais'
    effect(() => {
      const aba = this.aba();
      const loja = this.lojaSelecionada();
      if (aba === 'adicionais' && loja) {
        this.refreshAdicionais();
      }
    });

    // Auto-load cupons when tab changes to 'cupons'
    effect(() => {
      const aba = this.aba();
      if (aba === 'cupons') {
        this.refreshCupons();
      }
    });

    // Auto-load avaliacoes when tab changes to 'avaliacoes'
    effect(() => {
      const aba = this.aba();
      const loja = this.lojaSelecionada();
      if (aba === 'avaliacoes' && loja) {
        this.refreshAvaliacoes();
      }
    });

    // Auto-load config-pedido when tab changes to 'config-pedido'
    let configPedidoLoaded = false;
    effect(() => {
      const aba = this.aba();
      if (aba === 'config-pedido' && !configPedidoLoaded) {
        configPedidoLoaded = true;
        this.carregarConfigPedido();
      }
    });
  }

  adicionarFuncionario() {
    const loja = this.lojaSelecionada();
    if (!loja) return;
    if (this.funcForm.invalid || !this.funcFormReady) {
      this.funcForm.markAllAsTouched();
      this.equipeError.set('Preencha todos os campos obrigatórios corretamente e aguarde a verificação.');
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

  // ── Editar Funcionário ────────────────────────────────────────────────────

  editFuncionario = signal<Funcionario | null>(null);
  editFuncForm = this.fb.group({
    cargo:         [''],
    salario:       [0, [Validators.required, Validators.min(0)]],
    data_admissao: ['', Validators.required],
  });
  editFuncLoading = signal(false);

  get editFf() {
    return this.editFuncForm.controls;
  }

  abrirEditFuncionario(func: Funcionario) {
    this.editFuncionario.set(func);
    this.editFuncForm.patchValue({
      cargo: func.cargo ?? '',
      salario: func.salario,
      data_admissao: func.data_admissao,
    });
  }

  fecharEditFuncionario() {
    this.editFuncionario.set(null);
    this.editFuncForm.reset({ salario: 0 });
  }

  salvarEditFuncionario() {
    const loja = this.lojaSelecionada();
    const func = this.editFuncionario();
    if (!loja || !func) return;
    if (this.editFuncForm.invalid) {
      this.editFuncForm.markAllAsTouched();
      return;
    }
    this.editFuncLoading.set(true);
    const fv = this.editFuncForm.value;
    const body: UpdateFuncionarioRequest = {
      cargo: fv.cargo || null,
      salario: fv.salario!,
      data_admissao: fv.data_admissao!,
    };
    this.adminService.atualizarFuncionario(loja.uuid, func.uuid, body).subscribe({
      next: () => {
        this.editFuncLoading.set(false);
        toast.success('Funcionário atualizado com sucesso!');
        this.fecharEditFuncionario();
        this.refreshFuncionarios();
      },
      error: (e) => {
        this.editFuncLoading.set(false);
        toast.error(e?.error?.error ?? 'Erro ao atualizar funcionário.');
      },
    });
  }

  // ── Entregadores ──────────────────────────────────────────────────────────

  entregForm = this.fb.group({
    nome:     ['', Validators.required],
    username: ['', [Validators.required, Validators.minLength(3)]],
    email:    ['', [Validators.required, Validators.email]],
    senha:    ['', [Validators.required, Validators.minLength(6)]],
    celular:  ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
    veiculo:  [''],
    placa:    [''],
  });

  // Entregador email/username verification
  entregEmailChecking = signal(false);
  entregEmailAvailable = signal<boolean | null>(null);
  entregUsernameChecking = signal(false);
  entregUsernameAvailable = signal<boolean | null>(null);

  entregLoading = signal(false);
  entregError   = signal('');

  get ef() {
    return this.entregForm.controls;
  }

  get entregFormReady(): boolean {
    const emailOk = this.entregEmailAvailable() === true;
    const usernameOk = this.entregUsernameAvailable() === true;
    return emailOk && usernameOk && this.entregForm.valid;
  }

  adicionarEntregador() {
    const loja = this.lojaSelecionada();
    if (!loja) return;
    if (this.entregForm.invalid || !this.entregFormReady) {
      this.entregForm.markAllAsTouched();
      this.entregError.set('Preencha todos os campos obrigatórios corretamente e aguarde a verificação.');
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

  // ── Editar Entregador ─────────────────────────────────────────────────────

  editEntregador = signal<Entregador | null>(null);
  editEntregForm = this.fb.group({
    veiculo:  [''],
    placa:    [''],
  });
  editEntregLoading = signal(false);

  get editEf() {
    return this.editEntregForm.controls;
  }

  abrirEditEntregador(entreg: Entregador) {
    this.editEntregador.set(entreg);
    this.editEntregForm.patchValue({
      veiculo: entreg.veiculo ?? '',
      placa: entreg.placa ?? '',
    });
  }

  fecharEditEntregador() {
    this.editEntregador.set(null);
    this.editEntregForm.reset();
  }

  salvarEditEntregador() {
    const loja = this.lojaSelecionada();
    const entreg = this.editEntregador();
    if (!loja || !entreg) return;
    if (this.editEntregForm.invalid) {
      this.editEntregForm.markAllAsTouched();
      return;
    }
    this.editEntregLoading.set(true);
    const fv = this.editEntregForm.value;
    const body: UpdateEntregadorRequest = {
      veiculo: fv.veiculo || null,
      placa: fv.placa || null,
    };
    this.adminService.atualizarEntregador(loja.uuid, entreg.uuid, body).subscribe({
      next: () => {
        this.editEntregLoading.set(false);
        toast.success('Entregador atualizado com sucesso!');
        this.fecharEditEntregador();
        this.refreshEntregadores();
      },
      error: (e) => {
        this.editEntregLoading.set(false);
        toast.error(e?.error?.error ?? 'Erro ao atualizar entregador.');
      },
    });
  }

  toggleDisponibilidadeEntregador(uuid: string, nome: string, disponivelAtual: boolean) {
    const loja = this.lojaSelecionada();
    if (!loja) return;
    const novoEstado = !disponivelAtual;
    this.adminService.toggleDisponibilidadeEntregador(loja.uuid, uuid, novoEstado).subscribe({
      next: () => {
        toast.success(`Entregador "${nome}" agora está ${novoEstado ? 'disponível' : 'indisponível'}.`);
        this.refreshEntregadores();
      },
      error: (e) => {
        toast.error(e?.error?.error ?? 'Erro ao alterar disponibilidade do entregador.');
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

  // Auto-load categories when switching to catalogo tab
  private readonly _loadCatEffect = effect(() => {
    const aba = this.aba();
    const loja = this.lojaSelecionada();
    if (aba === 'catalogo' && loja) {
      this.refreshCategorias();
    }
  });

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
    pizza_mode: [false],
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
      pizza_mode: fv.pizza_mode ?? false,
    };
    this.catalogoService.criarCategoria(loja.uuid, body).subscribe({
      next: () => {
        this.catLoadingSubmit.set(false);
        toast.success('Categoria criada com sucesso!');
        this.catForm.reset({ ordem: 0, pizza_mode: false });
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
      pizza_mode: cat.pizza_mode,
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
      pizza_mode: fv.pizza_mode ?? false,
    }).subscribe({
      next: () => {
        this.catLoadingSubmit.set(false);
        this.catEditId.set(null);
        toast.success('Categoria atualizada com sucesso!');
        this.catForm.reset({ ordem: 0, pizza_mode: false });
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
    this.catForm.reset({ ordem: 0, pizza_mode: false });
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
      disponivel: true,
    }).subscribe({
      next: (prod) => {
        // Upload de imagem se houver
        const imgFile = this.prodImagem();
        if (imgFile) {
          this.catalogoService.uploadImagemProduto(prod.uuid, imgFile).subscribe({
            next: () => {
              toast.success('Produto e imagem criados com sucesso!');
              this.prodForm.reset({ preco: 0, tempo_preparo_min: 30, destaque: false });
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
          this.prodForm.reset({ preco: 0, tempo_preparo_min: 30, destaque: false });
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
    });
    this.prodError.set('');
    // Clear image preview
    this.prodImagem.set(null);
    this.prodImagemPreview.set(null);
  }

  salvarEdicaoProduto() {
    const uuid = this.prodEditId();
    if (!uuid) return;
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
              this.prodForm.reset({ preco: 0, tempo_preparo_min: 30, destaque: false });
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
          this.prodForm.reset({ preco: 0, tempo_preparo_min: 30, destaque: false });
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
    this.prodForm.reset({ preco: 0, tempo_preparo_min: 30, destaque: false });
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

  toggleDisponibilidadeProduto(uuid: string, nome: string, disponivelAtual: boolean, categoriaUuid?: string) {
    const loja = this.lojaSelecionada();
    if (!loja) return;
    const novoEstado = !disponivelAtual;
    this.catalogoService.toggleDisponibilidadeProduto(loja.uuid, uuid, novoEstado).subscribe({
      next: () => {
        toast.success(`Produto "${nome}" agora está ${novoEstado ? 'disponível' : 'indisponível'}.`);
        if (categoriaUuid) {
          this.carregarProdutosDaCategoria(categoriaUuid);
        } else {
          this.carregarTodosProdutos();
        }
      },
      error: (e) => {
        toast.error(e?.error?.error ?? 'Erro ao alterar disponibilidade do produto.');
      },
    });
  }

  // ── Catálogo: Adicionais ──────────────────────────────────────────────────

  private readonly refreshAdicTrigger = new BehaviorSubject<void>(undefined);

  private readonly _adicionais = toSignal(
    this.refreshAdicTrigger.pipe(
      switchMap(() => {
        const loja = this.lojaSelecionada();
        if (!loja) return of([] as Adicional[]);
        return this.catalogoService.listarAdicionais(loja.uuid).pipe(
          catchError(() => of([] as Adicional[])),
        );
      }),
    ),
    { initialValue: [] as Adicional[] },
  );
  readonly adcLoading = computed(() => this._adicionais() === undefined);
  readonly adicionais = computed(() => this._adicionais() ?? []);

  private refreshAdicionais() {
    this.refreshAdicTrigger.next();
  }

  adcForm = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    descricao: [''],
    preco: [0, [Validators.required, Validators.min(0)]],
  });

  adcLoadingSubmit = signal(false);
  adcError = signal('');
  adcEditId = signal<string | null>(null);

  get fa() {
    return this.adcForm.controls;
  }

  criarAdicional() {
    const loja = this.lojaSelecionada();
    if (!loja) return;
    if (this.adcForm.invalid) {
      this.adcForm.markAllAsTouched();
      return;
    }
    this.adcLoadingSubmit.set(true);
    this.adcError.set('');
    const fv = this.adcForm.value;
    const body: CreateAdicionalRequest = {
      nome: fv.nome!,
      descricao: fv.descricao || '',
      preco: fv.preco!,
    };
    this.catalogoService.criarAdicional(loja.uuid, body).subscribe({
      next: () => {
        this.adcLoadingSubmit.set(false);
        toast.success('Adicional criado com sucesso!');
        this.adcForm.reset({ preco: 0 });
        this.refreshAdicionais();
      },
      error: (e) => {
        this.adcLoadingSubmit.set(false);
        this.adcError.set(e?.error?.error ?? 'Erro ao criar adicional.');
      },
    });
  }

  editarAdicional(adc: Adicional) {
    this.adcEditId.set(adc.uuid);
    this.adcForm.patchValue({
      nome: adc.nome,
      descricao: adc.descricao,
      preco: adc.preco,
    });
    this.adcError.set('');
  }

  salvarEdicaoAdicional() {
    const loja = this.lojaSelecionada();
    const uuid = this.adcEditId();
    if (!loja || !uuid) return;
    if (this.adcForm.invalid) {
      this.adcForm.markAllAsTouched();
      return;
    }
    this.adcLoadingSubmit.set(true);
    this.adcError.set('');
    const fv = this.adcForm.value;
    this.catalogoService.atualizarAdicional(loja.uuid, uuid, {
      nome: fv.nome!,
      descricao: fv.descricao || '',
      preco: fv.preco!,
    }).subscribe({
      next: () => {
        this.adcLoadingSubmit.set(false);
        this.adcEditId.set(null);
        toast.success('Adicional atualizado com sucesso!');
        this.adcForm.reset({ preco: 0 });
        this.refreshAdicionais();
      },
      error: (e) => {
        this.adcLoadingSubmit.set(false);
        this.adcError.set(e?.error?.error ?? 'Erro ao atualizar adicional.');
      },
    });
  }

  cancelarEdicaoAdicional() {
    this.adcEditId.set(null);
    this.adcForm.reset({ preco: 0 });
    this.adcError.set('');
  }

  deletarAdicional(uuid: string, nome: string) {
    if (!confirm(`Deletar adicional "${nome}"? Esta ação não pode ser desfeita.`)) return;
    const loja = this.lojaSelecionada();
    if (!loja) return;
    this.catalogoService.deletarAdicional(loja.uuid, uuid).subscribe({
      next: () => {
        toast.success('Adicional deletado com sucesso!');
        this.refreshAdicionais();
      },
      error: (e) => {
        toast.error(e?.error?.error ?? 'Erro ao deletar adicional.');
      },
    });
  }

  toggleDisponibilidadeAdicional(uuid: string, nome: string, disponivelAtual: boolean) {
    const loja = this.lojaSelecionada();
    if (!loja) return;
    const novoEstado = !disponivelAtual;
    this.catalogoService.toggleDisponibilidadeAdicional(loja.uuid, uuid, novoEstado).subscribe({
      next: () => {
        toast.success(`Adicional "${nome}" agora está ${novoEstado ? 'disponível' : 'indisponível'}.`);
        this.refreshAdicionais();
      },
      error: (e) => {
        toast.error(e?.error?.error ?? 'Erro ao alterar disponibilidade do adicional.');
      },
    });
  }

  // ── Cupons de Desconto ────────────────────────────────────────────────────

  private readonly refreshCupomTrigger = new BehaviorSubject<void>(undefined);

  private readonly _cupons = toSignal(
    this.refreshCupomTrigger.pipe(
      switchMap(() => {
        return this.marketingService.listarCupons().pipe(
          catchError(() => of([] as Cupom[])),
        );
      }),
    ),
    { initialValue: [] as Cupom[] },
  );
  readonly cupomLoading = computed(() => this._cupons() === undefined);
  readonly cupons = computed(() => this._cupons() ?? []);

  private refreshCupons() {
    this.refreshCupomTrigger.next();
  }

  cupomForm = this.fb.group({
    codigo: ['', [Validators.required, Validators.minLength(3)]],
    descricao: ['', Validators.required],
    tipo_desconto: ['percentual' as TipoDesconto, Validators.required],
    valor_desconto: [0, [Validators.required, Validators.min(0)]],
    valor_minimo: [0, [Validators.required, Validators.min(0)]],
    data_validade: ['', Validators.required],
    limite_uso: [0, [Validators.required, Validators.min(0)]],
  });

  cupomLoadingSubmit = signal(false);
  cupomError = signal('');
  cupomEditId = signal<string | null>(null);

  get fcup() {
    return this.cupomForm.controls;
  }

  criarCupom() {
    const loja = this.lojaSelecionada();
    if (!loja) {
      this.cupomError.set('Selecione uma loja primeiro.');
      return;
    }
    if (this.cupomForm.invalid) {
      this.cupomForm.markAllAsTouched();
      return;
    }
    this.cupomLoadingSubmit.set(true);
    this.cupomError.set('');
    const fv = this.cupomForm.value;
    // Convert date string (YYYY-MM-DD) to ISO 8601 format with end of day time
    const dataValidadeIso = fv.data_validade ? `${fv.data_validade}T23:59:59Z` : undefined;
    
    this.marketingService.criarCupom({
      loja_uuid: loja.uuid,
      codigo: fv.codigo!,
      descricao: fv.descricao!,
      tipo_desconto: fv.tipo_desconto!,
      valor_desconto: fv.valor_desconto!,
      valor_minimo: fv.valor_minimo!,
      data_validade: dataValidadeIso!,
      limite_uso: fv.limite_uso!,
    }).subscribe({
      next: () => {
        this.cupomLoadingSubmit.set(false);
        toast.success('Cupom criado com sucesso!');
        this.cupomForm.reset({
          tipo_desconto: 'percentual',
          valor_desconto: 0,
          valor_minimo: 0,
          limite_uso: 0,
        });
        this.refreshCupons();
      },
      error: (e) => {
        this.cupomLoadingSubmit.set(false);
        this.cupomError.set(e?.error?.error ?? 'Erro ao criar cupom.');
      },
    });
  }

  editarCupom(cupom: Cupom) {
    this.cupomEditId.set(cupom.uuid);
    this.cupomForm.patchValue({
      codigo: cupom.codigo,
      descricao: cupom.descricao,
      tipo_desconto: cupom.tipo_desconto,
      valor_desconto: cupom.valor_desconto,
      valor_minimo: cupom.valor_minimo,
      data_validade: cupom.data_validade,
      limite_uso: cupom.limite_uso,
    });
    this.cupomError.set('');
  }

  salvarEdicaoCupom() {
    const uuid = this.cupomEditId();
    if (!uuid) return;
    if (this.cupomForm.invalid) {
      this.cupomForm.markAllAsTouched();
      return;
    }
    this.cupomLoadingSubmit.set(true);
    this.cupomError.set('');
    const fv = this.cupomForm.value;
    // Convert date string (YYYY-MM-DD) to ISO 8601 format with end of day time
    const dataValidadeIso = fv.data_validade ? `${fv.data_validade}T23:59:59Z` : undefined;
    
    const updateRequest: UpdateCupomRequest = {
      codigo: fv.codigo ?? undefined,
      descricao: fv.descricao ?? undefined,
      tipo_desconto: fv.tipo_desconto ?? undefined,
      valor_desconto: fv.valor_desconto ?? undefined,
      valor_minimo: fv.valor_minimo ?? undefined,
      data_validade: dataValidadeIso,
      limite_uso: fv.limite_uso ?? undefined,
    };
    this.marketingService.atualizarCupom(uuid, updateRequest).subscribe({
      next: () => {
        this.cupomLoadingSubmit.set(false);
        this.cupomEditId.set(null);
        toast.success('Cupom atualizado com sucesso!');
        this.cupomForm.reset({
          tipo_desconto: 'percentual',
          valor_desconto: 0,
          valor_minimo: 0,
          limite_uso: 0,
        });
        this.refreshCupons();
      },
      error: (e) => {
        this.cupomLoadingSubmit.set(false);
        this.cupomError.set(e?.error?.error ?? 'Erro ao atualizar cupom.');
      },
    });
  }

  cancelarEdicaoCupom() {
    this.cupomEditId.set(null);
    this.cupomForm.reset({
      tipo_desconto: 'percentual',
      valor_desconto: 0,
      valor_minimo: 0,
      limite_uso: 0,
    });
    this.cupomError.set('');
  }

  deletarCupom(uuid: string, codigo: string) {
    if (!confirm(`Deletar cupom "${codigo}"? Esta ação não pode ser desfeita.`)) return;
    this.marketingService.deletarCupom(uuid).subscribe({
      next: () => {
        toast.success('Cupom deletado com sucesso!');
        if (this.cupomEditId() === uuid) {
          this.cancelarEdicaoCupom();
        }
        this.refreshCupons();
      },
      error: (e) => {
        toast.error(e?.error?.error ?? 'Erro ao deletar cupom.');
      },
    });
  }

  toggleStatusCupom(cupom: Cupom) {
    const novoStatus = cupom.status === 'Ativo' ? 'Inativo' : 'Ativo';
    this.marketingService.atualizarStatusCupom(cupom.uuid, novoStatus === 'Ativo').subscribe({
      next: () => {
        const statusTexto = novoStatus === 'Ativo' ? 'ativo' : 'inativo';
        toast.success(`Cupom "${cupom.codigo}" agora está ${statusTexto}.`);
        this.refreshCupons();
      },
      error: (e) => {
        toast.error(e?.error?.error ?? 'Erro ao alterar status do cupom.');
      },
    });
  }

  // ── Configuração de Pedidos ────────────────────────────────────────────────

  configPedidoData = signal<ConfiguracaoDePedidosLoja | null>(null);
  configPedidoLoading = signal(false);

  configPedidoForm = this.fb.group({
    max_partes: [4, [Validators.required, Validators.min(1), Validators.max(8)]],
    tipo_calculo: ['MaisCaro' as TipoCalculoPedido, Validators.required],
  });

  configPedidoLoadingSubmit = signal(false);
  configPedidoError = signal('');

  get fcp() {
    return this.configPedidoForm.controls;
  }

  carregarConfigPedido() {
    const loja = this.lojaSelecionada();
    if (!loja) return;
    
    this.configPedidoLoading.set(true);
    this.configPedidoError.set('');
    
    this.configPedidoService.getConfigPedido(loja.uuid).subscribe({
      next: (config) => {
        this.configPedidoData.set(config);
        this.configPedidoForm.patchValue({
          max_partes: config.max_partes,
          tipo_calculo: config.tipo_calculo,
        });
        this.configPedidoLoading.set(false);
      },
      error: () => {
        this.configPedidoData.set(null);
        this.configPedidoForm.reset({
          max_partes: 4,
          tipo_calculo: 'MaisCaro',
        });
        this.configPedidoLoading.set(false);
      },
    });
  }

  salvarConfigPedido() {
    const loja = this.lojaSelecionada();
    if (!loja) {
      this.configPedidoError.set('Selecione uma loja primeiro.');
      return;
    }
    if (this.configPedidoForm.invalid) {
      this.configPedidoForm.markAllAsTouched();
      return;
    }
    const fv = this.configPedidoForm.getRawValue();
    this.configPedidoLoadingSubmit.set(true);
    this.configPedidoError.set('');

    // Convert PascalCase to snake_case for backend
    const tipoCalculoBackend = fv.tipo_calculo === 'MaisCaro' ? 'mais_caro' : 'media_ponderada';

    this.configPedidoService.saveConfigPedido(loja.uuid, {
      max_partes: fv.max_partes!,
      tipo_calculo: tipoCalculoBackend as any,
    }).subscribe({
      next: () => {
        this.configPedidoLoadingSubmit.set(false);
        toast.success('Configuração de pedidos salva com sucesso!');
        // Re-fetch and update form
        this.carregarConfigPedido();
      },
      error: (e) => {
        this.configPedidoLoadingSubmit.set(false);
        this.configPedidoError.set(e?.error?.error ?? 'Erro ao salvar configuração.');
      },
    });
  }

  // ── Endereços da Loja ─────────────────────────────────────────────────────

  private readonly refreshEnderecoTrigger = new BehaviorSubject<void>(undefined);

  private readonly _enderecos = toSignal(
    this.refreshEnderecoTrigger.pipe(
      switchMap(() => {
        const loja = this.lojaSelecionada();
        if (!loja) return of([] as EnderecoLoja[]);
        return this.adminService.listarEnderecosLoja(loja.uuid).pipe(
          catchError(() => of([] as EnderecoLoja[])),
        );
      }),
    ),
    { initialValue: [] as EnderecoLoja[] },
  );
  readonly enderecoLoading = computed(() => this._enderecos() === undefined);
  readonly enderecos = computed(() => this._enderecos() ?? []);

  private refreshEnderecos() {
    this.refreshEnderecoTrigger.next();
  }

  enderecoForm = this.fb.group({
    cep: [''],
    logradouro: ['', Validators.required],
    numero: ['', Validators.required],
    complemento: [''],
    bairro: ['', Validators.required],
    cidade: ['', Validators.required],
    estado: ['', Validators.required],
    latitude: [''],
    longitude: [''],
  });

  enderecoLoadingSubmit = signal(false);
  enderecoError = signal('');
  editEnderecoId = signal<string | null>(null);

  get ee() {
    return this.enderecoForm.controls;
  }

  criarEndereco() {
    if (this.enderecoForm.invalid) {
      this.enderecoForm.markAllAsTouched();
      this.enderecoError.set('Preencha todos os campos obrigatórios.');
      return;
    }
    const loja = this.lojaSelecionada();
    if (!loja) return;
    this.enderecoLoadingSubmit.set(true);
    this.enderecoError.set('');
    const fv = this.enderecoForm.value;
    this.adminService.criarEnderecoLoja(loja.uuid, {
      cep: fv.cep || null,
      logradouro: fv.logradouro!,
      numero: fv.numero!,
      complemento: fv.complemento || null,
      bairro: fv.bairro!,
      cidade: fv.cidade!,
      estado: fv.estado!,
      latitude: fv.latitude ? parseFloat(fv.latitude) : null,
      longitude: fv.longitude ? parseFloat(fv.longitude) : null,
    }).subscribe({
      next: () => {
        this.enderecoLoadingSubmit.set(false);
        toast.success('Endereço criado com sucesso!');
        this.enderecoForm.reset();
        this.refreshEnderecos();
      },
      error: (e) => {
        this.enderecoLoadingSubmit.set(false);
        this.enderecoError.set(e?.error?.error ?? 'Erro ao criar endereço.');
      },
    });
  }

  abrirEdicaoEndereco(endereco: EnderecoLoja) {
    this.editEnderecoId.set(endereco.uuid);
    this.enderecoForm.patchValue({
      cep: endereco.cep ?? '',
      logradouro: endereco.logradouro,
      numero: endereco.numero,
      complemento: endereco.complemento ?? '',
      bairro: endereco.bairro,
      cidade: endereco.cidade,
      estado: endereco.estado,
      latitude: endereco.latitude?.toString() ?? '',
      longitude: endereco.longitude?.toString() ?? '',
    });
  }

  cancelarEdicaoEndereco() {
    this.editEnderecoId.set(null);
    this.enderecoForm.reset();
    this.enderecoError.set('');
  }

  atualizarEndereco() {
    if (this.enderecoForm.invalid) {
      this.enderecoForm.markAllAsTouched();
      this.enderecoError.set('Preencha todos os campos obrigatórios.');
      return;
    }
    const enderecoUuid = this.editEnderecoId();
    const loja = this.lojaSelecionada();
    if (!loja || !enderecoUuid) return;
    this.enderecoLoadingSubmit.set(true);
    this.enderecoError.set('');
    const fv = this.enderecoForm.value;
    this.adminService.atualizarEnderecoLoja(loja.uuid, enderecoUuid, {
      cep: fv.cep || null,
      logradouro: fv.logradouro,
      numero: fv.numero,
      complemento: fv.complemento || null,
      bairro: fv.bairro,
      cidade: fv.cidade,
      estado: fv.estado,
      latitude: fv.latitude ? parseFloat(fv.latitude) : null,
      longitude: fv.longitude ? parseFloat(fv.longitude) : null,
    }).subscribe({
      next: () => {
        this.enderecoLoadingSubmit.set(false);
        this.editEnderecoId.set(null);
        toast.success('Endereço atualizado com sucesso!');
        this.enderecoForm.reset();
        this.refreshEnderecos();
      },
      error: (e) => {
        this.enderecoLoadingSubmit.set(false);
        this.enderecoError.set(e?.error?.error ?? 'Erro ao atualizar endereço.');
      },
    });
  }

  deletarEndereco(uuid: string) {
    if (!confirm('Deletar este endereço? Esta ação não pode ser desfeita.')) return;
    const loja = this.lojaSelecionada();
    if (!loja) return;
    this.adminService.deletarEnderecoLoja(loja.uuid, uuid).subscribe({
      next: () => {
        toast.success('Endereço deletado com sucesso!');
        if (this.editEnderecoId() === uuid) {
          this.cancelarEdicaoEndereco();
        }
        this.refreshEnderecos();
      },
      error: (e) => {
        toast.error(e?.error?.error ?? 'Erro ao deletar endereço.');
      },
    });
  }

  // ── Horários de Funcionamento ─────────────────────────────────────────────

  private readonly refreshHorarioTrigger = new BehaviorSubject<void>(undefined);

  private readonly _horarios = toSignal(
    this.refreshHorarioTrigger.pipe(
      switchMap(() => {
        const loja = this.lojaSelecionada();
        if (!loja) return of([] as HorarioFuncionamento[]);
        return this.adminService.listarHorarios(loja.uuid).pipe(
          catchError(() => of([] as HorarioFuncionamento[])),
        );
      }),
    ),
    { initialValue: [] as HorarioFuncionamento[] },
  );
  readonly horarioLoading = computed(() => this._horarios() === undefined);
  readonly horarios = computed(() => this._horarios() ?? []);

  private refreshHorarios() {
    this.refreshHorarioTrigger.next();
  }

  readonly diasSemana = [
    { valor: 0, nome: 'Domingo' },
    { valor: 1, nome: 'Segunda-feira' },
    { valor: 2, nome: 'Terça-feira' },
    { valor: 3, nome: 'Quarta-feira' },
    { valor: 4, nome: 'Quinta-feira' },
    { valor: 5, nome: 'Sexta-feira' },
    { valor: 6, nome: 'Sábado' },
  ];

  readonly diasSemanaDisponiveis = computed(() => {
    const horariosList = this.horarios();
    const diasCadastrados = new Set(horariosList.map(h => h.dia_semana));
    return this.diasSemana.filter(dia => !diasCadastrados.has(dia.valor));
  });

  horarioForm = this.fb.group({
    dia_semana: [0, Validators.required],
    abertura: ['', Validators.required],
    fechamento: ['', Validators.required],
  });

  horarioLoadingSubmit = signal(false);
  horarioError = signal('');

  get hh() {
    return this.horarioForm.controls;
  }

  criarHorario() {
    if (this.horarioForm.invalid) {
      this.horarioForm.markAllAsTouched();
      this.horarioError.set('Preencha todos os campos obrigatórios.');
      return;
    }
    const loja = this.lojaSelecionada();
    if (!loja) return;
    this.horarioLoadingSubmit.set(true);
    this.horarioError.set('');
    const fv = this.horarioForm.value;
    this.adminService.criarHorario(loja.uuid, {
      dia_semana: parseInt(fv.dia_semana as unknown as string, 10),
      abertura: fv.abertura!,
      fechamento: fv.fechamento!,
      ativo: true,
    }).subscribe({
      next: () => {
        this.horarioLoadingSubmit.set(false);
        toast.success('Horário criado com sucesso!');
        this.horarioForm.reset({ dia_semana: 0 });
        this.refreshHorarios();
      },
      error: (e) => {
        this.horarioLoadingSubmit.set(false);
        this.horarioError.set(e?.error?.error ?? 'Erro ao criar horário.');
      },
    });
  }

  toggleDiaAtivo(horario: HorarioFuncionamento) {
    const loja = this.lojaSelecionada();
    if (!loja) return;
    this.adminService.toggleDiaAtivo(loja.uuid, horario.dia_semana, !horario.ativo).subscribe({
      next: () => {
        toast.success(`Dia ${horario.ativo ? 'desativado' : 'ativado'} com sucesso!`);
        this.refreshHorarios();
      },
      error: (e) => {
        toast.error(e?.error?.error ?? 'Erro ao alterar status do dia.');
      },
    });
  }

  deletarDia(diaSemana: number, diaNome: string) {
    if (!confirm(`Deletar horário de ${diaNome}? Esta ação não pode ser desfeita.`)) return;
    const loja = this.lojaSelecionada();
    if (!loja) return;
    this.adminService.deletarDia(loja.uuid, diaSemana).subscribe({
      next: () => {
        toast.success('Horário deletado com sucesso!');
        this.refreshHorarios();
      },
      error: (e) => {
        toast.error(e?.error?.error ?? 'Erro ao deletar horário.');
      },
    });
  }

  // Helper para obter nome do usuário a partir do JWT (fallback)
  getNomeUsuario(usuarioUuid: string): string {
    // Tenta obter do localStorage ou retorna UUID curto
    return `Usuário (${usuarioUuid.slice(0, 8)}...)`;
  }

  // Helper para converter nota (pode ser string ou number)
  toNumber(value: number | string): number {
    return typeof value === 'string' ? parseFloat(value) : value;
  }
}
