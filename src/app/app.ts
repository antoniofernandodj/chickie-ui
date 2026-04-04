import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';


type ServerMessage = { message: string };


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly http = inject(HttpClient);

  protected readonly title = signal('chickie-ui');
  protected readonly serverMessage = signal<string | null>("CARREGANDO NO SERVIDOR...");

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: Object
  ) {
    if (isPlatformServer(this.platformId)) {
      console.log('✅ EXECUTANDO NO SERVIDOR (DOCKER LOGS)');
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.http.get<ServerMessage>('/api/hello')
        .subscribe({
          next: (data) => this.serverMessage.set(data.message),
          error: (err) => console.error('Erro ao buscar dados:', err)
        });
    }
  }
}
