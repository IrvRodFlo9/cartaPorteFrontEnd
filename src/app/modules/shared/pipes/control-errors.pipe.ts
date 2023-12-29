import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ErrorMap, Gender } from './../interfaces/error-map.interface';

const getLabelGender = (label: string): Gender => {
  const firstWord: string = label.split(' ')[0];

  if (firstWord.endsWith('ón')) return 'female';

  if (!firstWord.endsWith('a') && !firstWord.endsWith('o')) {
    return 'male';
  }

  return firstWord.endsWith('a') ? 'female' : 'male';
};

const errorMap: ErrorMap = {
  required: {
    male: 'obligatorio',
    female: 'obligatoria',
  },
  pattern: {
    male: 'inválido',
    female: 'inválida',
  },
};

@Pipe({
  name: 'getErrors',
})
export class ControlErrorsPipe implements PipeTransform {
  transform(control: AbstractControl | null, label: string = 'Campo'): string[] {
    if (!control || !(control.invalid && control.touched)) {
      return [];
    }

    const errors = control.errors || {};
    const errorMessages: string[] = [];
    const gender: Gender = getLabelGender(label);

    Object.keys(errors).forEach((errorKey) => {
      const errorMessage: string = errorMap[errorKey]
        ? `${label} ${errorMap[errorKey][gender]}`
        : `Error desconocido: ${errorKey}`;

      errorMessages.push(errorMessage);
    });

    return errorMessages.length > 0 ? errorMessages : [];
  }
}
