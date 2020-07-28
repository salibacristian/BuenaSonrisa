import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from 'src/app/model/Appointment';

export interface DialogData {
  appointment: Appointment;
  disabled: boolean
}

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {

  constructor(
    public dialogRef: MatDialogRef<ReviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  newField = { key: "", value: "" };

  addNewFiled() {
    if (!this.data.appointment.review.otherFields)
      this.data.appointment.review.otherFields = [];
    this.data.appointment.review.otherFields.push({...this.newField});
  }

canAdd(){
  return !this.data.disabled && this.newField.key && this.newField.value;
}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
