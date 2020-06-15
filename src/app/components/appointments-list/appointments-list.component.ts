import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AppointmentComponent } from '../appointment/appointment.component';
import { Appointment } from 'src/app/model/Appointment';

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.css']
})
export class AppointmentsListComponent implements OnInit {

  appointments: Array<Appointment>;
  constructor(private firebaseService: FirebaseService) { }

  async ngOnInit() {
    this.appointments = await this.firebaseService.getAppointments();
    console.log(this.appointments);
  }

}
