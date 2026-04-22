import { Component, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { BehaviorSubject, catchError, of, switchMap, debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { NgxSonnerToaster, toast } from 'ngx-sonner';
import { AdminService } from '../../core/services/admin.service';
import { LojaService } from '../../core/services/loja.service';
import { AuthService } from '../../core/services/auth.service';
import { Loja } from '../../core/models';

@Component({
  selector: 'app-admin-lojas-list',
  imports: [ReactiveFormsModule, DecimalPipe, NgxSonnerToaster],
  templateUrl: './admin-lojas-list.component.html',
})
export class AdminLojasListComponent {
  private adminService = inject(AdminService);
  private lojaService = inject(LojaService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  readonly mostrandoFormulario = signal(false);

  // ── Lojas ──────────────────────────────────────────────────────────────────

  private readonly refreshTrigger = new BehaviorSubject<void>(undefined);

  readonly _minhasLojas = toSignal(
    this.refreshTrigger.pipe(
      switchMap(() => this.adminService.listarMinhasLojas()),
      catchError(() => of([])),
    ),
  );
  readonly lojasLoading = computed(() => this._minhasLojas() === undefined);
  readonly minhasLojas = computed(() => this._minhasLojas() ?? []);

  private refreshLojas() {
    this.refreshTrigger.next();
  }

  // ── Formulário ─────────────────────────────────────────────────────────────

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

  slugChecking = signal(false);
  slugAvailable = signal<boolean | null>(null);
  slugMessage = signal('');
  lojaLoading = signal(false);
  lojaError = signal('');

  constructor() {
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
    const slugOk = this.slugAvailable() === true;
    if (!slugOk) {
      this.lojaError.set('O slug deve ser verificado e disponível antes de criar a loja.');
      return;
    }
    this.lojaLoading.set(true);
    this.lojaError.set('');
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
        toast.success(`Loja "${l.nome}" criada com sucesso!`);
        this.lojaForm.reset({
          taxa_entrega_base: 5,
          pedido_minimo: 20,
          tempo_medio: 30,
          max_partes: 4,
        });
        this.slugChecking.set(false);
        this.slugAvailable.set(null);
        this.slugMessage.set('');
        this.mostrandoFormulario.set(false);
        this.refreshLojas();
      },
      error: (e) => {
        this.lojaLoading.set(false);
        this.lojaError.set(e?.error?.error ?? 'Erro ao criar loja.');
      },
    });
  }

  abrirFormulario() {
    this.mostrandoFormulario.set(true);
  }

  fecharFormulario() {
    this.mostrandoFormulario.set(false);
    this.lojaForm.reset({
      taxa_entrega_base: 5,
      pedido_minimo: 20,
      tempo_medio: 30,
      max_partes: 4,
    });
    this.slugChecking.set(false);
    this.slugAvailable.set(null);
    this.slugMessage.set('');
    this.lojaError.set('');
  }

  navegarParaPainel(loja: Loja) {
    this.router.navigate(['/admin', loja.uuid]);
  }
}
