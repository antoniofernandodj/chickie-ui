import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PushNotificationService {
  private readonly swPush = inject(SwPush);
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly api = environment.apiUrl;

  private vapidKey: string | null = null;

  async carregarVapidKey(): Promise<string> {
    if (!isPlatformBrowser(this.platformId)) return '';
    if (this.vapidKey) return this.vapidKey;

    try {
      const { public_key } = await firstValueFrom(
        this.http.get<{ public_key: string }>(`${this.api}/push/vapid-public-key`),
      );
      this.vapidKey = public_key;
      return public_key;
    } catch {
      return '';
    }
  }

  async subscribe(): Promise<void> {
    if (!isPlatformBrowser(this.platformId) || !this.swPush.isEnabled) return;

    try {
      const publicKey = await this.carregarVapidKey();
      if (!publicKey) return;

      const sub = await this.swPush.requestSubscription({ serverPublicKey: publicKey });

      await firstValueFrom(this.http.post(`${this.api}/usuarios/me/push-subscription`, sub));
    } catch (err) {
      console.warn('Falha ao registrar push subscription:', err);
    }
  }

  // DELETE is sent while token is still valid; browser unsubscription is fire-and-forget.
  async unsubscribe(): Promise<void> {
    if (!isPlatformBrowser(this.platformId) || !this.swPush.isEnabled) return;

    try {
      const sub = await firstValueFrom(this.swPush.subscription.pipe(take(1)));
      if (!sub) return;

      await firstValueFrom(
        this.http.delete(`${this.api}/usuarios/me/push-subscription`, {
          body: { endpoint: sub.endpoint },
        }),
      );

      sub.unsubscribe().catch(() => {});
    } catch (err) {
      console.warn('Falha ao remover push subscription:', err);
    }
  }

  get messages$() {
    return this.swPush.messages;
  }

  get notificationClicks$() {
    return this.swPush.notificationClicks;
  }
}
