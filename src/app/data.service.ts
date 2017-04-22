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
      return response.json();
    });
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
