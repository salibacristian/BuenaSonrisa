import { Pipe, PipeTransform } from '@angular/core';
import { AppointmentStatus } from '../model/Appointment';

@Pipe({
  name: 'appointmentStatus'
})
export class AppointmentStatusPipe implements PipeTransform {

  transform(status: AppointmentStatus, ...args: any[]): any {
   switch (status) {
     case AppointmentStatus.Pendiente:
       return "Esperando Confirmación";
       case AppointmentStatus.Aceptado:
        return "Confirmado";
       case AppointmentStatus.Finalizado:
        return "Concluido";
       case AppointmentStatus.Cancelado:
        return "Cancelado";
       case AppointmentStatus.Perdido:
        return "Perdido";

   }
  }

}
