import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minute'
})
export class MinutePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value == 0 ? '00' : value;
    
  }

}
