import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptions, Request, RequestMethod, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
//custom files imports
import { AuthenticationService } from './authentication.service';
import { forumConfig } from './../config/forum.config'
import { config } from './../config/config'

@Injectable()
export class ForumService {
  constructor(private http: Http, private autheticationservice: AuthenticationService) {}
  config = config;

//method is used to hit api on express server and post the data of form in database   
  ngOnInit() {

  }   

  //method to save post in database
  savePost(data: any) {
    return this.http.
    post(config.connect.apiURL + config.forumConnect.APIURL, data)
      .map(res => res.json());
  }
  //method to get posts from database
  getPost() {
    return this.http
      .get(config.connect.apiURL + config.forumConnect.APIURL)
      .map(res => res.json());
  }
  //method to serach 
  searchEntries(searchTerm: any) {
      var api = config.connect.apiURL + config.forumConnect.SEARCHAPIURL + searchTerm
      return this.http
        .get(api)
        .map(res => res.json());
  }
  /*getEmployeeByID method to fetch details by id used in supervisor component*/
  getPostById(id: string) {
    return this.http.
    get(config.connect.apiURL + config.forumConnect.APIURL + id)
      .map(res => res.json());
  }
  //method to save answer
  saveAnswer(id, answer) {
    return this.http.
    put(config.connect.apiURL + config.forumConnect.APIURL + id, answer)
      .map(res => res.json());

  }

   //method to update like
  updateLike(id, userName) {
    return this.http.
    put(config.connect.apiURL + config.forumConnect.LIKEURL+ id,userName)
      .map(res => res.json());
  }

  //method to update dislike
    updateDislike(id, userName) {
    return this.http.
    put(config.connect.apiURL + config.forumConnect.DISLIKEURL+ id,userName)
      .map(res => res.json());
  }



  //method to give access to authorise user
  private authoriZation() {
    let token = this.autheticationservice.getToken();
    if (token) {
      let headers = new Headers({ 'Authorization': token });
      return new RequestOptions({ headers: headers });
    }
  }
}
