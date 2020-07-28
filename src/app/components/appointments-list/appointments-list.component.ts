import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AppointmentComponent } from '../appointment/appointment.component';
import { Appointment, AppointmentStatus } from 'src/app/model/Appointment';
import { UserType, User } from 'src/app/model/User';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ReviewComponent } from '../review/review.component';
import { SurveyComponent } from '../survey/survey.component';
import { Review } from 'src/app/model/Review';
import { Survey } from 'src/app/model/Survey';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.css']
})
export class AppointmentsListComponent implements OnInit {

  appointments: Array<Appointment>;
  appointmentsOriginal: Array<Appointment>;
  displayedColumns: string[] = [];
  currentUser: User;
  searchText: string;

  constructor(private firebaseService: FirebaseService, public dialog: MatDialog) { }

  async ngOnInit() {
    this.currentUser = await this.firebaseService.getAuthCurrentUser();
    this.displayedColumns = ['Fecha', 'Paciente', 'Profesional', 'Estado', 'Acciones'];

    if (this.currentUser.type == UserType.Paciente)
      this.displayedColumns.splice(1, 1);
    if (this.currentUser.type == UserType.Profesional)
      this.displayedColumns.splice(2, 1);

    this.appointments = await this.firebaseService.getAppointments();
    console.log(this.appointments);
    this.filterAppointments();
  }

  filterAppointments() {
    var user = this.currentUser;
    this.appointments = this.appointments.filter(function (appointment) {
      return user.type == UserType.Administrador
        || appointment.specialist.id == user.id
        || appointment.client.id == user.id;
    });
    this.appointmentsOriginal = this.appointments;
  }

  canCancelAppointment(a: Appointment) {
    return a.status == AppointmentStatus.Aceptado
      || a.status == AppointmentStatus.Pendiente;
  }

  canAcceptAppointment(a: Appointment) {
    return a.status == AppointmentStatus.Pendiente
      && this.currentUser.type != UserType.Paciente;
  }

  showReview(a: Appointment) {
    return (a.status == AppointmentStatus.Aceptado && this.currentUser.type != UserType.Paciente)
      || a.status == AppointmentStatus.Finalizado;
  }

  showSurvey(a: Appointment) {
    return a.status == AppointmentStatus.Finalizado;
  }

  async onchangeAppointmentStatus(appointment: Appointment, status: AppointmentStatus) {
    var title = status == AppointmentStatus.Aceptado ? "Confirmar Turno" : "Cancelar Turno";
    var message = status == AppointmentStatus.Aceptado ? "Desea confirmar el turno?" : "Esta seguro que desea cancelar el turno?";
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { title: title, message: message }
    });

    var confirm = await dialogRef.afterClosed().toPromise();

    if (confirm) {
      appointment.status = status;
      this.firebaseService.updateAppointmentStatus(appointment);
    }
  }

  openReview(appointment: Appointment) {
    if (!appointment.review)
      appointment.review = new Review("", "", null, null);
    var disabled = this.currentUser.type != UserType.Profesional;
    const dialogRef = this.dialog.open(ReviewComponent, {
      width: '500px',
      data: {
        appointment: appointment,
        disabled: disabled
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.firebaseService.saveReview(appointment);
    });
  }

  openSurvey(appointment: Appointment) {
    if (!appointment.survey)
      appointment.survey = new Survey(null, null, "", null);
    var disabled = this.currentUser.type != UserType.Paciente;
    const dialogRef = this.dialog.open(SurveyComponent, {
      width: '500px',
      data: {
        appointment: appointment,
        disabled: disabled
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.firebaseService.saveSurvey(appointment);
    });
  }

  onChangeSearchText() {
    if (this.searchText.length < 3)
      this.appointments = this.appointmentsOriginal;
    else {
      var text = this.searchText.toLowerCase();
      this.appointments = this.appointmentsOriginal
        .filter(function (appointment: Appointment) {
          return new Date(appointment.date.seconds * 1000).toLocaleString().includes(text)
          || appointment.specialist.email.includes(text)
          || appointment.specialist.name.toLowerCase().includes(text)
          || appointment.client.email.includes(text)
          || appointment.client.name.toLowerCase().includes(text)
          || (appointment.review &&
             (appointment.review.comment.toLowerCase().includes(text)
            || (appointment.review.height && appointment.review.height.toString().includes(text))
            || (appointment.review.temperature && appointment.review.temperature.toString().includes(text))
            || (appointment.review.otherFields && JSON.stringify(appointment.review.otherFields).toLowerCase().includes(text)))
            )
          || (appointment.survey && appointment.survey.comment.toLowerCase().includes(text));
        });
    }


  }

  openUserDialog(user: User){
    const dialogRef = this.dialog.open(UserCardComponent, {
      width: '500px',
      data: {
        user: user
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }


}
