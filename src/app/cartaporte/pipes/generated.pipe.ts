import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generated',
})
export class GeneratedPipe implements PipeTransform {
  transform(value: number): string {
    return value === 1 ? 'Generada' : 'Por Generar';
  }
}
