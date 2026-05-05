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
      if (!public_key) {
        console.error('[PUSH] VAPID_PUBLIC_KEY está vazia no backend — configure a variável de ambiente');
        return '';
      }
      this.vapidKey = public_key;
      console.info('[PUSH] VAPID public key carregada com sucesso');
      return public_key;
    } catch (err) {
      console.error('[PUSH] falha ao buscar VAPID public key do backend:', err);
      return '';
    }
  }

  async subscribe(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!this.swPush.isEnabled) {
      console.warn('[PUSH] swPush.isEnabled=false — service worker desabilitado (apenas funciona em build de produção). Subscription de usuário não registrada.');
      return;
    }

    try {
      const publicKey = await this.carregarVapidKey();
      if (!publicKey) {
        console.error('[PUSH] subscribe: publicKey vazia, abortando');
        return;
      }

      console.info('[PUSH] solicitando subscription ao browser (usuário)...');
      const sub = await this.swPush.requestSubscription({ serverPublicKey: publicKey });
      console.info('[PUSH] subscription obtida — salvando no backend', { endpoint: sub.endpoint });
      await firstValueFrom(this.http.post(`${this.api}/usuarios/me/push-subscription`, sub));
      console.info('[PUSH] subscription de usuário salva com sucesso');
    } catch (err) {
      console.error('[PUSH] falha ao registrar subscription de usuário:', err);
    }
  }

  // DELETE is sent while token is still valid; browser unsubscription is fire-and-forget.
  async subscribePorPedido(pedidoUuid: string): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!this.swPush.isEnabled) {
      console.warn('[PUSH] swPush.isEnabled=false — service worker desabilitado (apenas funciona em build de produção). Subscription para pedido não registrada.', { pedidoUuid });
      return;
    }

    try {
      const permissao = (Notification as any).permission;
      console.info('[PUSH] subscribePorPedido iniciado', { pedidoUuid, permissao });

      const publicKey = await this.carregarVapidKey();
      if (!publicKey) {
        console.error('[PUSH] subscribePorPedido: publicKey vazia, abortando', { pedidoUuid });
        return;
      }

      console.info('[PUSH] solicitando subscription ao browser (pedido guest)...', { pedidoUuid });
      const sub = await this.swPush.requestSubscription({ serverPublicKey: publicKey });
      console.info('[PUSH] subscription obtida — enviando para backend', { pedidoUuid, endpoint: sub.endpoint });
      await firstValueFrom(
        this.http.post(`${this.api}/pedidos/${pedidoUuid}/push-subscription`, sub),
      );
      console.info('[PUSH] subscription de pedido salva no backend com sucesso', { pedidoUuid });
    } catch (err) {
      console.error('[PUSH] falha ao registrar push subscription para pedido:', err, { pedidoUuid });
    }
  }

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
