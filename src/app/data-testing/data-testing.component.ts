import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { PasonRow } from '../classes/pasonRow';

@Component({
  selector: 'app-data-testing',
  templateUrl: './data-testing.component.html',
  styleUrls: ['./data-testing.component.css']
})
export class DataTestingComponent implements OnInit {
  data: PasonRow[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getScenarioData().subscribe(data => {
      this.data = data;
      console.log(data);
    })
  }

}
