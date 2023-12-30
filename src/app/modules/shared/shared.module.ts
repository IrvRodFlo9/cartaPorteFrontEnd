import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';

import { LoaderComponent, LoadingDialogComponent } from './components/';

@NgModule({
  declarations: [LoaderComponent, LoadingDialogComponent],
  imports: [MaterialModule],
  exports: [LoaderComponent],
})
export class SharedModule {}
