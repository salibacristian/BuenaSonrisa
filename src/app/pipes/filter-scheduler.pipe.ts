import { Pipe, PipeTransform } from '@angular/core';
import { Appointment } from '../model/Appointment';
import { DialogData } from '../components/calendar/calendar.component';

@Pipe({
  name: 'filterScheduler'
})
export class FilterSchedulerPipe implements PipeTransform {

  transform(items: DialogData[], appointments: Appointment[]): any {
    if (!items || !appointments) {
      return items;
    }
    var rv = [];

    items.forEach(item => {
      var exist = false;
      appointments.forEach(appointment => {
        if (item.hour == appointment.date.getHours() && item.min == appointment.date.getMinutes()) {
          exist = true;
        }
      });

      if(!exist)
        rv.push(item);
    });
    
    return rv;
  }

}
