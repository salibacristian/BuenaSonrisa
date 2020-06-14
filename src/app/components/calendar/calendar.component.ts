import { Component, OnInit, Inject, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseService } from "../../services/firebase.service";
import { Appointment } from 'src/app/model/Appointment';
import { Time } from '@angular/common';

export interface DialogData {
  hour: number;
  min: number;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input() specialistId;
  @Output() selectDate: EventEmitter<any>= new EventEmitter<any>();
  minDate = new Date();
  maxDate = new Date(new Date().setDate(new Date().getDate() + 15));
  selectedDate: Date = null; 

  //hor de at lun a vie de 8hs a 19hs sab de 8hs a 14hs
  hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  minutes = [0, 30];
  schedule: Array<DialogData> = [];
  appointments = Array<Appointment>();

  public async onSelectDate(event) {
    // this.appointments = await this.firebaseService.getAppointmentsByDate(this.selectedDate, this.specialistId);
    this.openDialog();
  }

  myFilter = (d: Date): boolean => {
    var date = new Date(d);
    const day = date.getDay();
    return  day !== 6;
  };
  constructor(private firebaseService: FirebaseService, public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {
        title: 'Seleccione el Horario',
        schedule: this.schedule,
        appointments: this.appointments
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      var selectedOptions = [];
      result.forEach(r => {
        selectedOptions.push(r.value);
      });
      var selectedDate = new Date();
      selectedOptions.forEach(element => {
        var date = new Date(this.selectedDate);
        date.setDate(date.getDate() + 1);  //FIX
        date.setHours(element.hour);
        date.setMinutes(element.min);
        selectedDate = date;
      });
      this.selectDate.emit(selectedDate);
    });
  }

  ngOnInit() {
    this.hours.forEach(h => {
      this.minutes.forEach(m => {
        this.schedule.push({ hour: h, min: m });
      });
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: '../../dialogs/dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectedOptions: Array<Time> = [];

  onNgModelChange(){
    if(this.selectedOptions.length > 1){
      this.selectedOptions = [];
    }

  }

}
