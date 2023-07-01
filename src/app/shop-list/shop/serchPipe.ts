import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'search'
})
export class searchPipe implements PipeTransform{

    transform(value: any,searchName:string) {
        if (value.length === 0 || searchName === '') {
            return value;
          }

          const resultArray = [];
          for (const item of value) {
            if (item['shopTittle'].toUpperCase().includes(searchName.toUpperCase()) || item['shopDescription'].toUpperCase().includes(searchName.toUpperCase())) {
              resultArray.push(item);
            }
          }
          return resultArray;
        
    }

}