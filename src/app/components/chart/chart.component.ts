import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartExporting from 'highcharts/modules/exporting';
import HighchartExportData from 'highcharts/modules/export-data';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
// https://www.itsolutionstuff.com/post/angular-8-highcharts-example-tutorialexample.html
export class ChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    HighchartExporting(Highcharts);
    HighchartExportData(Highcharts);
  }

  title = 'myHighchart';

  data = [{
    name: 'ItSolutionStuff.com',
    data: [2, 4, 6, 8, 10, 12]
  }
    //  ,{
    //     name: 'Nicesnippets.com',
    //     data: [677, 455, 677, 877, 455, 778, 888, 567, 785, 488, 567, 654]
    //  }
  ];

  highcharts = Highcharts;
  chartOptions = {
    chart: {
      type: "column"
    },
    title: {
      text: "Monthly Site Visitor"
    },
    xAxis: {
      //  categories:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      categories: ["lun", "mar", "mie", "jue", "vie", "sab"]
    },
    yAxis: {
      title: {
        text: "Visitors"
      }
    },
    series: this.data
  };

}
