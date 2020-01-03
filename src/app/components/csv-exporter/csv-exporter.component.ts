import { Component, OnInit, Input } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-csv-exporter',
  templateUrl: './csv-exporter.component.html',
  styleUrls: ['./csv-exporter.component.css']
})
export class CsvExporterComponent implements OnInit {

  @Input() data;

  constructor() { }

  ngOnInit() {
  }

  downloadFile() {
    var data = this.data;
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var blob = new Blob([csvArray], { type: 'text/csv' })
    saveAs(blob, "myFile.csv");
  }

}

