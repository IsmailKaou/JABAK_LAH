import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FilterByCategorie',
})
export class FilterByCategorie implements PipeTransform {
  transform(items: any[], term: string): any {
    if (term != 'All') {
      return items.filter((item) => item.category.includes(term));
    }
  }
}
