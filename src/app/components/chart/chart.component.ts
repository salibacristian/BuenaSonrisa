import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartExporting from 'highcharts/modules/exporting';
import HighchartExportData from 'highcharts/modules/export-data';
import { ChartDataDto } from '../Dtos/ChartDataDto';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
// https://www.itsolutionstuff.com/post/angular-8-highcharts-example-tutorialexample.html
export class ChartComponent implements OnInit {

   @Input() chartData: ChartDataDto;

  constructor() { }

  ngOnInit() {
    HighchartExporting(Highcharts);
    HighchartExportData(Highcharts);
    console.log(this.chartData);
    this.data = [{
      name: this.chartData.name,
      data: this.chartData.dataY
    }
    ];
  
    this.chartOptions = {
      chart: {
        type: this.chartData.type
      },
      title: {
        text: this.chartData.titleX
      },
      xAxis: {
        //  categories:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        categories: this.chartData.dataX
      },
      yAxis: {
        title: {
          text: this.chartData.titleY
        }
      },
      series: this.data
    };
  }

  data = [
  //   {
  //   name: this.chartData.name,
  //   data: this.chartData.dataY
  // }
    //  ,{
    //     name: 'Nicesnippets.com',
    //     data: [677, 455, 677, 877, 455, 778, 888, 567, 785, 488, 567, 654]
    //  }
  ];

  highcharts = Highcharts;
  chartOptions = {
    // chart: {
    //   type: this.chartData.type
    // },
    // title: {
    //   text: this.chartData.titleX
    // },
    // xAxis: {
    //   //  categories:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    //   categories: this.chartData.dataX
    // },
    // yAxis: {
    //   title: {
    //     text: this.chartData.titleY
    //   }
    // },
    // series: this.data
  };

  // data = [{
  //   name: 'ItSolutionStuff.com',
  //   data: [2, 4, 6, 8, 10, 12]
  // }
  //   //  ,{
  //   //     name: 'Nicesnippets.com',
  //   //     data: [677, 455, 677, 877, 455, 778, 888, 567, 785, 488, 567, 654]
  //   //  }
  // ];

  // highcharts = Highcharts;
  // chartOptions = {
  //   chart: {
  //     type: "column"
  //   },
  //   title: {
  //     text: "Monthly Site Visitor"
  //   },
  //   xAxis: {
  //     //  categories:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  //     categories: ["lun", "mar", "mie", "jue", "vie", "sab"]
  //   },
  //   yAxis: {
  //     title: {
  //       text: "Visitors"
  //     }
  //   },
  //   series: this.data
  // };

  

}
