import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    var date =  new Date(value.seconds * 1000);
    return date.toLocaleString();
  }

}
