import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartaporteRoutingModule } from './cartaporte-routing.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { ListComponent } from './pages/list/list.component';
import { CompleteComponent } from './pages/complete/complete.component';
import { GeneratedColorPipe } from './pipes/generated-color.pipe';

@NgModule({
  declarations: [
    LayoutComponent,
    ListComponent,
    CompleteComponent,
    GeneratedColorPipe,
  ],
  imports: [CartaporteRoutingModule, CommonModule, MaterialModule],
})
export class CartaporteModule {}
