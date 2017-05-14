import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
  
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

// declare function require(name: string);
// let csv = require('fast-csv');
// declare var fs;
// console.log(fs);

import { PasonRow } from './classes/pasonRow';
import { Deferred } from './classes/deferred';

/**
  * SERVER DEVELOPMENT LINKS
  */
const DEVELOPMENT_SERVER: string = 'http://localhost:8080';
const PRODUCTION_SERVER: string = 'https://application-server-dot-drillr-optimizer.appspot.com';
const SERVER: string = PRODUCTION_SERVER;

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  /**
   * Get the data for the optimization scenario
   */
  getScenarioData(): Promise<PasonRow[]> {
    let deferredPromise = new Deferred<PasonRow[]>();
    
    this.http.request('./assets/data/mockdata_json.json').map(res => {
      deferredPromise.resolve(res.json())
    }).subscribe();

    // csv.fromPath('assets/data/mockdata_prod_large_active.csv').on(
    //   'data', (data) => {
    //     allData.push(data);
    //   }
    // ).on("end", () => {
    //   deferredPromise.resolve(allData);
    // })

    // let options: RequestOptions;
    // this.setupHeaderOptions(options);

    // return this.http.get(
    //   SERVER + '/data',
    //   options
    // ).map(response => {
    //   return response.json();
    // })

    return deferredPromise.promise;
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
