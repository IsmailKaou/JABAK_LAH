import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName',
})
export class FilterByNamePipe implements PipeTransform {
  transform(items: any[], term: string): any {
    // I am unsure what id is here. did you mean title?
    return items.filter(
      (item) => item.firstName.includes(term) || item.lastName.includes(term)
    );
  }
}
