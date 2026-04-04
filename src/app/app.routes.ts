import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'Chickie — Delivery',
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent,
      ),
    title: 'Entrar — Chickie',
  },
  {
    path: 'auth/signup',
    loadComponent: () =>
      import('./features/auth/signup/signup.component').then(
        (m) => m.SignupComponent,
      ),
    title: 'Criar conta — Chickie',
  },
  {
    path: 'loja/:uuid',
    loadComponent: () =>
      import('./features/loja/loja-detalhe.component').then(
        (m) => m.LojaDetalheComponent,
      ),
    title: 'Loja — Chickie',
  },
  {
    path: 'pedidos',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pedidos/pedidos.component').then(
        (m) => m.PedidosComponent,
      ),
    title: 'Meus Pedidos — Chickie',
  },
  {
    path: 'pedidos/:uuid',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pedidos/pedido-detalhe.component').then(
        (m) => m.PedidoDetalheComponent,
      ),
    title: 'Pedido — Chickie',
  },
  {
    path: 'favoritos',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/favoritos/favoritos.component').then(
        (m) => m.FavoritosComponent,
      ),
    title: 'Favoritos — Chickie',
  },
  {
    path: 'perfil',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/perfil/perfil.component').then(
        (m) => m.PerfilComponent,
      ),
    title: 'Meu Perfil — Chickie',
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/admin/admin.component').then(
        (m) => m.AdminComponent,
      ),
    title: 'Painel Admin — Chickie',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
    title: '404 — Chickie',
  },
];
