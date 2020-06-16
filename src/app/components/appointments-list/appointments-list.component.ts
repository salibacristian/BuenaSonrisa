import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AppointmentComponent } from '../appointment/appointment.component';
import { Appointment, AppointmentStatus } from 'src/app/model/Appointment';
import { UserType, User } from 'src/app/model/User';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.css']
})
export class AppointmentsListComponent implements OnInit {

  appointments: Array<Appointment>;
  displayedColumns: string[] = ['Fecha', 'Paciente', 'Profesional', 'Estado'];
  currentUser: User;

  constructor(private firebaseService: FirebaseService, public dialog: MatDialog) { }

  async ngOnInit() {
    this.currentUser = await this.firebaseService.getAuthCurrentUser();
    this.appointments = await this.firebaseService.getAppointments();
    console.log(this.appointments);
  }

  canCancelAppointment(a: Appointment){
    return a.status == AppointmentStatus.Aceptado 
        || a.status == AppointmentStatus.Pendiente;
  }

  canAcceptAppointment(a: Appointment){
    return a.status == AppointmentStatus.Pendiente
        && this.currentUser.type != UserType.Paciente;
  }

  async onchangeAppointmentStatus(appointment: Appointment, status: AppointmentStatus){
    var title = status == AppointmentStatus.Aceptado ? "Confirmar Turno" : "Cancelar Turno";
    var message = status == AppointmentStatus.Aceptado ? "Desea confirmar el turno?" : "Esta seguro que desea cancelar el turno?";
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { title: title, message: message }
    });

    var confirm = await dialogRef.afterClosed().toPromise();

    if(confirm){
      appointment.status = status;
      this.firebaseService.updateAppointmentStatus(appointment);  
    }
  }


}
