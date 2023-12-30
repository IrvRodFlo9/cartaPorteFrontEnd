import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { CartaPorteRoutingModule } from './carta-porte-routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

import { GeneratedColorPipe } from './pipes/generated-color.pipe';
import { GeneratedPipe } from './pipes/generated.pipe';
import { KmPipe } from './pipes/km.pipe';
import { MexicoPipe } from './pipes/mexico.pipe';

import { CompleteComponent } from './pages/complete/complete.component';
import { InfoLabelComponent } from './components/info-label/info-label.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ListComponent } from './pages/list/list.component';
import { LoadingDialogComponent } from './components/loading-dialog/loading-dialog.component';

@NgModule({
  declarations: [
    CompleteComponent,
    GeneratedColorPipe,
    GeneratedPipe,
    InfoLabelComponent,
    KmPipe,
    LayoutComponent,
    ListComponent,
    MexicoPipe,
    LoadingDialogComponent,
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
