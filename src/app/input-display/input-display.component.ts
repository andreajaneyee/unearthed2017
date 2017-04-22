import { Component, OnInit } from '@angular/core';

export const OUTPUT_BAR_WIDTH = 400;

// VARIABLES TO FIND THE INDEX OF THE DATA POINTS

// VARIABLES TO CONTROL THE RANGES OF THE OUTPUTS

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

  constructor() { }

  ngOnInit() {
  }

}
