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

// VARIABLES TO CONTROL HOW MUCH IS ADDED/REMOVED PER CLICK
export const ROTARY_INCREMENT = ROTARY_MAXIMUM * 0.05;
export const WEIGHT_INCREMENT = WEIGHT_MAXIMUM * 0.05;
export const PRESSURE_INCREMENT = DIFF_PRESSURE_MAXIMUM * 0.05;
export const PUMP_INCREMENT = PUMP_OUTPUT_MAXIMUM * 0.05;

@Component({
  selector: 'app-input-display',
  templateUrl: './input-display.component.html',
  styleUrls: ['./input-display.component.scss']
})
export class InputDisplayComponent implements OnInit {
  rotary: string;
  weight: string;
  diffPressure: string;
  pumpOutput: string;
  // Values for the above data
  rotaryValue: number = 0;
  weightValue: number = 0;
  pressureValue: number = 0;
  pumpValue: number = 0;
  // Offsets to "mock" the improvements
  rotaryOffset: number = 0;
  weightOffset: number = 0;
  pressureOffset: number = 0;
  pumpOffset: number = 0;

  // general data
  data: any;
  currentRow;
  currentRowCount = 0;

  // VALUES TO CONTROL WHAT INPUTS TO SHOW
  showRotary = true;
  showWeight = true;
  showDiffPressure = true;
  showPump = true;
  // VARIABLES TO CONTROL THE TAB ACTIVE
  isAllTabs = true;
  isSurfaceTab = false;
  isProductionTab = false;

  @Input()
  isPaused: boolean = false;

  constructor(private dataService: DataService) {
    this.updateInputsDisplay();
  }

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
            // Update the values
            this.rotaryValue = this.currentRow[ROTARY_INDEX];
            this.weightValue = this.currentRow[WEIGHT_INDEX] / WEIGHT_MAXIMUM * INPUT_BAR_WIDTH;
            this.pressureValue = this.currentRow[DIFF_PRESSURE_INDEX] / DIFF_PRESSURE_MAXIMUM * INPUT_BAR_WIDTH;
            this.pumpValue = this.currentRow[PUMP_OUTPUT_INDEX] / PUMP_OUTPUT_MAXIMUM * INPUT_BAR_WIDTH;
            // Update the widths
            this.updateInputsDisplay();

          }
        }

      }, 10)
    })
  }

  increase(param: string) {
    if (param == 'rotary') {
      this.rotaryOffset += ROTARY_INCREMENT;
    } else if (param == 'weight') {
      this.weightOffset += WEIGHT_INCREMENT;
    } else if (param == 'pressure') {
      this.pressureOffset += PRESSURE_INCREMENT;
    } else if (param == 'pump') {
      this.pumpOffset += PUMP_INCREMENT;
    }
    this.updateInputsDisplay();
  }
  decrease(param: string) {
    if (param == 'rotary') {
      this.rotaryOffset -= ROTARY_INCREMENT;
    } else if (param == 'weight') {
      this.weightOffset -= WEIGHT_INCREMENT;
    } else if (param == 'pressure') {
      this.pressureOffset -= PRESSURE_INCREMENT;
    } else if (param == 'pump') {
      this.pumpOffset -= PUMP_INCREMENT;
    }
    this.updateInputsDisplay();
    this.test();
  }

  /**
   * Update the values of the input bar based on their values
   */
  updateInputsDisplay() {
    this.rotary = (this.rotaryValue + this.rotaryOffset) / ROTARY_MAXIMUM * INPUT_BAR_WIDTH + 'px';
    this.weight = (this.weightValue + this.weightOffset) / WEIGHT_MAXIMUM * INPUT_BAR_WIDTH + 'px';
    this.diffPressure = (this.pressureValue + this.pressureOffset) / DIFF_PRESSURE_MAXIMUM * INPUT_BAR_WIDTH + 'px';
    this.pumpOutput = (this.pumpValue + this.pumpOffset) / PUMP_OUTPUT_MAXIMUM * INPUT_BAR_WIDTH + 'px';
  }

  test() {
    console.log(this.weightOffset);
  }

  showAll() {
    this.showTab('all');

    this.showRotary = true;
    this.showWeight = true;
    this.showDiffPressure = true;
    this.showPump = true;
  }
  showProduction() {
    this.showTab('production');

    this.showRotary = false;
    this.showWeight = false;
    this.showDiffPressure = true;
    this.showPump = true;
  }
  showSurface() {
    this.showTab('surface');

    this.showRotary = true;
    this.showWeight = true;
    this.showDiffPressure = false;
    this.showPump = true;
  }
  showTab(tab: string) {
    if (tab == 'all') {
      this.isAllTabs = true;
      this.isProductionTab = false;
      this.isSurfaceTab = false;
    } else if (tab == 'production') {
      this.isAllTabs = false;
      this.isProductionTab = true;
      this.isSurfaceTab = false;
    } else if (tab == 'surface') {
      this.isAllTabs = false;
      this.isProductionTab = false;
      this.isSurfaceTab = true;
    }
  }

}
