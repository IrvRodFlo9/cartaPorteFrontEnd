import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CartaporteRoutingModule } from './cartaporte-routing.module';
import { SharedModule } from '../shared/shared.module';

import { GeneratedColorPipe } from './pipes/generated-color.pipe';

import { CompleteComponent } from './pages/complete/complete.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ListComponent } from './pages/list/list.component';

@NgModule({
  declarations: [
    CompleteComponent,
    GeneratedColorPipe,
    LayoutComponent,
    ListComponent,
  ],
  imports: [
    CartaporteRoutingModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class CartaporteModule {}
