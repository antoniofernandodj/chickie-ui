import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  // declarations: [HeaderComponent],
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl:    './app.css',
})
export class App {}
