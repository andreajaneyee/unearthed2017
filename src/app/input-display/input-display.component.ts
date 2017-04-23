import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { INPUT_BAR_WIDTH } from '../output-display/output-display.component';
import { REFRESH_RATE } from '../classes/constants';

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

// CONST DANGER ZONES - IN PERCENTAGES
export const ROTARY_DANGER = 0;
export const WEIGHT_DANGER = 0;
export const PRESSURE_DANGER = 0;
export const PUMP_DANGER = 15;

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

  // VARIABLES TO CONTROL ORDER OF INPUTS
  rotaryOrder: number = 1;
  weightOrder: number = 1;
  pressureOrder: number = 1;
  pumpOrder: number = 1;

  // DANGER ZONE FOR INPUTS
  rotaryDanger: string = '15%';
  weightDanger: string = '15%';
  pressureDanger: string = '15%';
  pumpDanger: string = '15%';

  // MOCK TECHLIMIT VALUES
  rotaryTL: number = 0;
  weightTL: number = 0;
  pressureTL: number = 0;
  pumpTL: number = 0;
  // TECHLIMIT RIGHT POSITION
  rotaryTLRight: string = '15%';
  weightTLRight: string = '15%';
  pressureTLRight: string = '15%';
  pumpTLRight: string = '15%';
  // TECHLIMIT MARK POSITIONS
  rotaryTLPosition: string = '0px';
  weightTLPosition: string = '0px';
  pressureTLPosition: string = '0px';
  pumpTLPosition: string = '0px';
  // TECH LIMIT SAFETY
  rotaryTLSafePosition: string = '0px';
  weightTLSafePosition: string = '0px';
  pressureTLSafePosition: string = '0px';
  pumpTLSafePosition: string = '0px';


  // VARIABLES TO MOCK INPUTS
  rotaryParam: number = 0;
  weightParam: number = 0;
  pressureParam: number = 270;
  pumpParam: number = 153;

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
    // UPDATE SIZE OF DANGER ZONE
    this.rotaryDanger = ROTARY_DANGER + '%';
    this.weightDanger = WEIGHT_DANGER + '%';
    this.pumpDanger = PUMP_DANGER + '%';
    this.pressureDanger = PRESSURE_DANGER + '%';
    // UPDATE THE RIGHT OF THE SAFE ZONE
    this.rotaryTLRight = ROTARY_DANGER + '%';
    this.weightTLRight = WEIGHT_DANGER + '%';
    this.pumpTLRight = PUMP_DANGER + '%';
    this.pressureTLRight = PRESSURE_DANGER + '%';

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
            this.weightValue = this.currentRow[WEIGHT_INDEX];
            this.pressureValue = this.currentRow[DIFF_PRESSURE_INDEX];
            this.pumpValue = this.currentRow[PUMP_OUTPUT_INDEX];
            // Update the widths
            // this.updateInputsDisplay();

            // Update the mock techlimit
            // this.rotaryTL = Math.floor(ROTARY_MAXIMUM * 0.5 + ROTARY_MAXIMUM * 0.2 * Math.random());
            // this.weightTL = Math.floor(WEIGHT_MAXIMUM * 0.6 + WEIGHT_MAXIMUM * 0.15 * Math.random());
            this.rotaryTL = 0;
            this.weightTL = 0;
            this.pressureTL = Math.floor(DIFF_PRESSURE_MAXIMUM * 0.8 + DIFF_PRESSURE_MAXIMUM * 0.05 * Math.random());
            this.pumpTL = Math.floor(PUMP_OUTPUT_MAXIMUM * 0.7 + PUMP_OUTPUT_MAXIMUM * 0.1 * Math.random());
            this.updateTechLimitMark();

          }
        }

      }, REFRESH_RATE)
    })
  }

  increase(param: string) {
    if (param == 'rotary') {
      this.rotaryParam = (this.rotaryParam + ROTARY_INCREMENT);
    } else if (param == 'weight') {
      this.weightParam = (this.weightParam + WEIGHT_INCREMENT);
    } else if (param == 'pressure') {
      this.pressureParam = (this.pressureParam + PRESSURE_INCREMENT);
    } else if (param == 'pump') {
      this.pumpParam = (this.pumpParam + PUMP_INCREMENT);
    }
    this.updateInputsDisplay();
  }
  decrease(param: string) {
    if (param == 'rotary') {
      this.rotaryParam = (this.rotaryParam - ROTARY_INCREMENT);
    } else if (param == 'weight') {
      this.weightParam = (this.weightParam - WEIGHT_INCREMENT);
    } else if (param == 'pressure') {
      this.pressureParam = (this.pressureParam - PRESSURE_INCREMENT);
    } else if (param == 'pump') {
      this.pumpParam = (this.pumpParam - PUMP_INCREMENT);
    }
    this.updateInputsDisplay();
  }

  updateTechLimitMark() {
    let temporary: number;

    temporary = Math.floor(this.rotaryTL / ROTARY_MAXIMUM * 100);
    this.rotaryTLPosition = temporary + '%';
    console.log(this.rotaryTLPosition);

    temporary = Math.floor(this.pressureTL / DIFF_PRESSURE_MAXIMUM * 100);
    this.pressureTLPosition = temporary + '%';

    temporary = Math.floor(this.weightTL / WEIGHT_MAXIMUM * 100);
    this.weightTLPosition = temporary + '%';

    temporary = Math.floor(this.pumpTL / PUMP_OUTPUT_MAXIMUM * 100);
    this.pumpTLPosition = temporary + '%';

    this.updateSafetyPosition();
  }

  updateSafetyPosition() {
    let temporary: number;

    temporary = 100 - (this.rotaryTL / ROTARY_MAXIMUM * 100) - ROTARY_DANGER;
    this.rotaryTLSafePosition = temporary + '%';
    
    temporary = 100 - (this.pressureTL / DIFF_PRESSURE_MAXIMUM * 100) - PRESSURE_DANGER;
    this.pressureTLSafePosition = temporary + '%';

    temporary = 100 - (this.weightTL / WEIGHT_MAXIMUM * 100) - WEIGHT_DANGER;
    this.weightTLSafePosition = temporary + '%';

    temporary = 100 - (this.pumpTL / PUMP_OUTPUT_MAXIMUM * 100) - PUMP_DANGER;
    this.pumpTLSafePosition = temporary + '%';

  }

  /**
   * Update the values of the input bar based on their values
   */
  updateInputsDisplay() {
    this.rotary = this.floor100((this.rotaryParam ) / ROTARY_MAXIMUM * 100) + '%';
    this.weight = this.floor100((this.weightParam ) / WEIGHT_MAXIMUM * 100) + '%';
    this.diffPressure = this.floor100((this.pressureParam) / DIFF_PRESSURE_MAXIMUM * 100) + '%';
    this.pumpOutput = this.floor100((this.pumpParam ) / PUMP_OUTPUT_MAXIMUM * 100) + '%';
    this.updateInputsOrder();
  }
  /**
   * Update the order of the inputs
   */
  updateInputsOrder() {
    this.rotaryOrder = (this.rotaryParam ) / ROTARY_MAXIMUM * 100;
    this.weightOrder = (this.weightParam ) / WEIGHT_MAXIMUM * 100;
    this.pressureOrder = (this.pressureParam) / DIFF_PRESSURE_MAXIMUM * 100;
    this.pumpOrder = ((this.pumpParam ) / PUMP_OUTPUT_MAXIMUM * 100);
  }
  floor100(number: number): number {
    return number = number > 100 ? 100 : number;
  }

  pause() {
    this.isPaused = true;
  }
  resume() {
    this.isPaused = false;
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
