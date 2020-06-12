import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userStatus'
})
export class UserStatusPipe implements PipeTransform {

  transform(deleted: boolean, ...args: any[]): any {
    return deleted? 'Deshabilitado' : 'Habilitado';
  }

}
