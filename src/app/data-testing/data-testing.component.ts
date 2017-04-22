import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { PasonRow } from '../classes/pasonRow';

@Component({
  selector: 'app-data-testing',
  templateUrl: './data-testing.component.html',
  styleUrls: ['./data-testing.component.scss']
})
export class DataTestingComponent implements OnInit {
  data: PasonRow[];
  label: PasonRow;
  currentRow: PasonRow;
  currentRowCount = 0;

  // Data to be displayed
  isPaused = false;
  currentDifferentialPressure = '200px';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getScenarioData().subscribe(wholeData => {
      this.label = wholeData[0];
      this.data = wholeData.slice(1);
      this.currentRow = this.data[0];
      console.log(this.currentRow);
      // console.log(this.data);
      setInterval(() => {
        this.currentRowCount++;
        if (!this.isPaused) {
          if (this.currentRowCount < this.data.length) {
            this.currentRow = this.data[this.currentRowCount];
            this.currentDifferentialPressure = this.data[this.currentRowCount][3] + 'px';
          }
        }

      }, 10)
      // for (let i = 0; i < this.data.length; i++) {
      //   setTimeout(() => {
      //     this.currentRow = this.data[i];
      //   }, 500)
      // }

    })
  }

  pause() {
    this.isPaused = true;
  }
  play() {
    this.isPaused = false;
  }

}
