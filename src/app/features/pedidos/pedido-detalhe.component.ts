import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe, DecimalPipe } from '@angular/common';
import { switchMap, catchError, of, map } from 'rxjs';
import { PedidoService } from '../../core/services/pedido.service';
import { Pedido, StatusPedido } from '../../core/models';

type Steps = {
  status: StatusPedido;
  label: string;
  icon: string
}

const STEPS: Steps[] = [
  { status: 'criado', label: 'Pedido criado', icon: '🕐' },
  { status: 'aguardando_confirmacao_de_loja', label: 'Aguardando loja', icon: '⏳' },
  { status: 'confirmado_pela_loja', label: 'Confirmado', icon: '✅' },
  { status: 'em_preparo', label: 'Em preparo', icon: '👨‍🍳' },
  { status: 'pronto_para_retirada', label: 'Pronto', icon: '📦' },
  { status: 'saiu_para_entrega', label: 'Saiu p/ entrega', icon: '🛵' },
  { status: 'entregue', label: 'Entregue', icon: '🎉' },
];

const ORDER: StatusPedido[] = STEPS.map((s) => s.status);

@Component({
  selector: 'app-pedido-detalhe',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './pedido-detalhe.component.html',
})
export class PedidoDetalheComponent {
  private route = inject(ActivatedRoute);
  private pedidoService = inject(PedidoService);

  readonly steps = STEPS;

  readonly pedido = toSignal(
    this.route.paramMap.pipe(
      map((p) => p.get('uuid')!),
      switchMap((uuid) =>
        this.pedidoService
        .buscar(uuid)
        .pipe(catchError(() => of(null))),
      ),
    ),
  );

  readonly loading = computed(() => this.pedido() === undefined);

  private currentIndex = computed(() =>
    ORDER.indexOf(this.pedido()?.status ?? 'criado'),
  );

  // Method to format the date safely
  getFormattedDate(date: string): string {
    const datePipe = new DatePipe('en-US');
    return `${datePipe.transform(date, 'dd/MM/yyyy')} às ${new Date(date).toLocaleTimeString('pt-BR')}`;
  }

  isActive(s: StatusPedido) { return this.pedido()?.status === s; }
  isDone  (s: StatusPedido) { return ORDER.indexOf(s) < this.currentIndex(); }

  totalItem(item: Pedido['itens'][number]): number {
    return item.partes.reduce(
      (acc, p) =>
        acc +
        p.preco_unitario +
        p.adicionais.reduce((a, ad) => a + ad.preco, 0),
      0,
    ) * item.quantidade;
  }
}
