import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly http = inject(HttpClient);
  
  protected readonly title = signal('Chickie-ui');
  protected readonly serverMessage = signal<string | null>(null);

  ngOnInit() {
    this.http.get<{ message: string }>('/api/hello')
      .subscribe({
        next: (data) => this.serverMessage.set(data.message),
        error: (err) => console.error('Erro ao buscar dados:', err)
      });
  }
}
