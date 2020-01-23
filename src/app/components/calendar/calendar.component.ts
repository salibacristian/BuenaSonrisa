import { Component, OnInit, Inject, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseService } from "../../services/firebase.service";
import { Appointment } from 'src/app/model/Appointment';

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
  selectedDate: Date = null; 

  //hor de at lun a vie de 8hs a 19hs sab de 8hs a 14hs
  hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  minutes = [0, 15, 30, 45];
  schedule: Array<DialogData> = [];
  appointments = Array<Appointment>();

  public async onSelectDate(event) {
    this.appointments = await this.firebaseService.getAppointments(this.selectedDate, this.specialistId);
    this.openDialog();
  }

  myFilter = (d: Date): boolean => {
    var date = new Date(d);
    const day = date.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
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
      console.log('The dialog was closed');
      console.log(result);
      var selectedOptions = [];
      result.forEach(r => {
        selectedOptions.push(r.value);
      });
      console.log(selectedOptions);
      //tengo los horarios, manda fechas
      var selectedDates = [];
      selectedOptions.forEach(element => {
        var date = new Date(this.selectedDate);
        date.setHours(element.hour);
        date.setMinutes(element.min);
        selectedDates.push(date);
      });
      this.selectDate.emit(selectedDates);
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

}
