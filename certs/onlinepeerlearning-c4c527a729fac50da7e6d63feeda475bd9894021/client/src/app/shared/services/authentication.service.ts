import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { config } from './../config/config';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestOptions, Request, RequestMethod, Headers } from '@angular/http';

@Injectable()
export class AuthenticationService {
  // config = config;
  constructor(private http: Http, private router: Router) {}

user:any

  git() {
    return this.http

      .get(config.connect.apiURL +'/api/login/auth/github')

      .map(res => res, error => error.json());
  }

  setUserInfo(obj) {
     this.user=obj;

   
     localStorage.setItem('currentUser', JSON.stringify({ token: this.user.token, userId: this.user.userId,userName:this.user.userName }));
    if (this.user.token) {
      this.router.navigate(["/main"]);

    } else if (!this.user.token) {
      this.router.navigate(["/"])

    }
  }

  getToken(): any {
    let userDetails = JSON.parse(localStorage.getItem('currentUser'));
    let token=userDetails.token;
console.log('token',token)
    return token;
  }

 getUserId(): any {
    return JSON.parse(localStorage.getItem('currentUser'))['userId'];
  }
  logoutEditor(user) {
   
     localStorage.removeItem('currentUser');
     return this.http
      .put(config.connect.apiURL +'/logout',user)
      .map(res => res.json(), error => error.json());
   

    
  }

  private authoriZation() {
    let token = this.getToken()
    if (token) {
      let headers = new Headers({ 'Authorization': token });
      return new RequestOptions({ headers: headers });
    }
  }

  getUser(userId){
 return this.http.get(config.connect.apiURL +'/api/login/'+userId)
      .map(res => res.json(), error => error.json());
   
  }
}
