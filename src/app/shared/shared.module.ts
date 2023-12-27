import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetErrorsPipe } from './pipes/control-errors.pipe';

@NgModule({
  declarations: [GetErrorsPipe],
  exports: [GetErrorsPipe],
})
export class SharedModule {}
