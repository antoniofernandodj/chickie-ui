import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // páginas públicas → SSR completo
  { path: '',          renderMode: RenderMode.Server },
  { path: 'loja/:uuid',renderMode: RenderMode.Server },
  // auth e páginas interativas → renderizadas no cliente
  { path: '**',        renderMode: RenderMode.Client },
];
