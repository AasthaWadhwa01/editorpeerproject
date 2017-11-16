  import { Component, OnInit, ViewChild,Compiler } from '@angular/core';
  import { Router } from '@angular/router'
  import { config } from '../../../config/config';
  import * as $ from 'jquery';

 @Component({
    selector: 'app-audio-chat',
    templateUrl: './audio-chat.component.html',
    styleUrls: ['./audio-chat.component.css']
  })

  export class AudioChatComponent implements OnInit {

    @ViewChild('myaudio') myAudio: any; // id for audio tag
    peer;
    anotherid;
    mypeerid;
    flag: boolean = false;

    constructor(private router: Router,private compiler :Compiler) {}

    ngOnInit() {
      let audio = this.myAudio.nativeElement; //audio tag native element
      this.peer = new Peer({ host: config.peerserver.host, port: config.peerserver.port, path: config.peerserver.path }); //peer server connection
      setTimeout(() => {
        this.mypeerid = this.peer.id;
      }, 3000);

      //on peer connection 
      this.peer.on('connection', function(conn) {
        conn.on('data', function(data) {});
      });

      //navigate user media devices 
      let n = < any > navigator;
      n.getUserMedia = (n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia);

      //answer the call
      this.peer.on('call', function(call) {
        n.getUserMedia({ video: false, audio: true }, function(stream) {
          call.answer(stream);
          call.on('stream', function(remotestream) {
            audio.src = URL.createObjectURL(remotestream);
            audio.play();
          })
        }, function(err) {})
      })
    }
audioboxtoggle(){
    $('.audiobox').toggleClass('audiobox--tray');
  }
  hideaudiochatbox(){
    $('.audiobox').hide();
    this.audioDisconnect();
  }
    //establish the peer connection
    connect() {
      let conn = this.peer.connect(this.anotherid);
      conn.on('open', function() {
        conn.send('Message from that id');
      });
    }

    //audio call connect
    audioConnect() {
      let audio = this.myAudio.nativeElement;
      let localvar = this.peer;
      let fname = this.anotherid;

      let n = < any > navigator;

      n.getUserMedia = (n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia);

      n.getUserMedia({ video: false, audio: true }, function(stream) {
        let call = localvar.call(fname, stream);
        call.on('stream', function(remotestream) {
          audio.src = URL.createObjectURL(remotestream);
          audio.play();
        })
      }, function(err) {})
    }

    //audio call disconnect
   audioDisconnect() {
    let conn = this.peer.destroy(this.anotherid);
    this.compiler.clearCache();
    this.router.navigate(["/main"]);
    conn.on('close', function() {
      conn.send('End Call');
    });
  }

   audioMute() {
    let audio = this.myAudio.nativeElement;
    let localvar = this.peer;
    let fname = this.anotherid;
    let n = < any > navigator;

    n.getUserMedia = (n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia);
    n.getUserMedia({ video: false, audio: true,type:'remote' }, function(stream) {
      let call = localvar.call(fname, stream);
      call.on('stream', function(remotestream) {
        audio.src = URL.createObjectURL(remotestream);
      audio.pause();
      })
    }, function(err) {})
  }

    audioUnmute() {
    let audio = this.myAudio.nativeElement;
    let localvar = this.peer;
    let fname = this.anotherid;
    let n = < any > navigator;

    n.getUserMedia = (n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia);
    n.getUserMedia({ video: false, audio: true,type:'remote' }, function(stream) {
      let call = localvar.call(fname, stream);
      call.on('stream', function(remotestream) {
        audio.src = URL.createObjectURL(remotestream);
      audio.play();
      })
    }, function(err) {})
  }
audio(){
  if(this.flag==true){
    this.audioMute();
    this.flag=false;

  }
  else if(this.flag==false){
    this.audioUnmute();
     this.flag=true;
  }
  }
}
