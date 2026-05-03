import { Component, inject, signal, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { PushNotificationService } from '../../../core/services/push-notification.service';
import { UiSpinnerComponent } from '../../../shared/components';

type Estado = 'loading' | 'success' | 'error';

@Component({
  selector: 'app-confirmar-email',
  imports: [RouterLink, UiSpinnerComponent],
  templateUrl: './confirmar-email.component.html',
})
export class ConfirmarEmailComponent implements OnInit {
  private auth       = inject(AuthService);
  private router     = inject(Router);
  private route      = inject(ActivatedRoute);
  private platformId = inject(PLATFORM_ID);
  private push       = inject(PushNotificationService);

  estado     = signal<Estado>('loading');
  errorMsg   = signal('');

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const token = this.route.snapshot.queryParamMap.get('token');
    if (!token) {
      this.errorMsg.set('Link de confirmação inválido. Faça o cadastro novamente.');
      this.estado.set('error');
      return;
    }

    this.auth.confirmarEmail(token).subscribe({
      next: () => {
        this.push.subscribe();
        this.estado.set('success');
        sessionStorage.removeItem('chickie_signup_pending');
        setTimeout(() => this.router.navigate(['/']), 2000);
      },
      error: (err) => {
        this.errorMsg.set(err?.error?.error ?? 'Link inválido ou expirado. Faça o cadastro novamente.');
        this.estado.set('error');
      },
    });
  }
}
