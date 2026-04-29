import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { CartDrawerComponent } from './shared/components/cart-drawer.component';
import { NgxSonnerToaster } from 'ngx-sonner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CartDrawerComponent, NgxSonnerToaster],
  templateUrl: './app.html',
  styleUrl:    './app.css',
})
export class App {}
