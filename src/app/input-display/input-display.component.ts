import { Component, OnInit } from '@angular/core';

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
