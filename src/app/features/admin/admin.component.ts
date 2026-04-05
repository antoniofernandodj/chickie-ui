import { Component, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { BehaviorSubject, catchError, of, switchMap } from 'rxjs';
import { AdminService } from '../../core/services/admin.service';
import { Loja } from '../../core/models';

@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule, DecimalPipe],
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  private adminService = inject(AdminService);
  private fb = inject(FormBuilder);

  readonly aba  = signal('lojas');
  readonly tabs = [
    { id: 'lojas',  label: '🏪 Lojas'  },
    { id: 'equipe', label: '👥 Equipe' },
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
        alert('Funcionário adicionado com sucesso!');
        this.funcForm.reset({ salario: 0 });
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
        alert('Entregador adicionado com sucesso!');
        this.entregForm.reset();
      },
      error: (e) => {
        this.entregLoading.set(false);
        this.entregError.set(e?.error?.error ?? 'Erro ao adicionar entregador.');
      },
    });
  }
}
