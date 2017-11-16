import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { config } from '../config/config';

/*import {SocketService} from './chatservices/socket.service'*/

@Injectable()
export class ProfileService {
  config = config;

  constructor(private http: Http /*,private socketService:SocketServi,private socketService:SocketServicece*/ ) {}

  // service method to get data of user using userid
  getDataFromDB(userId) {
    //url to get details from db
    const api = config.connect.apiURL + "/api/users/" + userId
    return this.http
      .get(api)
      .map(res => res.json(), error => error.json());
  }

  // service method to upload image
  uploadFile(userId, formData, options) {
    // url to upload profile picture
    const api = config.connect.apiURL + "/api/users/image/" + userId
    return this.http.put(api, formData, options)
      .map(res => res.json(), error => error.json());

  }

  //method store token into database
  storeAccessToken(userId, token) {
    const api = config.connect.apiURL + "/api/users/token/" + userId
    return this.http.put(api, token)
      .map(res => res.json(), error => error.json());
  }

  updatePersonalInfo(userId,personalInfo){
   const api = config.connect.apiURL+"/api/users/profileInfo/"+userId
   return this.http.put(api,personalInfo)
   .map(res=>res.json(),error=>error.json())
 }
}
