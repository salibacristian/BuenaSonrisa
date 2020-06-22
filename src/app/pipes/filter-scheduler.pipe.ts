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

    // var date = new Date(d);
    // const day = date.getDay();
    // var spacialistAvailability = this.specialist.availability;
    // //atiende ese dia el profesional elegido? 
    // var specialistAvailable = spacialistAvailability.some(function(x){
    //   switch (day) {
    //     case 0: 
    //      return x.lunes.seleccionado;
    //     case 1:
    //       return x.martes.seleccionado;
    //     case 2:
    //       return x.miercoles.seleccionado;
    //     case 3:
    //       return x.jueves.seleccionado;
    //     case 4:
    //       return x.viernes.seleccionado;
    //     case 5:
    //       return x.sabado.seleccionado;
    //     default: return false;  
    //   }
    // });

    // //filtro el schedule por la disponibildad del profesional
    // var filterSchedule = this.schedule.filter(function(x){
    //  return spacialistAvailability.some(function(y){
    //     switch (day) {
    //       case 0: 
    //        return y.lunes.hora == x.hour && y.lunes.seleccionado;
    //       case 1:
    //         return y.martes.hora == x.hour && y.martes.seleccionado;
    //       case 2:
    //         return y.miercoles.hora == x.hour && y.miercoles.seleccionado;
    //       case 3:
    //         return y.jueves.hora == x.hour && y.jueves.seleccionado;
    //       case 4:
    //         return y.viernes.hora == x.hour && y.viernes.seleccionado;
    //       case 5:
    //         return y.sabado.hora == x.hour && y.sabado.seleccionado;
    //       default: return false;  
    //     }
    //   }); 
    // });    

    // //turnos del profesional elegido
    // var specialistId = this.specialist.id;
    // var specialistAppointments = this.appointments.filter(function(x) {
    //   return x.status < 3 && x.specialist.id == specialistId;
    // });

    // //hay algun horario de los que quedo que no se iguale con los turnos existentes del profesional ese dia
    // var isAvailableSchedule = filterSchedule.some(function(x) {
    //   var datetime = date;
    //   datetime.setHours(x.hour);
    //   datetime.setMinutes(x.min);
    //   return !specialistAppointments.some(function(y){
    //    return y.date == datetime;
    //   });
    // });
    
    return rv;
  }

}
