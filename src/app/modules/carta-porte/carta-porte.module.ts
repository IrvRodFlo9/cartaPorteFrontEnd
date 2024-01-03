import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { CartaPorteRoutingModule } from './carta-porte-routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

import {
  DateCartaPortePipe,
  GeneratedColorPipe,
  GeneratedPipe,
  KmPipe,
  MexicoPipe,
  SortList,
} from './pipes';

import { CompleteComponent } from './pages/complete/complete.component';
import { InfoLabelComponent } from './components/info-label/info-label.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ListComponent } from './pages/list/list.component';

@NgModule({
  declarations: [
    CompleteComponent,
    DateCartaPortePipe,
    GeneratedColorPipe,
    GeneratedPipe,
    InfoLabelComponent,
    KmPipe,
    LayoutComponent,
    ListComponent,
    MexicoPipe,
    SortList,
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
