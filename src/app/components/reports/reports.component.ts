import { Component, OnInit } from '@angular/core';
import { ChartDataDto } from '../Dtos/ChartDataDto';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Appointment } from 'src/app/model/Appointment';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  loading: boolean;
  chartData: ChartDataDto;
  appointments: Array<Appointment>;
  // reports: Array<ChartDataDto> = [
  //   new ChartDataDto("spline", "sarasa1", [12, 4, 2, 2, 4, 12], ["lun", "mar", "mie", "jue", "vie", "sab"], "eje y", "aca va el titulo")
  //   ,new ChartDataDto("column", "sarasa2", [12, 4, 2, 2, 4, 12], ["lun", "mar", "mie", "jue", "vie", "sab"], "eje y", "aca va el titulo")
  // ];
  reportsNames: Array<string> = [
    , "Turnos por Día" //dias de la semana
    , "Operaciones por Especialidad"
    , "Pacientes por Especialidad"
    , "Medicos por Especialidad"
  ];


  constructor(private firebaseService: FirebaseService) { }

  async ngOnInit() {
    // this.chartData = new ChartDataDto("spline", "sarasa", [12, 4, 2, 2, 4, 12], ["lun", "mar", "mie", "jue", "vie", "sab"], "eje y", "aca va el titulo");
    this.loading = true;
    this.appointments = await this.firebaseService.getAppointments();
    this.loading = false;

  }

  async onChangeReport(e) {
    console.log(e);
    this.chartData = null;
    await this.delay(1000);//para que el grafico muera
    var newChartDataDto: ChartDataDto;
    switch (e) {
      case "Turnos por Día":
        newChartDataDto = this.appointmentsByDay();
        break;
      case "Operaciones por Especialidad":
        newChartDataDto = this.appointmentsBySpecialty();
        break;
      case "Pacientes por Especialidad":
        break;
      case "Medicos por Especialidad":
        break;
    }
    this.chartData = newChartDataDto;
  }

  public delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  appointmentsByDay() {
    var counts = [0, 0, 0, 0, 0, 0];
    this.appointments.forEach(a => {
      var date = new Date(a.date.seconds * 1000);
      var day = date.getDay();
      counts[day - 1]++;
    });
    return new ChartDataDto("column", "Día", counts, ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"], "Cantidad de Turnos", "Cantidad de Turnos por Día");
  }

  appointmentsBySpecialty() {
    var specialties = [];

    this.appointments.forEach(a => {
      if (a.review) {
        var specialty = specialties.find(function (s) {
          return s.name == a.review.specialty;
        });
        if (!specialty)
          specialties.push({ name: a.review.specialty, count: 1 })
        else {
          specialties.forEach(function (s) {
            if (s.name == specialty.name)
              s.count++;
          });
        }
      }
    });
    return new ChartDataDto("column", "Día", specialties.map(x => x.count), specialties.map(x => x.name), "Cantidad de Turnos", "Cantidad de Turnos por Día");
  }


}
