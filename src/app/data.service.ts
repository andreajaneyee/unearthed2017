import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
  
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { PasonRow } from './classes/pasonRow';

/**
  * SERVER DEVELOPMENT LINKS
  */
const DEVELOPMENT_SERVER: string = 'http://localhost:8080';
const PRODUCTION_SERVER: string = 'https://application-server-dot-source-stash.appspot.com';
const SERVER: string = DEVELOPMENT_SERVER;


@Injectable()
export class DataService {

  constructor(private http: Http) { }

  /**
   * Get the data for the optimization scenario
   */
  getScenarioData(): Observable<PasonRow[]> {
    let options: RequestOptions;
    this.setupHeaderOptions(options);

    return this.http.get(
      SERVER + '/data',
      options
    ).map(response => {
      // let label: string[];
      // let data: PasonRow[];
      // let finalPasonData = [];

      // let reponse: any[] = response.json();
      // label = response[0];
      return response.json();
      // data = response.slice(1);
      


      // for (let i = 0; i < data.length; i++) {
      //   finalPasonData.push(new PasonRow(
      //     data[0], 
      //     data[1],
      //     data[2],
      //     data[3],
      //     data[4],
      //     data[5],
      //     data[6],
      //     data[7]
      //   ))
      // }
    })
  }

  /**
   * HELPER METHODS
   */
  setupHeaderOptions(options: RequestOptions) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    options = new RequestOptions({ headers: headers });
  }
}
