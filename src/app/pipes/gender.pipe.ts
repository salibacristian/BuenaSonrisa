import { Pipe, PipeTransform } from '@angular/core';
import { Gender } from '../model/User';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    switch (value) {
      case Gender.Masculino:
        return 'Masculino';
      case Gender.Femenino: 
      return 'Femenino';
      default:
        return 'Indefinido';
    }
  }

}
