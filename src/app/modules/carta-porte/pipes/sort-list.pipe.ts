import { Pipe, PipeTransform } from '@angular/core';
import { CartaPorte } from '../interfaces';

@Pipe({
  name: 'sortList',
})
export class SortList implements PipeTransform {
  transform(cartasPorte: CartaPorte[]): CartaPorte[] {
    return cartasPorte.sort((a, b) => (a.status === 0 ? -1 : 1));
  }
}
