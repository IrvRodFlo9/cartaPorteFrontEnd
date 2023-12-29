import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicGuard } from './modules/auth/guards/public.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cartaPorte',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [PublicGuard],
  },
  {
    path: 'cartaPorte',
    loadChildren: () =>
      import('./modules/carta-porte/carta-porte.module').then((m) => m.CartaPorteModule),
  },
  {
    path: '**',
    redirectTo: 'cartaPorte',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
