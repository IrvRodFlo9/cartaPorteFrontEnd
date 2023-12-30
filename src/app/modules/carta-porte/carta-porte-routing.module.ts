import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './pages/layout/layout.component';
import { ListComponent } from './pages/list/list.component';
import { CompleteComponent } from './pages/complete/complete.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'list', component: ListComponent, data: { title: 'Historial' } },
      {
        path: 'complete/:orderNumber',
        component: CompleteComponent,
        data: { title: 'Completar Carta Porte' },
      },
      { path: '**', redirectTo: 'list' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartaPorteRoutingModule {}
