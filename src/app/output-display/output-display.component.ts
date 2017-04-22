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

  start() {
    this.isPaused = false;
  }
  stop() {
    this.isPaused = true;
  }

}

// function displayGraphExample(id, width, height, interpolation, animate, updateDelay, transitionDelay) {
//   // create an SVG element inside the #graph div that fills 100% of the div
//   var graph = d3.select(id).append("svg:svg").attr("width", "100%").attr("height", "100%");

//   // create a simple data array that we'll plot with a line (this array represents only the Y values, X will just be the index location)
//   var data = [3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 3, 6, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 9];

//   // X scale will fit values from 0-10 within pixels 0-100
//   var x = d3.scaleLinear().domain([0, 48]).range([-5, width]); // starting point is -5 so the first value doesn't show and slides off the edge as part of the transition
//   // Y scale will fit values from 0-10 within pixels 0-100
//   var y = d3.scaleLinear().domain([0, 10]).range([0, height]);

//   // create a line object that represents the SVN line we're creating
//   var line = d3.line()
//     // assign the X function to plot our line as we wish
//     .x(function (d, i) {
//       // verbose logging to show what's actually being done
//       //console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
//       // return the X coordinate where we want to plot this datapoint
//       return x(i);
//     })
//     .y(function (d) {
//       // verbose logging to show what's actually being done
//       //console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + " using our yScale.");
//       // return the Y coordinate where we want to plot this datapoint
//       return y(d);
//     }).
//     .interpolate(interpolation)

//   // display the line by appending an svg:path element with the data line we created above
//   graph.append("svg:path").attr("d", line(data));
//   // or it can be done like this
//   //graph.selectAll("path").data([data]).enter().append("svg:path").attr("d", line);


//   function redrawWithAnimation() {
//     // update with animation
//     graph.selectAll("path")
//       .data([data]) // set the new data
//       .attr("transform", "translate(" + x(1) + ")") // set the transform to the right by x(1) pixels (6 for the scale we've set) to hide the new value
//       .attr("d", line) // apply the new data values ... but the new value is hidden at this point off the right of the canvas
//       .transition() // start a transition to bring the new value into view
//       .ease("linear")
//       .duration(transitionDelay) // for this demo we want a continual slide so set this to the same as the setInterval amount below
//       .attr("transform", "translate(" + x(0) + ")"); // animate a slide to the left back to x(0) pixels to reveal the new value

//     /* thanks to 'barrym' for examples of transform: https://gist.github.com/1137131 */
//   }

//   function redrawWithoutAnimation() {
//     // static update without animation
//     graph.selectAll("path")
//       .data([data]) // set the new data
//       .attr("d", line); // apply the new data values
//   }

//   setInterval(function () {
//     var v = data.shift(); // remove the first element of the array
//     data.push(v); // add a new element to the array (we're just taking the number we just shifted off the front and appending to the end)
//     if (animate) {
//       redrawWithAnimation();
//     } else {
//       redrawWithoutAnimation();
//     }
//   }, updateDelay);
// }

// displayGraphExample("#graph1", 300, 150, "basis", true, 1000, 1000);