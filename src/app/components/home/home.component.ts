import { Component, OnInit,Inject, ElementRef, ViewChild } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  name: string;
}

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

  constructor(private firebaseService: FirebaseService,
    public dialog: MatDialog){

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: 'sdfsf'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
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

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
