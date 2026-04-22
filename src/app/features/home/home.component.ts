import { Component, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { LojaService } from '../../core/services/loja.service';
import { PedidoLocalStorageService } from '../../core/services/pedido-local-storage.service';
import { catchError, debounceTime, distinctUntilChanged, of, switchMap, Subject } from 'rxjs';
import { UiEmptyStateComponent } from '../../shared/components';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DecimalPipe, UiEmptyStateComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private lojaService        = inject(LojaService);
  private pedidoLocalStorage = inject(PedidoLocalStorageService);

  readonly skeletons     = Array(8);
  readonly search        = signal('');
  private searchSubject  = new Subject<string>();

  readonly lojas = toSignal(
    this.searchSubject.pipe(
      debounceTime(300), distinctUntilChanged(),
      switchMap(termo => {
        this.search.set(termo);
        if (!termo.trim()) return of([]);
        return this.lojaService.pesquisar(termo).pipe(catchError(() => of([])));
      }),
    ),
    { initialValue: null }
  );

  readonly loading      = computed(() => this.search().trim() !== '' && this.lojas() === null);
  readonly pedidosLocais = computed(() => this.pedidoLocalStorage.pedidos());

  onSearchInput(value: string) { this.searchSubject.next(value); }
}
