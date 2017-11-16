import { async, ComponentFixture, TestBed,inject} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule, Http, XHRBackend, ResponseOptions } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {MockBackend,MockConnection} from '@angular/http/testing';
import 'rxjs/add/observable/of';
import { config } from '../../../config/config';
import { SocketService } from '../../../services/chatservices/socket.service'
import { VideoChatComponent } from '../video-chat/video-chat.component';
import { ChatHomeComponent as chathome } from '../chat-home/chat-home.component';
import { videoChat } from '../../../config/videoConfig';

describe('testing videoChat component', () => {
  let component: VideoChatComponent;
  let fixture: ComponentFixture < VideoChatComponent >;
  let config = videoChat;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpModule, FormsModule, ReactiveFormsModule,RouterModule],
      declarations: [VideoChatComponent],
      //declaring component to be tested
      schemas: [NO_ERRORS_SCHEMA],
      providers: [SocketService,
      { provide: chathome },
      ]
    }).compileComponents();
  }))
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoChatComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(VideoChatComponent);
    component = fixture.componentInstance;
  })
/*Positive Testcase for component creation*/
   it('should be created', () => {
    expect(component).toBeDefined();
  });
/*Negative Testcase for component creation*/
   it('should not be created', () => {
    expect(component).not.toBeFalsy();
  });
})