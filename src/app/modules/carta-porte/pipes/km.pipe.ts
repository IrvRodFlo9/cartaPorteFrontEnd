import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'km',
})
export class KmPipe implements PipeTransform {
  transform(distance: string | undefined): string {
    return distance ? `${distance} km` : '';
  }
}
