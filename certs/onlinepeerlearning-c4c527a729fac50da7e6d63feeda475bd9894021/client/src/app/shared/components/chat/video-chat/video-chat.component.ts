import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { Compiler } from '@angular/core';
import * as $ from 'jquery';

import { config } from '../../../config/config'

@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrls: ['./video-chat.component.css']
})

export class VideoChatComponent implements OnInit {

  @ViewChild('myvideo') myVideo: any; // id for video tag
  peer;
  anotherid;
  mypeerid;
  flag:boolean=false;

  constructor(private router: Router, private compiler: Compiler) {}

  ngOnInit() {

    let video = this.myVideo.nativeElement; //video tag native element
    this.peer = new Peer({ host: config.peerserver.host, port: config.peerserver.port, path: config.peerserver.path }); //peer server connection
    setTimeout(() => {
      this.mypeerid = this.peer.id;
    }, 3000);

    //on peer server
    this.peer.on('connection', function(conn) {
      conn.on('data', function(data) {
        console.log(data);
      });
    });

    let n = < any > navigator;
    n.getUserMedia = (n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia);
    //answer the video call
    this.peer.on('call', function(call) {
      n.getUserMedia({ video: true, audio: true }, function(stream) {
        call.answer(stream);
        call.on('stream', function(remotestream) {
          video.src = URL.createObjectURL(remotestream);
          video.play();
        })
      }, function(err) {})
    })
  }

  videoboxtoggle(){
    $('.videobox').toggleClass('videobox--tray');
  }
  hidevideochatbox(){
    $('.videobox').hide();
    this.videoDisconnect();
  }
 

  //establish the peer connection
  connect() {
    let conn = this.peer.connect(this.anotherid);
    conn.on('open', function() {
      conn.send('Message from that id');
    });
  }
  // video call connect
  videoConnect() {
    let video = this.myVideo.nativeElement;
    let localvar = this.peer;
    let fname = this.anotherid;

    let n = < any > navigator;
    n.getUserMedia = (n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia);

    n.getUserMedia({ video: true, audio: true }, function(stream) {
      let call = localvar.call(fname, stream);
      call.on('stream', function(remotestream) {
        video.src = URL.createObjectURL(remotestream);
        video.play();
      })
    }, function(err) {})
  }

  // video call disconnect
  videoDisconnect() {
    let conn = this.peer.destroy(this.anotherid);
    this.compiler.clearCache();
    this.hidevideochatbox();
    this.router.navigate(["/main"]);
    conn.on('close', function() {
      conn.send('End Call');
    });
  }
  // video call mute
   videoMute() {
    let video = this.myVideo.nativeElement;
    let localvar = this.peer;
    let fname = this.anotherid;
    let n = < any > navigator;

    n.getUserMedia = (n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia);
    n.getUserMedia({ video: true, audio: true }, function(stream) {
      let call = localvar.call(fname, stream);
      call.on('stream', function(remotestream) {
        video.src = URL.createObjectURL(remotestream);
      video.pause();
      })
    }, function(err) {})
  }

    videoUnmute() {
    let video = this.myVideo.nativeElement;
    let localvar = this.peer;
    let fname = this.anotherid;
    let n = < any > navigator;

    n.getUserMedia = (n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia);
    n.getUserMedia({ video: true , audio: true }, function(stream) {
      let call = localvar.call(fname, stream);
      call.on('stream', function(remotestream) {
        video.src = URL.createObjectURL(remotestream);
      video.play();
      })
    }, function(err) {})
  }
video(){
  if(this.flag==true){
    this.videoMute();
    this.flag=false;

  }
  else if(this.flag==false){
    this.videoUnmute();
     this.flag=true;
  }
  }
}
