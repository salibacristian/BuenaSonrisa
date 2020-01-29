import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.css']
})
export class AppointmentsListComponent implements OnInit {
  @Input() appointments;
  @Input() currentUser: User;
  constructor() { }

  ngOnInit() {
  }

  displayedColumns: string[] = ['date', 'specialistName', 'clientName'];
  dataSource = this.appointments;

  getDisplayedColumns(): string[] {
    if(!this.currentUser)
      return ['date', 'specialistName', 'clientName'];
    switch (this.currentUser.type) {
      case 2: return ['date', 'specialistName'];
      case 3: return ['date', 'clientName'];
      default: return ['date', 'specialistName', 'clientName'];
    }

  }

}
