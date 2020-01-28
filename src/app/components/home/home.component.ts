import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  appointments = [];

  constructor(private firebaseService: FirebaseService) {

  }


  async ngOnInit() {
    // setTimeout(this.getAppointments, 5000);   
    // await this.firebaseService.getCurrentUser();
    // await this.getAppointments(); 

  }

  async getAppointments() {
    var querySnapshot = await this.firebaseService.getAppointments();
    if (querySnapshot.docs.length) {
      this.appointments = querySnapshot.docs.map(function (x) {
        return x.data();
      });
      console.log(this.appointments);
    }

  }

  // getTable(){
  //   return document.getElementById('contentToConvert');
  // }

}

