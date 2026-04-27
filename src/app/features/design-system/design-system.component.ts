import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  UiSpinnerComponent, UiButtonComponent, UiCardComponent, UiSkeletonComponent,
  UiAvatarComponent, UiBadgeComponent, UiErrorBannerComponent, UiStatusBadgeComponent,
  UiTabBarComponent, UiModalComponent, UiEmptyStateComponent,
  UiInputComponent, UiPasswordInputComponent, UiTab,
} from '../../shared/components';

@Component({
  selector: 'app-design-system',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    UiSpinnerComponent, UiButtonComponent, UiCardComponent, UiSkeletonComponent,
    UiAvatarComponent, UiBadgeComponent, UiErrorBannerComponent, UiStatusBadgeComponent,
    UiTabBarComponent, UiModalComponent, UiEmptyStateComponent,
    UiInputComponent, UiPasswordInputComponent,
  ],
  templateUrl: './design-system.component.html',
})
export class DesignSystemComponent {
  private fb = inject(FormBuilder);

  activeTab  = signal('colors');
  modalOpen  = signal(false);
  demoActive = signal('tab1');

  readonly navTabs: UiTab[] = [
    { id: 'colors',     label: 'Cores'       },
    { id: 'typography', label: 'Tipografia'  },
    { id: 'buttons',    label: 'Botões'      },
    { id: 'inputs',     label: 'Inputs'      },
    { id: 'cards',      label: 'Cards'       },
    { id: 'badges',     label: 'Badges'      },
    { id: 'feedback',   label: 'Feedback'    },
    { id: 'layout',     label: 'Layout'      },
  ];

  readonly demoTabs: UiTab[] = [
    { id: 'tab1', label: 'Tab Um'   },
    { id: 'tab2', label: 'Tab Dois' },
    { id: 'tab3', label: 'Tab Três' },
  ];

  readonly allStatuses = [
    'criado',
    'aguardando_confirmacao_de_loja',
    'confirmado_pela_loja',
    'em_preparo',
    'pronto',
    'saiu_para_entrega',
    'entregue',
  ] as const;

  demoForm = this.fb.group({ nome: [''], email: [''], senha: [''] });
}
