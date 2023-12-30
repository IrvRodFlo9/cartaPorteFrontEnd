import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { CartaPorteRoutingModule } from './carta-porte-routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

import { GeneratedPipe } from './pipes/generated.pipe';
import { GeneratedColorPipe } from './pipes/generated-color.pipe';

import { LayoutComponent } from './pages/layout/layout.component';
import { ListComponent } from './pages/list/list.component';
import { CompleteComponent } from './pages/complete/complete.component';

@NgModule({
  declarations: [
    GeneratedColorPipe,
    GeneratedPipe,
    LayoutComponent,
    ListComponent,
    CompleteComponent,
  ],
  imports: [
    CartaPorteRoutingModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class CartaPorteModule {}
