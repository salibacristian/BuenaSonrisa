import { Pipe, PipeTransform } from '@angular/core';
import { UserType } from '../model/User';

@Pipe({
  name: 'userType'
})
export class UserTypePipe implements PipeTransform {

  transform(type: UserType, ...args: any[]): any {
    switch (type) {
      case UserType.Administrador:
        return 'Administrador';
      case UserType.Paciente: 
      return 'Paciente';
      case UserType.Profesional:
        return 'Profesional';
    }

  }

}
