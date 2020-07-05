import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Appointment } from 'src/app/model/Appointment';

export interface DialogData {
  appointment: Appointment;
}

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent {
  indeterminate: boolean;
  constructor(
    public dialogRef: MatDialogRef<SurveyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.indeterminate = this.data.appointment.survey.returnSameProfessional == null;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  

}
