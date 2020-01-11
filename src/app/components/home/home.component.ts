import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  minDate = new Date();
  selectedDate = null;
  
  public sarasa(event): void {
    alert (this.selectedDate);
  }

  myFilter = (d: Date): boolean => {
    var date = new Date(d);
    const day = date.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

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
