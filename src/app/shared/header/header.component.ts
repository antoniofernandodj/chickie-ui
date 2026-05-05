import {
  Component,
  inject,
  signal,
  HostListener,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { PushNotificationService } from '../../core/services/push-notification.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  readonly auth = inject(AuthService);
  readonly cart = inject(CartService);
  private  router = inject(Router);
  private  platform = inject(PLATFORM_ID);
  private  push = inject(PushNotificationService);

  readonly menuOpen = signal(false);
  readonly mobileOpen = signal(false);

  readonly initial = () => {
    if (!isPlatformBrowser(this.platform)) return '?';
    const name = localStorage.getItem('chickie_nome') ?? 'U';
    return name.charAt(0).toUpperCase();
  };

  @HostListener('document:click', ['$event'])
  onDocumentClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (!target.closest('[data-menu]')) this.menuOpen.set(false);
  }

  logout(): void {
    // 1. Tenta remover push subscription (token ainda válido)
    this.push.unsubscribe().catch(err => console.warn('Logout: falha ao remover push', err));

    // 2. Limpa o auth
    this.auth.logout();

    // 3. Fecha menus
    this.menuOpen.set(false);
    this.mobileOpen.set(false);

    // 4. Redireciona via window.location para forçar um refresh total da aplicação
    window.location.href = '/';
  }
}
