import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const getLabelGender = (label: string): 'male' | 'female' => {
  const firstWord: string = label.split(' ')[0];

  if (firstWord.endsWith('ón')) return 'female';

  if (!firstWord.endsWith('a') && !firstWord.endsWith('o')) {
    return 'male';
  }

  return firstWord.endsWith('a') ? 'female' : 'male';
};

@Pipe({
  name: 'getErrors',
})
export class GetErrorsPipe implements PipeTransform {
  transform(
    control: AbstractControl | null,
    label: string = 'Campo'
  ): string[] {
    if (!control || !(control.invalid && control.touched)) {
      return [];
    }

    const errors = control.errors || {};
    const errorMessages: string[] = [];
    const gender: 'male' | 'female' = getLabelGender(label);

    const obligatoryMap = {
      male: 'obligatorio',
      female: 'obligatoria',
    };

    const invalidMap = {
      male: 'inválido',
      female: 'inválida',
    };

    Object.keys(errors).forEach((errorKey) => {
      switch (errorKey) {
        case 'required':
          errorMessages.push(`${label} ${obligatoryMap[gender]}`);
          break;
        case 'pattern':
          errorMessages.push(`${label} ${invalidMap[gender]}`);
          break;
        default:
          break;
      }
    });

    return errorMessages.length > 0 ? errorMessages : [];
  }
}
