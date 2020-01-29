import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.css']
})
export class AppointmentsListComponent implements OnInit {
  @Input() appointments;
  constructor() { }

  ngOnInit() {
  }

  displayedColumns: string[] = ['date', 'specialistName', 'clientName'];
  dataSource = this.appointments;

}
