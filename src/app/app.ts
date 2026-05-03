import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { CartDrawerComponent } from './shared/components/cart-drawer.component';
import { NgxSonnerToaster } from 'ngx-sonner';
import { PushNotificationService } from './core/services/push-notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CartDrawerComponent, NgxSonnerToaster],
  templateUrl: './app.html',
  styleUrl:    './app.css',
})
export class App implements OnInit {
  private readonly router = inject(Router);
  private readonly push = inject(PushNotificationService);

  ngOnInit(): void {
    this.push.messages$.subscribe((msg: any) => {
      const url = msg?.notification?.data?.url;
      if (url) this.router.navigateByUrl(url);
    });
  }
}
