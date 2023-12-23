import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generatedColor',
})
export class GeneratedColorPipe implements PipeTransform {
  transform(value: string): string {
    return value.toLowerCase() === 'generada' ? '#1d7906' : '#0c2693';
  }
}
