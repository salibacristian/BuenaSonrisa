import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  myFilter = (d: Date): boolean => {
    var date = new Date(d);
    const day = date.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  // array = [
  //   { Column1: "Row 1", Column2: "Row 1", Column3: "Row 1" },
  //   { Column1: "Row 2", Column2: "Row 2", Column3: "Row 2" },
  //   { Column1: "Row 3", Column2: "Row 3", Column3: "Row 3" },
  //   { Column1: "Row 4", Column2: "Row 4", Column3: "Row 4" },
  //   { Column1: "Row 5", Column2: "Row 5", Column3: "Row 5" },
  //   { Column1: "Row 6", Column2: "Row 6", Column3: "Row 6" }
  // ];

  vehiculos= [];

  constructor(private firebaseService: FirebaseService){

  }

  ngOnInit() {
    this.getVehiculos();
  }

  async getVehiculos(){
    // var querySnapshot  = await this.firebaseService.getVehiculos();
    //  this.vehiculos = querySnapshot.docs.map(function(x){
    //     return x.data();
    //   });

    
  }

  getTable(){

    return document.getElementById('contentToConvert');
  }

}
