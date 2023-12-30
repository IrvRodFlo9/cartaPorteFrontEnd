import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mexico',
})
export class MexicoPipe implements PipeTransform {
  transform(state: string | undefined): string {
    return state ? `${state}, México` : '';
  }
}
