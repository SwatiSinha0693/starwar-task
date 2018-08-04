import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], fieldSearch: string): any[] {
    if (!items) { return []; }
    if (!fieldSearch) { return items; }
    fieldSearch = fieldSearch.toLowerCase();
    return items.filter(it => {
      return it['name'].toString().toLowerCase().includes(fieldSearch);
    });
  }

}
