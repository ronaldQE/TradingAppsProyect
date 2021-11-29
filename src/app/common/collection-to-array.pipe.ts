import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'collectionToArray'
})
export class CollectionToArrayPipe implements PipeTransform {
  /* objeto {
    a:{},
    b:{},
    c:{},
    g:{}
  }
  objecto = [
    {}, //a
    {}, //b
  ]
  
  
  */
  transform(values: any): any[] {
    const f = [];
    for (const g in values) {
      f.push({
        ...values[g]
      })
    }
    return f;
  }

}
