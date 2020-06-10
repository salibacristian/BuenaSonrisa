import { Component, OnInit, Inject } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { User } from "../../model/User";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  appointments = [];
  // currentUser: User  = JSON.parse(localStorage.getItem('prueba'));
  currentUser: User;
  columnsToDisplay = [];
  constructor(private firebaseService: FirebaseService,  public dialog: MatDialog) {

  }

  async ngOnInit() {
    this.currentUser = await this.firebaseService.getAuthCurrentUser();

  }

  openSpecialtyDialog(): void {
    const dialogRef = this.dialog.open(AddSpecialtyDialog, {
      width: '250px',
      data: {
        title: 'Nueva Especialidad',
        specialty: ""
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(result.length)
        this.firebaseService.addSpecialty(result);
    });
  }



  // async ngOnInit() {
  //    await this.getAppointments(); 

  // }

  // async getAppointments() {

  //   var querySnapshot = await this.firebaseService.getAppointments(this.currentUser.id, this.currentUser.type);
  //   if (querySnapshot.docs.length) {
  //     this.appointments = querySnapshot.docs.map(function (x) {
  //       return x.data();
  //     });

  //     for (let index = 0; index < this.appointments.length; index++) {
  //       const appointment = this.appointments[index];
  //       var specialist = await this.firebaseService.getUser(appointment.specialistId);
  //        appointment.specialistName = specialist.name;
  //        var client = await this.firebaseService.getUser(appointment.clientId);
  //        appointment.clientName = client.name;
  //     }
  //     console.log(this.appointments);
      
       
  //   }

  // }

  // getTable(){
  //   return document.getElementById('contentToConvert');
  // }

}

@Component({
  selector: 'add-specialty-dialog',
  templateUrl: '../../dialogs/AddSpecialtyDialog.html',
})
export class AddSpecialtyDialog {

  constructor(public dialogRef: MatDialogRef<AddSpecialtyDialog>
    , @Inject(MAT_DIALOG_DATA) public data: string)  
  { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
