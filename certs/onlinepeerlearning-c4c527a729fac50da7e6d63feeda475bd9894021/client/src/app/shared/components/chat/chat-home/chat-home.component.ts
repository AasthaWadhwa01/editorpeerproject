import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import * as $ from 'jquery';
import { AuthenticationService } from './../../../services/authentication.service';
import {chatConfig} from '../../../config/chatConfig';
import { Headers, RequestOptions } from '@angular/http';

/*importing services*/
import { SocketService } from './../../../services/chatservices/socket.service';
import { HttpService } from './../../../services/chatservices/http.service';
import { ChatService } from './../../../services/chatservices/chat.service';
import { ProfileService } from './../../../services/profile.service';

@Component({
  selector: 'app-chat-home',
  templateUrl: './chat-home.component.html',
  styleUrls: ['./chat-home.component.css']
})

export class ChatHomeComponent implements OnInit {

  /*ui related variables starts*/
  public modalRef: BsModalRef;
  overlayDisplay = false;
  selectedUserId = null;
  selectedSocketId = null;
  selectedUserName = null;
  config=chatConfig;
  formData: FormData;
  options: RequestOptions;
  currentUser:any;
  imgPath:string='';
  showVideoBox: any = false;
  showAudioBox: any = false;

  //chat and message related variables starts
  userId = null;
  socketId = null;
  chatListUsers = [];
  message = '';
  messages = [];
  data2: any = [];

  //constructor initialising various services
  constructor(
    private chatService: ChatService,
    private socketService: SocketService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private authenticationService: AuthenticationService,
    private profileService:ProfileService
  ) {}

  /*method loading various functions*/
  ngOnInit() {
    this.currentUser= JSON.parse(localStorage.getItem('currentUser'))
    $('.chatbox').hide();

    // getting userID from the local storage  
    this.userId = this.authenticationService.getUserId();
    if (this.userId === '' || typeof this.userId == 'undefined') {
      this.router.navigate(['/']);
    } else {
      this.chatService.checkUserSession(this.userId, (error, response) => {
        this.overlayDisplay = true;

        // making socket connection by passing UserId.  
        this.socketService.connectSocket(this.userId);

        // calling method of service to get the online users list.  
        this.socketService.getChatList(this.userId).subscribe(response => {
          if (!response.error) {
            if (response.singleUser) {

              // Removing duplicate user from online users list array.
              if (this.chatListUsers.length > 0) {
                this.chatListUsers = this.chatListUsers.filter(function(obj) {
                  return obj._id !== response.chatList._id;
                });
              }
              this.chatListUsers.push(response.chatList);
            } else if (response.userDisconnected) {
              this.chatListUsers = this.chatListUsers.filter(function(obj) {
                return obj.socketId !== response.socketId;
              });
            } else {

              //Updating online userslist if user logs in.
              this.chatListUsers = response.chatList;
            }
          } else {
            alert(`Chat list failure.`);
          }
        });

        //method for recieving messages through socket          
        this.socketService.receiveMessages().subscribe(response => {
          if (this.selectedUserId && this.selectedUserId == response.fromUserId) {
            this.messages.push(response);
            setTimeout(() => {
              document.querySelector(`.message-thread`).scrollTop = document.querySelector(`.message-thread`).scrollHeight;
            }, 100);
          }
        });
        
      });
    }
  }

  //Getting the userid when user is selected
  selectedUser(user): void {

    this.selectedUserId = user.userId;
    this.selectedSocketId = user.socketId;
    this.selectedUserName = user.userName;

    this.chatService.getMessages({ userId: this.userId, toUserId: user.userId }, (error, response) => {
      if (response.status == 200) {
        this.messages = response.data;

      }
    });
    this.openChatBox()
    this.hideChatBox()
  }

  //Method for opening chatbox
  openChatBox(): void {
    //Jquery for handling chatbox opening and closing
    var $chatbox = $('.chatbox'),
      $chatboxTitle = $('.chatbox__title'),
      $chatboxTitleClose = $('.chatbox__title__close'),
      $chatboxTitleTray = $('.chatbox__title__tray'),
      $chatboxCredentials = $('.chatbox__credentials');

    $chatboxTitle.on('click', function() {
      $chatbox.toggleClass('chatbox--tray');

    });
    $chatboxTitleClose.on('click', function(e) {
      $chatbox.hide();

    });
    $chatbox.on('transitionend', function() {
      if ($chatbox.hasClass('chatbox--closed'))
        $chatbox.hide();
    });
    $chatboxCredentials.on('submit', function(e) {
      e.preventDefault();
      $chatbox.removeClass('chatbox--empty');
    });
    $('#myhead').on('click', function() {
      $chatbox.toggleClass('chatbox--tray');
    });
    $chatboxTitleTray.on('click', function() {
      $chatbox.toggleClass('chatbox--tray');
    });
  }

  //Method for closing chatbox
  hideChatBox(): void {
    $('.chatbox').show();
    $('.side').hide();
  }
  
  chatBoxToggle(): void{
  $('.chatbox').toggleClass('chatbox--tray');
  }

  showVideo() {
   this.showVideoBox = !this.showVideoBox;
 }

 showAudio(){
   this.showAudioBox = !this.showAudioBox;
 }

  isUserSelected(userId: string): boolean {
    if (!this.selectedUserId) {
      return false;
    }
    return this.selectedUserId === userId ? true : false;
  }

  //Method for sending the messages
  sendMessage(event) {
    if (event.keyCode === 13) {
      if (this.message === '' || this.message === null) {
        alert(`Message can't be empty.`);
      } else {
        if (this.message === '') {
          alert(`Message can't be empty.`);
        } else if (this.userId === '') {
          this.router.navigate(['/']);
        } else if (this.selectedUserId === '') {
          alert(`Select a user to chat.`);
        } else {
          let data: any = {
            fromUserId: this.userId,
            message: (this.message).trim(),
            toUserId: this.selectedUserId,
            toSocketId: this.selectedSocketId,
            fromSocketId: this.socketId
          }
          this.messages.push(data);
          setTimeout(() => {
            document.querySelector(`.message-thread`).scrollTop = document.querySelector(`.message-thread`).scrollHeight;
          }, 100);
          this.message = null;
          this.socketService.sendMessage(data);
        }
      }
    }
  }

  alignMessage(userId) {
    return this.userId === userId ? false : true;
  }

  removesb(): void {
    $('.side').toggle();
  }

  //Method for audio chat
  audiocall(template1: TemplateRef < any > ) {
    this.modalRef = this.modalService.show(template1);
  }

  //Method for calling video chat
  videocall(template2: TemplateRef < any > ) {
    this.modalRef = this.modalService.show(template2);
  }

  fileChange(event) {
      this.formData= new FormData();
   let fileList: FileList = event.target.files;
   if(fileList.length > 0) {
    let file: File = fileList[0];
    this.formData.append('uploadFile', file, file.name);
    this.formData.append('hsdfh', "gfhas");

    let headers = new Headers();
    headers.append('enctype', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    this.options = new RequestOptions({ headers: headers });
     
   }
}

// method to be called when Upload button is clicked
  uploadFile(){
    this.profileService.uploadFile(this.currentUser.userId,this.formData,this.options)
  .subscribe(
    res=>{
      this.imgPath=res.data.avatarUrl;
    },error=> 'UPLOAD'
    )
  }
}

