import { NgModule } from '@angular/core';

import { ControlErrorsPipe } from './pipes/control-errors.pipe';

@NgModule({
  declarations: [ControlErrorsPipe],
  exports: [ControlErrorsPipe],
})
export class SharedModule {}
