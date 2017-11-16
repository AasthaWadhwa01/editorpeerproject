import { Component, OnInit, ViewChild, Compiler, Input } from '@angular/core';
import { Router } from '@angular/router'
import * as $ from 'jquery';

import { config } from '../../../config/config';
import { SocketService } from '../../../services/chatservices/socket.service'
import { ChatHomeComponent } from '../chat-home/chat-home.component'

import { audioChat } from '../../../config/audioConfig';

@Component({
  selector: 'app-audio-chat',
  templateUrl: './audio-chat.component.html',
  styleUrls: ['./audio-chat.component.css']
})

export class AudioChatComponent implements OnInit {

  @ViewChild('myaudio') myAudio: any; // id for audio tag
  @Input() userPeerId;
  @Input() callUserName;
  @Input() selectedUserName;
  
  peer;
  anotherid;
  mypeerid;
  config = audioChat;
  
  constructor(private router: Router, private compiler: Compiler, private socketService: SocketService, private chatHome: ChatHomeComponent) {}

  ngOnInit() {
    let audio = this.myAudio.nativeElement; //audio tag native element
    this.peer = new Peer({ host: config.peerserver.host, port: config.peerserver.port, path: config.peerserver.path }); //peer server connection
    setTimeout(() => {
      this.mypeerid = this.peer.id;
      let selectedUserId = this.chatHome.sendSelectedUserId();
      this.socketService.sendPeerId(this.peer.id, selectedUserId);
    }, 3000);

    //on peer connection 
    this.peer.on('connection', function(conn) {
      conn.on('data', function(data) {});
    });

    //navigate user media devices 
    let n =<any>  navigator;
    n.getUserMedia = (n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia);

    //answer the call
    this.peer.on('call', function(call) {
      n.getUserMedia({ video: false, audio: true }, function(stream) {
        call.answer(stream);
        call.on('stream', function(remoteStream) {
          audio.src = URL.createObjectURL(remoteStream);
          audio.play();
        })
      }, function(err) {})
    })
  }
  
  audioBoxToggle() {
    $('.audiobox').toggleClass('audiobox--tray');
  }

  hideAudioChatBox() {
    $('.audiobox').hide();
    this.audioDisconnect();
  }

  //establish the peer connection
  connect() {
    let conn = this.peer.connect(this.userPeerId);
    conn.on('open', function() {
      conn.send('Message from that id');
    });
  }

  //audio call connect
  audioConnect() {
    let audio = this.myAudio.nativeElement;
    let localvar = this.peer;
    let fname = this.userPeerId;
    let n =<any>  navigator;
    n.getUserMedia = (n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia);
    n.getUserMedia({ video: false, audio: true }, function(stream) {
      let call = localvar.call(fname, stream);
      call.on('stream', function(remoteStream) {
        audio.src = URL.createObjectURL(remoteStream);
        audio.play();
      })
    }, function(err) {})
  }

  //audio call disconnect
  audioDisconnect() {
    let conn = this.peer.destroy(this.userPeerId);
    this.compiler.clearCache();
    this.hideAudioChatBox();
    this.router.navigate(["/main"]);
  }
}
