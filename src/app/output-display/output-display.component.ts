import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import * as d3 from 'd3';

export const INPUT_BAR_WIDTH = 360;

// VARIABLES TO FIND THE INDEX OF THE DATA POINTS
export const HOLE_DEPTH_INDEX = 0;
export const TORQUE_INDEX = 5;
export const STANDPIPE_INDEX = 6;
export const FLOW_INDEX = 7;

// VARIABLES TO CONTROL THE RANGES OF THE OUTPUTS
export const TORQUE_MAXIMUM = 150;
export const STANDPIPE_PRESSURE_MAXIMUM = 2500;
export const FLOW_MAXIMUM = 100;

@Component({
  selector: 'app-output-display',
  templateUrl: './output-display.component.html',
  styleUrls: ['./output-display.component.scss']
})
export class OutputDisplayComponent implements OnInit {
  torque: string = '0px';
  standpipePressure: string = '0px';
  flow: string = '0px';
  depth: number = 0;

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
            this.depth = this.currentRow[HOLE_DEPTH_INDEX];
            this.torque = this.currentRow[TORQUE_INDEX] / TORQUE_MAXIMUM * INPUT_BAR_WIDTH + 'px';
            this.standpipePressure = this.currentRow[STANDPIPE_INDEX] / STANDPIPE_PRESSURE_MAXIMUM * INPUT_BAR_WIDTH + 'px';
            this.flow = this.currentRow[FLOW_INDEX] / FLOW_MAXIMUM * INPUT_BAR_WIDTH + 'px';
          }
        }

      }, 10)
    })
  }

}
