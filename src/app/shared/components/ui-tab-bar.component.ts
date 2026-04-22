import { Component, input, model } from '@angular/core';

export interface UiTab {
  id:    string;
  label: string;
}

@Component({
  selector: 'ui-tab-bar',
  standalone: true,
  template: `
    <div class="flex gap-1 bg-gray-100 rounded-xl p-1">
      @for (tab of tabs(); track tab.id) {
        <button
          type="button"
          (click)="active.set(tab.id)"
          class="flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all shrink-0"
          [class.bg-white]="active() === tab.id"
          [class.shadow-sm]="active() === tab.id"
          [class.text-gray-900]="active() === tab.id"
          [class.text-gray-500]="active() !== tab.id"
        >{{ tab.label }}</button>
      }
    </div>
  `,
})
export class UiTabBarComponent {
  tabs   = input.required<UiTab[]>();
  active = model.required<string>();
}
