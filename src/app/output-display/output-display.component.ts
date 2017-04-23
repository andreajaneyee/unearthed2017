import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { REFRESH_RATE } from '../classes/constants';

export const INPUT_BAR_WIDTH = 360;

// VARIABLES TO FIND THE INDEX OF THE DATA POINTS
export const HOLE_DEPTH_INDEX = 0;
export const TORQUE_INDEX = 5;
export const STANDPIPE_INDEX = 6;
export const FLOW_INDEX = 7;
export const ROP_INDEX = 8;

// VARIABLES TO CONTROL THE RANGES OF THE OUTPUTS
export const TORQUE_MAXIMUM = 150;
export const STANDPIPE_PRESSURE_MAXIMUM = 3000;
export const FLOW_MAXIMUM = 100;
export const ROP_MAXIMUM = 200;

@Component({
  selector: 'app-output-display',
  templateUrl: './output-display.component.html',
  styleUrls: ['./output-display.component.scss']
})
export class OutputDisplayComponent implements OnInit {
  // WIDTHS OF THE BARS
  torqueWidth: string = '0px';
  pressureWidth: string = '0px';
  flowWidth: string = '0px';
  ropWidth: string = '0px';
  // MAIN VARIABLSE TO DISPLAY THE BARS
  torque: number = 0;
  pressure: number = 0;
  flow: number = 0;
  rop: number = 0;
  depth: number = 0;
  // VARIABLES TO STORE THE VALUES ONLY
  torqueValue: number = 0;
  pressureValue: number = 0;
  flowValue: number = 0;
  ropValue: number = 0;

  // MOCK TECHLIMIT VALUES
  torqueTL: number = 0;
  pressureTL: number = 0;
  flowTL: number = 0;
  ropTL: number = 0;
  // TECHLIMIT MARK POSITIONS
  torqueTLPosition: string = '0px';
  pressureTLPosition: string = '0px';
  flowTLPosition: string = '0px';
  ropTLPosition: string = '0px';
  // TECHLIMIT OFFSETS
  torqueTLOffset: number = 0;
  pressureTLOffset: number = 0;
  flowTLOffset: number = 0;
  ropTLOffset: number = 0;

  // ADJUSTMENT OFFSETS
  torqueAdjOffset: number = 0;
  pressureAdjOffset: number = 0;
  flowAdjOffset: number = 0;
  ropAdjOffset: number = 0;

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
      setInterval(() => {
        this.currentRowCount++;
        if (!this.isPaused) {
          if (this.currentRowCount < this.data.length) {
            this.currentRow = this.data[this.currentRowCount];
            // Update the variables
            this.depth = eval(this.currentRow[HOLE_DEPTH_INDEX]);
            this.torqueValue = eval(this.currentRow[TORQUE_INDEX]);
            this.pressureValue = eval(this.currentRow[STANDPIPE_INDEX]);
            this.flowValue = eval(this.currentRow[FLOW_INDEX]);
            this.ropValue = eval(this.currentRow[ROP_INDEX]);

            // update the mock techlimit
            this.torqueTL = Math.floor(TORQUE_MAXIMUM * 0.8 + TORQUE_MAXIMUM * 0.01 * Math.random());
            this.pressureTL = Math.floor(STANDPIPE_PRESSURE_MAXIMUM * 0.6 + STANDPIPE_PRESSURE_MAXIMUM * 0.1 * Math.random());
            this.flowTL = Math.floor(FLOW_MAXIMUM * 0.95 + FLOW_MAXIMUM * 0.04 * Math.random());
            this.ropTL = Math.floor(ROP_MAXIMUM * 0.7 + ROP_MAXIMUM * 0.2 * Math.random());
            this.updateTechLimitMark();
            this.updateOutputsDisplay();
          }
        }
      }, REFRESH_RATE)
    })
  }

  updateTechLimitMark() {
    let temporary: number;

    temporary = this.torqueTL / TORQUE_MAXIMUM * 100;
    this.torqueTLPosition = temporary + '%';

    temporary = this.pressureTL / STANDPIPE_PRESSURE_MAXIMUM * 100;
    this.pressureTLPosition = temporary + '%';

    temporary = this.flowTL / FLOW_MAXIMUM * 100;
    this.flowTLPosition = temporary + '%';

    temporary = this.ropTL / ROP_MAXIMUM * 100;
    this.ropTLPosition = temporary + '%';
  }

  updateOutputsDisplay() {
    this.torque = (this.torqueValue + this.torqueAdjOffset) / TORQUE_MAXIMUM * 100;
    this.pressure = (this.pressureValue + this.pressureAdjOffset) / STANDPIPE_PRESSURE_MAXIMUM * 100;
    this.flow = (this.flowValue + this.flowAdjOffset) / FLOW_MAXIMUM * 100;
    this.rop = (this.ropValue + this.ropAdjOffset) / ROP_MAXIMUM * 100;
    this.updateOutputWidths();
  }
  updateOutputWidths() {
    this.torqueWidth = this.torque + '%';
    this.pressureWidth = this.pressure + '%';
    this.flowWidth = this.flow + '%';
    this.ropWidth = Math.floor(this.rop) + '%';
  }

  start() {
    this.isPaused = false;
  }
  stop() {
    this.isPaused = true;
  }

}

// // set the dimensions and margins of the graph
// var margin = {top: 20, right: 20, bottom: 30, left: 50},
//     width = 960 - margin.left - margin.right,
//     height = 500 - margin.top - margin.bottom;

// // parse the date / time
// var parseTime = d3.timeParse("%d-%b-%y");

// // set the ranges
// var x = d3.scaleTime().range([0, width]);
// var y = d3.scaleLinear().range([height, 0]);

// // define the line
// var valueline = d3.line()
//     .x(function(d) { return x(d.date); })
//     .y(function(d) { return y(d.close); });

// // append the svg obgect to the body of the page
// // appends a 'group' element to 'svg'
// // moves the 'group' element to the top left margin
// var svg = d3.select("body").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform",
//           "translate(" + margin.left + "," + margin.top + ")");

// // Get the data
// d3.csv("data.csv", function(error, data) {
//   if (error) throw error;

//   // format the data
//   data.forEach(function(d) {
//       d.date = parseTime(d.date);
//       d.close = +d.close;
//   });

//   // Scale the range of the data
//   x.domain(d3.extent(data, function(d) { return d.date; }));
//   y.domain([0, d3.max(data, function(d) { return d.close; })]);

//   // Add the valueline path.
//   svg.append("path")
//       .data([data])
//       .attr("class", "line")
//       .attr("d", valueline);

//   // Add the X Axis
//   svg.append("g")
//       .attr("transform", "translate(0," + height + ")")
//       .call(d3.axisBottom(x));

//   // Add the Y Axis
//   svg.append("g")
//       .call(d3.axisLeft(y));

// });


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
//       return d[0];
//     })
//     .y(function (d) {
//       // verbose logging to show what's actually being done
//       //console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + " using our yScale.");
//       // return the Y coordinate where we want to plot this datapoint
//       return d[1];
//     }).curve(d3.curveCatmullRom.alpha(0.5));

//   // display the line by appending an svg:path element with the data line we created above
//   // graph.append("svg:path").attr("d",data);
//   // or it can be done like this
//   graph.selectAll("path").data([data]).enter().append("svg:path").attr("d", line);


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