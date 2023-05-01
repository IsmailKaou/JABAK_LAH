import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'elements'
})
export class ElementsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
