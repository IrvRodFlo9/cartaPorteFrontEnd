import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateCP',
})
export class DateCartaPortePipe implements PipeTransform {
  transform(orderNumber: string): string {
    let date: string = orderNumber.slice(-6);
    date = date.replace(/(.{2})/g, '$1/');
    date = date.slice(0, -1);

    return date;
  }
}
