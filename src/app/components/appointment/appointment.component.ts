import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FirebaseService} from "../../services/firebase.service";
import { Appointment } from "../../model/Appointment";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
 
  constructor( private firebaseService: FirebaseService) { }
  appointments: Array<Appointment> = new Array<Appointment>();
  specialists = [];
  selectedSpecialistId = null;
  async ngOnInit() {
    this.specialists = await this.firebaseService.getUsers();
  }

  onSelectedDates(dates){
    dates.forEach(date => {
      this.appointments.push(new Appointment(this.selectedSpecialistId,'','',1,date,''));
   });
  }

  Register(){
    this.firebaseService.addAppointments(this.appointments);
  }

}
