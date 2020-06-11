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
  constructor(private firebaseService: FirebaseService, public dialog: MatDialog) {

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
      if (result.length)
        this.firebaseService.addSpecialty(result);
    });
  }

  async openUserSpecialtiesDialog() {
    var specialties = await this.firebaseService.getSpecialties();
    const dialogRef = this.dialog.open(UserSpecialtiesDialog, {
      width: '500px',
      data: {
        title: 'Mis Especialidades',
        specialties: specialties,
        userSpecialties: this.currentUser.specialties
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result.length){
        this.currentUser.specialties = result;
        this.firebaseService.addUserSpecialties(result);
      }
    });
  }
}

@Component({
  selector: 'add-specialty-dialog',
  templateUrl: '../../dialogs/AddSpecialtyDialog.html',
})
export class AddSpecialtyDialog {

  constructor(public dialogRef: MatDialogRef<AddSpecialtyDialog>
    , @Inject(MAT_DIALOG_DATA) public data: string) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'user-specialties-dialog',
  templateUrl: '../../dialogs/userSpecialtiesDialog.html',
})
export class UserSpecialtiesDialog {

  constructor(public dialogRef: MatDialogRef<UserSpecialtiesDialog>
    , @Inject(MAT_DIALOG_DATA) public data: Array<string>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

