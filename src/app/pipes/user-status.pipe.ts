import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userStatus'
})
export class UserStatusPipe implements PipeTransform {

  transform(booleanProperty: boolean, ...args: any[]): any {
    let arg = args.shift();
    if(arg == 'deleted')
      return booleanProperty? 'Deshabilitado' : 'Habilitado';
    if(arg == 'disabled')
      return booleanProperty? 'pending' : 'verified_user';

  }

}
