import { Component, OnInit, ViewChild } from '@angular/core';
import { InputDisplayComponent } from '../input-display/input-display.component';
import { OutputDisplayComponent } from '../output-display/output-display.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  @ViewChild(InputDisplayComponent)
  private inputDisplay: InputDisplayComponent;
  @ViewChild(OutputDisplayComponent)
  private outputDisplay: OutputDisplayComponent;

  constructor() { }

  ngOnInit() {
  }

  start() {
    this.inputDisplay.resume();
    this.outputDisplay.start();
  }
  stop() {
    this.inputDisplay.pause();
    this.outputDisplay.stop();
  }

}
