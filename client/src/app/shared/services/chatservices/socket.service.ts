import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { config } from '../../config/config';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {

  config = config;
  private socket;
  userName : string;

  constructor() {}

  //Method to connect the users to socket
  connectSocket(userId: string) {
    this.socket = io.connect(this.config.connect.apiURL, { query: `userId=${userId}` });
  }

  //Method to emit the add-messages event.
  sendMessage(message: any): void {
    this.socket.emit('add-message', message);
  }

  //Method to receive add-message-response event.
  receiveMessages(): any {
    let observable = new Observable(observer => {
      this.socket.on('add-message-response', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  //Method to receive chat-list-response event.
  getChatList(userId: string): any {
    this.socket.emit('chat-list', { userId: userId });
    let observable = new Observable(observer => {
      this.socket.on('chat-list-response', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

  sendFile(fileObj) {
    this.socket.emit('send-file', fileObj)
  }

  sendPeerId(mypeerid, selectedUserId) {
    this.userName = JSON.parse(localStorage.getItem('currentUser'))['userName'];
    this.socket.emit('send-peer-id', mypeerid, selectedUserId,this.userName)
  }

  getPeerId() {
    let observable = new Observable(observer => {
      this.socket.on('peer-id-response', (data) => {
      observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

   sendPeerIdVideo(mypeerid, selectedUserId) {
    this.userName = JSON.parse(localStorage.getItem('currentUser'))['userName'];
    this.socket.emit('send-peer-id-video', mypeerid, selectedUserId,this.userName)
  }

  getPeerIdForVideo() {
    let observable = new Observable(observer => {
      this.socket.on('peer-id-response-video', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

}

