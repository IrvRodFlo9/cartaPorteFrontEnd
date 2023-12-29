import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generatedColor',
})
export class GeneratedColorPipe implements PipeTransform {
  transform(value: number): string {
    return value === 1 ? '#1d7906' : '#0c2693';
  }
}
