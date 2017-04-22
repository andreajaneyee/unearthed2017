import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { INPUT_BAR_WIDTH } from '../output-display/output-display.component';

export const OUTPUT_BAR_WIDTH = 400;

// VARIABLES TO FIND THE INDEX OF THE DATA POINTS
export const ROTARY_INDEX = 1;
export const WEIGHT_INDEX = 4;
export const DIFF_PRESSURE_INDEX = 2;
export const PUMP_OUTPUT_INDEX = 3;

// VARIABLES TO CONTROL THE RANGES OF THE OUTPUTS
export const ROTARY_MAXIMUM = 100;
export const WEIGHT_MAXIMUM = 50000;
export const DIFF_PRESSURE_MAXIMUM = 1500;
export const PUMP_OUTPUT_MAXIMUM = 450;

@Component({
  selector: 'app-input-display',
  templateUrl: './input-display.component.html',
  styleUrls: ['./input-display.component.scss']
})
export class InputDisplayComponent implements OnInit {
  rotary: string = '100px';
  weight: string = '100px';
  diffPressure: string = '100px';
  pumpOutput: string = '100px';

  // general data
  data: any;
  currentRow;
  currentRowCount = 0;

  @Input()
  isPaused: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit() {
     this.dataService.getScenarioData().subscribe(wholeData => {
      this.data = wholeData.slice(1);
      this.currentRow = this.data[0];
      console.log(this.currentRow);
      // console.log(this.data);
      setInterval(() => {
        this.currentRowCount++;
        if (!this.isPaused) {
          if (this.currentRowCount < this.data.length) {
            this.currentRow = this.data[this.currentRowCount];
            // Update the variables
            this.rotary = this.currentRow[ROTARY_INDEX] / ROTARY_MAXIMUM * INPUT_BAR_WIDTH + 'px';
            this.weight = this.currentRow[WEIGHT_INDEX] / WEIGHT_MAXIMUM * INPUT_BAR_WIDTH + 'px';
            this.diffPressure = this.currentRow[DIFF_PRESSURE_INDEX] / DIFF_PRESSURE_MAXIMUM * INPUT_BAR_WIDTH + 'px';
            this.pumpOutput = this.currentRow[PUMP_OUTPUT_INDEX] / PUMP_OUTPUT_MAXIMUM * INPUT_BAR_WIDTH + 'px';
          }
        }

      }, 10)
    })
  }

}
