import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { config } from '../../config/config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService {

  config = config;

  /* 
   * Setting the Request headers.
   */
  private headerOptions = new RequestOptions({
    headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' })
  });

  constructor(private http: Http) {}
  
  //Method for checking if username exists 
  public checkUserSession(params) {
    return this.http.post(this.config.connect.apiURL + '/api/chat/checkUserSession', JSON.stringify(params), this.headerOptions)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || `Server error`));
  }

  //Method for getting chat messages
  public getMessages(params) {
    return this.http.post(this.config.connect.apiURL + '/api/chat/getMessages', JSON.stringify(params), this.headerOptions)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || `Server error`));
  }
}
