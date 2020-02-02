import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { User } from "../../model/User";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  appointments = [];
  currentUser: User  = JSON.parse(localStorage.getItem('prueba'));
  columnsToDisplay = [];
  constructor(private firebaseService: FirebaseService) {

  }


  async ngOnInit() {
     await this.getAppointments(); 

  }

  async getAppointments() {

    var querySnapshot = await this.firebaseService.getAppointments(this.currentUser.id, this.currentUser.type);
    if (querySnapshot.docs.length) {
      this.appointments = querySnapshot.docs.map(function (x) {
        return x.data();
      });

      for (let index = 0; index < this.appointments.length; index++) {
        const appointment = this.appointments[index];
        var specialist = await this.firebaseService.getUser(appointment.specialistId);
         appointment.specialistName = specialist.name;
         var client = await this.firebaseService.getUser(appointment.clientId);
         appointment.clientName = client.name;
      }
      console.log(this.appointments);
      
       
    }

  }

  // getTable(){
  //   return document.getElementById('contentToConvert');
  // }

}

