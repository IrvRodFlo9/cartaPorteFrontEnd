import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { InputErrorMap, Gender } from '../interfaces/error-map.interface';

const inputErrorMap: InputErrorMap = {
  required: {
    male: 'obligatorio',
    female: 'obligatoria',
  },
  pattern: {
    male: 'inválido',
    female: 'inválida',
  },
};

@Injectable({ providedIn: 'root' })
export class ErrorsService {
  public getFormControlErrors(
    control: AbstractControl | null,
    label: string = 'Campo'
  ): string[] {
    if (!control || !(control.invalid && control.touched)) {
      return [];
    }

    const errors = control.errors || {};
    const errorMessages: string[] = [];
    const gender: Gender = this.getLabelGender(label);

    Object.keys(errors).forEach((errorKey) => {
      const errorMessage: string = inputErrorMap[errorKey]
        ? `${label} ${inputErrorMap[errorKey][gender]}`
        : `Error desconocido: ${errorKey}`;

      errorMessages.push(errorMessage);
    });

    return errorMessages.length > 0 ? errorMessages : [];
  }

  private getLabelGender = (label: string): Gender => {
    const firstWord: string = label.split(' ')[0];

    if (firstWord.endsWith('ón')) return 'female';

    if (!firstWord.endsWith('a') && !firstWord.endsWith('o')) {
      return 'male';
    }

    return firstWord.endsWith('a') ? 'female' : 'male';
  };
}
