import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../model/User';
import { Specialty } from '../model/Specialty';
import { stringify } from 'querystring';

@Pipe({
  name: 'filterBySpecialty'
})
export class FilterBySpecialtyPipe implements PipeTransform {

  transform(users: Array<User>, selectedSpecialty: string): Array<User> {
    if(!selectedSpecialty)
      return users;
    return users.filter(x => x.specialties.includes(selectedSpecialty));
  }

}
