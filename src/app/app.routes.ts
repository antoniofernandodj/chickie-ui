import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { ownerGuard } from './core/guards/owner.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'Chiquitos — Delivery',
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent,
      ),
    title: 'Entrar — Chiquitos',
  },
  {
    path: 'auth/signup',
    loadComponent: () =>
      import('./features/auth/signup/signup.component').then(
        (m) => m.SignupComponent,
      ),
    title: 'Criar conta — Chiquitos',
  },
  {
    path: 'loja/:slug',
    loadComponent: () =>
      import('./features/loja/loja-detalhe.component').then(
        (m) => m.LojaDetalheComponent,
      ),
    title: 'Loja — Chiquitos',
  },
  {
    path: 'pedidos',
    loadComponent: () =>
      import('./features/pedidos/pedidos.component').then(
        (m) => m.PedidosComponent,
      ),
    title: 'Meus Pedidos — Chiquitos',
  },
  {
    path: 'pedidos/:uuid',
    loadComponent: () =>
      import('./features/pedidos/pedido-detalhe.component').then(
        (m) => m.PedidoDetalheComponent,
      ),
    title: 'Pedido — Chiquitos',
  },
  {
    path: 'favoritos',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/favoritos/favoritos.component').then(
        (m) => m.FavoritosComponent,
      ),
    title: 'Favoritos — Chiquitos',
  },
  {
    path: 'perfil',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/perfil/perfil.component').then(
        (m) => m.PerfilComponent,
      ),
    title: 'Meu Perfil — Chiquitos',
  },
  {
    path: 'owner',
    canActivate: [ownerGuard],
    loadComponent: () =>
      import('./features/owner/owner-panel.component').then(
        (m) => m.OwnerPanelComponent,
      ),
    title: 'Painel Owner — Chiquitos',
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/admin/admin-lojas-list.component').then(
        (m) => m.AdminLojasListComponent,
      ),
    title: 'Minhas Lojas — Chiquitos',
  },
  {
    path: 'admin/:loja_uuid',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/admin/admin.component').then(
        (m) => m.AdminComponent,
      ),
    title: 'Painel Admin — Chiquitos',
  },
  {
    path: 'design-system',
    loadComponent: () =>
      import('./features/design-system/design-system.component').then(
        (m) => m.DesignSystemComponent,
      ),
    title: 'Design System — Chiquitos',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
    title: '404 — Chiquitos',
  },
];
