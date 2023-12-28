import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generatedColor',
})
export class GeneratedColorPipe implements PipeTransform {
  transform(generated: boolean): string {
    return generated === true ? '#1d7906' : '#0c2693';
  }
}
