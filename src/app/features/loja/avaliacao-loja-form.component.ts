import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-avaliacao-loja-form',
  imports: [FormsModule],
  template: `
    <div class="space-y-4">
      <div class="flex items-start justify-between">
        <h3 class="text-sm font-semibold text-gray-900">
          {{ avaliacaoExistente() ? 'Editar sua avaliação' : 'Sua nota:' }}
        </h3>
        @if (avaliacaoExistente()) {
          <button (click)="cancelar.emit()"
                  class="text-sm text-gray-500 hover:text-gray-700">
            Cancelar
          </button>
        }
      </div>

      <!-- Seleção de Nota -->
      <div class="flex gap-1">
        @for (star of [1,2,3,4,5]; track star) {
          <button (click)="nota = star"
                  class="w-10 h-10 transition-transform hover:scale-110 focus:outline-none">
            <svg class="w-10 h-10"
                 [class]="star <= nota ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'"
                 viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          </button>
        }
      </div>

      @if (nota > 0) {
        <p class="text-sm text-gray-600">
          {{ notaLabels[nota - 1] }}
        </p>
      }

      <!-- Comentário -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Seu comentário (opcional):
        </label>
        <textarea
          [(ngModel)]="comentario"
          rows="4"
          placeholder="Conte sua experiência com esta loja..."
          class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm
                 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent
                 resize-none"
        ></textarea>
      </div>

      <!-- Botão Salvar -->
      <div class="flex justify-end gap-3 pt-2">
        @if (avaliacaoExistente()) {
          <button (click)="cancelar.emit()"
                  class="px-5 py-2.5 rounded-xl font-semibold text-sm border border-gray-200 text-gray-700 hover:bg-gray-50">
            Cancelar
          </button>
        }
        <button (click)="onSalvar()"
                [disabled]="nota === 0 || loading()"
                class="px-6 py-2.5 rounded-xl font-semibold text-sm text-white
                       disabled:opacity-50 disabled:cursor-not-allowed">
          @if (loading()) {
            <span class="flex items-center gap-2">
              <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Salvando...
            </span>
          } @else {
            {{ avaliacaoExistente() ? 'Atualizar' : 'Salvar' }}
          }
        </button>
      </div>
    </div>
  `,
})
export class AvaliacaoLojaFormComponent {
  avaliacaoExistente = input<boolean>(false);
  loading = input<boolean>(false);

  nota = 0;
  comentario = '';

  notaLabels = [
    'Muito ruim',
    'Ruim',
    'Regular',
    'Bom',
    'Excelente',
  ];

  salvar = output<{ nota: number; comentario: string | null }>();
  cancelar = output<void>();

  onSalvar(): void {
    this.salvar.emit({ nota: this.nota, comentario: this.comentario || null });
  }
}
