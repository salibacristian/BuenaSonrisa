import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  

  constructor(private firebaseService: FirebaseService){

  }

  
  ngOnInit() {
    // this.getVehiculos();
  }

  // async getVehiculos(){
  //   // var querySnapshot  = await this.firebaseService.getVehiculos();
  //   //  this.vehiculos = querySnapshot.docs.map(function(x){
  //   //     return x.data();
  //   //   });

    
  // }

  // getTable(){
  //   return document.getElementById('contentToConvert');
  // }

}

