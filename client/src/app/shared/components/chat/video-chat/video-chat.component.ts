import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router'
import { Compiler } from '@angular/core';
import * as $ from 'jquery';

import { config } from '../../../config/config'
import { SocketService } from '../../../services/chatservices/socket.service'
import { ChatHomeComponent } from '../chat-home/chat-home.component'
import { videoChat } from '../../../config/videoConfig';

@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrls: ['./video-chat.component.css']
})

export class VideoChatComponent implements OnInit {

  @ViewChild('myvideo') myVideo: any; // id for video tag
  @Input() userPeerId;
  @Input() callUserName;
  @Input() selectedUserName;
  
  peer;
  anotherid;
  mypeerid;
  config = videoChat;
  
  constructor(private router: Router, private chatHome: ChatHomeComponent, private compiler: Compiler, private socketService: SocketService) {}

  ngOnInit() {

    let video = this.myVideo.nativeElement; //video tag native element
    this.peer = new Peer({ host: config.peerserver.host, port: config.peerserver.port, path: config.peerserver.path }); //peer server connection
    setTimeout(() => {
      this.mypeerid = this.peer.id;
      let selectedUserId = this.chatHome.sendSelectedUserId();
      this.socketService.sendPeerIdVideo(this.peer.id, selectedUserId);

    }, 3000);

    //on peer server
    this.peer.on('connection', function(conn) {
      conn.on('data', function(data) {
        console.log(data);
      });
    });

    let n =<any>  navigator;
    n.getUserMedia = (n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia);
    //answer the video call
    this.peer.on('call', function(call) {
      n.getUserMedia({ video: true, audio: true }, function(stream) {
        call.answer(stream);
        call.on('stream', function(remoteStream) {
          video.src = URL.createObjectURL(remoteStream);
          video.play();
        })
      }, function(err) {})
    })
  }

  videoBoxToggle() {
    $('.videobox').toggleClass('videobox--tray');
  }

  hideVideoChatBox() {
    $('.videobox').hide();
    this.videoDisconnect();
  }


  //establish the peer connection
  connect() {
    let conn = this.peer.connect(this.userPeerId);
    conn.on('open', function() {
      conn.send('Message from that id');
    });
  }
  // video call connect
  videoConnect() {
    let video = this.myVideo.nativeElement;
    let localvar = this.peer;
    let fname = this.userPeerId;

    let n =<any>  navigator;
    n.getUserMedia = (n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia);

    n.getUserMedia({ video: true, audio: true }, function(stream) {
      let call = localvar.call(fname, stream);
      call.on('stream', function(remoteStream) {
        video.src = URL.createObjectURL(remoteStream);
        video.play();
      })
    }, function(err) {})
  }

  // video call disconnect
  videoDisconnect() {
    let conn = this.peer.destroy(this.userPeerId);
    this.compiler.clearCache();
    this.hideVideoChatBox();
    this.router.navigate(["/main"]);
  }
 }
