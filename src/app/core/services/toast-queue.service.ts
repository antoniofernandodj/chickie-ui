import { Injectable, inject, PLATFORM_ID, afterNextRender } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { toast } from 'ngx-sonner';

interface QueuedToast {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

@Injectable({ providedIn: 'root' })
export class ToastQueueService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly STORAGE_KEY = 'chickie_toast_queue';

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // Processa a fila após a renderização inicial
      afterNextRender(() => {
        this.processQueue();
      });
    }
  }

  /** Adiciona um toast à fila para ser exibido após o próximo refresh */
  enqueue(message: string, type: QueuedToast['type'] = 'success'): void {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      const queue = this.getQueue();
      queue.push({ message, type });
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(queue));
    } catch (e) {
      console.warn('[ToastQueue] Falha ao enfileirar toast:', e);
    }
  }

  private getQueue(): QueuedToast[] {
    try {
      const raw = sessionStorage.getItem(this.STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private processQueue(): void {
    const queue = this.getQueue();
    if (queue.length === 0) return;

    queue.forEach((t) => {
      switch (t.type) {
        case 'success': toast.success(t.message); break;
        case 'error':   toast.error(t.message);   break;
        case 'warning': toast.warning(t.message); break;
        default:        toast(t.message);          break;
      }
    });

    sessionStorage.removeItem(this.STORAGE_KEY);
  }
}
