import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicGuard } from './auth/guards/public.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cartaporte',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [PublicGuard],
  },
  {
    path: 'cartaporte',
    loadChildren: () =>
      import('./cartaporte/cartaporte.module').then((m) => m.CartaporteModule),
  },

  {
    path: '**',
    redirectTo: 'cartaporte',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
