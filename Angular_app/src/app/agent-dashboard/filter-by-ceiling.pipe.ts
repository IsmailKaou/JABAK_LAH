import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByCeiling',
})
export class FilterByCeilingPipe implements PipeTransform {
  transform(items: any[], term: string): any {
    if (term != 'Customers with ceiling') {
      return items.filter((item) => item.ceiling === term);
    } else {
      return items.filter((item) => item);
    }
  }
}
