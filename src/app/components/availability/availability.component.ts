import { Component, OnInit } from '@angular/core';
import { Availability, User } from '../../model/User';
import { FirebaseService } from "../../services/firebase.service";


@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {
  constructor(private firebaseService: FirebaseService) {
  }

  currentUser: User;


  displayedColumns: string[] = ['Hora', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  dataSource: Availability[] = [];

  async ngOnInit() {

    this.currentUser = await this.firebaseService.getAuthCurrentUser();
    if (this.currentUser.availability != "") {
      var currentAvailability: Availability[] = JSON.parse(this.currentUser.availability);

      this.dataSource = currentAvailability;
    }
    else {
      //de lun a vie de 8hs a 19hs
      //sab 8hs a 14hs 
      var initAvailability: Availability[]= [];
      for (let t = 8; t < 19; t++) {
        var obj: Availability = {
          Hora: t,
          lunes: { hora: t, seleccionado: false },
          martes: { hora: t, seleccionado: false },
          miercoles: { hora: t, seleccionado: false },
          jueves: { hora: t, seleccionado: false },
          viernes: { hora: t, seleccionado: false },
          sabado: { hora: t, seleccionado: false },
        };

        initAvailability.push(obj);

      }
      this.dataSource = initAvailability;
    }
  }

  save() {
    this.firebaseService.setAvailability(this.dataSource);
  }

}
