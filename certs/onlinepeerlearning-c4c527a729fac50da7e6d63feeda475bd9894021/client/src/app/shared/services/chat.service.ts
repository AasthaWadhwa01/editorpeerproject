import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { config } from '../config/config';
import * as io from 'socket.io-client';
@Injectable()
export class ChatService {
  private socket;
  config = config
  
  sendMessage(message){
/*    this.socket.emit('add-message', message);*/    
  }
  getMessages() {
    /*let observable = new Observable(observer => {
      this.socket = io(this.config.connect.url+this.config.connect.port);
      this.socket.on('message', (data) => {
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;*/
  } 
   getOnlineUsers() {
    /*let observable = new Observable(observer => {
      this.socket = io(this.config.connect.url+this.config.connect.port);
      this.socket.on('users', (data) => {
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;*/
  } 
   
}  