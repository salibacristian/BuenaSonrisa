import { Component, OnInit, Inject, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseService } from "../../services/firebase.service";
import { Appointment } from 'src/app/model/Appointment';
import { Time } from '@angular/common';
import { User } from 'src/app/model/User';

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
  @Input() specialist: User;
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
    this.openDialog();
  }

  myFilter = (d: Date): boolean => {
    var date = new Date(d);
    //atiende ese dia el profesional elegido?

    //turnos del profesional elegido
    // var specialistId = this.specialist.id;
    // var appointmentsForDate = this.appointments.filter(function(x) {
    //   return x.status < 3 && x.specialist.id == specialistId;
    // });

    //filtro el schedule por la disponibildad del profesional

    //hay algun horario de los que quedo que no se iguale con los turnos existentes del profesional ese dia
    // this.schedule.some(function(x) {
    //   var datetime = 
    //   date.setHours(x.hour);
    //   date.setMinutes(x.hour);
    //   datetime
    // })

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

  async ngOnInit() {
    this.hours.forEach(h => {
      this.minutes.forEach(m => {
        this.schedule.push({ hour: h, min: m });
      });
    });

    this.appointments = await this.firebaseService.getAppointments();

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
