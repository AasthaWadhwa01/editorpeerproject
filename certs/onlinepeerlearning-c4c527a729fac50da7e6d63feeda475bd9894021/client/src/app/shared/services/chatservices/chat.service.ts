import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class ChatService {

  constructor(private httpService: HttpService) {}

  //method to get the messages between two users
  public getMessages(params, callback): any {
    this.httpService.getMessages(params).subscribe(
      response => {
        callback(false, response);
      },
      error => {
        callback(true, 'HTTP fail.');
      }
    );
  }

  //Method to check the session of user.
  public checkUserSession(userId, callback): any {
    this.httpService.checkUserSession({ userId: userId }).subscribe(
      response => {
        callback(false, response);
      },
      error => {
        callback(true, 'HTTP fail.');
      }
    );
  }

}
