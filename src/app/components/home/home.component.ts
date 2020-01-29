import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  appointments = [];
  currentUser  = null;
  columnsToDisplay = [];
  constructor(private firebaseService: FirebaseService) {

  }


  async ngOnInit() {
    // setTimeout(this.getAppointments, 5000);   
    // await this.firebaseService.getCurrentUser();
    // await this.getAppointments(); 

  }

  async getAppointments() {
    var user: firebase.User = await this.firebaseService.getAuthCurrentUser();
    this.currentUser = await this.firebaseService.getUser(user.uid);
    var querySnapshot = await this.firebaseService.getAppointments();
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

