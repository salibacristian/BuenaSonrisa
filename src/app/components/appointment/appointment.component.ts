import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from "../../services/firebase.service";
import { Appointment, AppointmentStatus } from "../../model/Appointment";
import { UserType } from 'src/app/model/User';
import { Time } from '@angular/common';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  constructor(private firebaseService: FirebaseService) { }
  newAppointment: Appointment;
  specialists = [];
  specialties = [];
  selectedSpecialist = null;
  selectedSpecialty = null;
  selectedTime: string = null;
  async ngOnInit() {
    this.specialists = await this.firebaseService.getUsersByType(UserType.Profesional);
    this.specialties = await this.firebaseService.getSpecialties();
  }

  onSelectedDate(date: Date) {
    let hours =  date.getHours().toString().length == 1 ? "0" + date.getHours() : date.getHours();
    let minutes =  date.getMinutes().toString().length == 1 ? "0" + date.getMinutes() : date.getMinutes();
    this.selectedTime = hours + ":" + minutes;
    this.newAppointment = new Appointment(this.selectedSpecialist, null, AppointmentStatus.Pendiente, date);

  }


  AddAppointment() {
     this.firebaseService.addAppointment(this.newAppointment);
  }

}
