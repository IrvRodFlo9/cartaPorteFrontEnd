import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generatedColor',
})
export class GeneratedColorPipe implements PipeTransform {
<<<<<<< HEAD:src/app/cartaporte/pipes/generated-color.pipe.ts
  transform(generated: boolean): string {
    return generated === true ? '#1d7906' : '#0c2693';
=======
  transform(value: number): string {
    return value === 1 ? '#1d7906' : '#0c2693';
>>>>>>> develop:src/app/modules/carta-porte/pipes/generated-color.pipe.ts
  }
}
