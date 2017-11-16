import { async, ComponentFixture, TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { ChatHomeComponent as chathome } from './chat-home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule, RouterLinkWithHref } from '@angular/router';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule, Http, XHRBackend, ResponseOptions } from '@angular/http';
import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';
import 'rxjs/add/observable/of';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from './../../../services/authentication.service';
import { ProfileService } from './../../../services/profile.service';
import { chatConfig } from '../../../config/chatConfig';
import { SocketService } from './../../../services/chatservices/socket.service';
import { HttpService as httpservice } from './../../../services/chatservices/http.service';
import { ChatService as chatservice } from './../../../services/chatservices/chat.service';
import { SpeechRecognitionService as speechrecognitionservice } from './../../../services/speech-recognition.service';

describe('testing chat home component', () => {
  let component: chathome;
  let fixture: ComponentFixture < chathome > ;
  let de: DebugElement;
  let el: HTMLElement;
  let debug: DebugElement;
  let ele: HTMLElement; 
  let config = chatConfig;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpModule, FormsModule, ReactiveFormsModule, MatButtonModule, RouterModule],
      declarations: [chathome],
      //declaring component to be tested
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: SocketService },
        { provide: httpservice },
        { provide: chatservice },
        { provide: AuthenticationService },
        { provide: ProfileService },
        { provide: BsModalService },
        { provide: chathome },
        { provide: XHRBackend, useClass: MockBackend },
        { provide : ToastrService},
        { provide : speechrecognitionservice }
      ]
    }).compileComponents();
  }))
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [chathome]
    }).compileComponents();
    fixture = TestBed.createComponent(chathome);
    component = fixture.componentInstance;
  })
  /*Positive Testcase to check whether aligmnessage return userid*/
  it('alignMessage method should return userId.',
    inject([chathome, XHRBackend], (chathome, mockBackend) => {
      const mockResponse = { userId: '1233' };
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      component.alignMessage("1233")
      expect(mockResponse.userId).toEqual('1233');
    }));
  /*Negative Testcase to check whether aligmnessage return userid*/
  it('alignMessage method should not return userId if null.',
    inject([chathome, XHRBackend], (chathome, mockBackend) => {
      const mockResponse = { userId: ' ' };
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      component.alignMessage(" ")
      expect(mockResponse.userId).toEqual(' ');
    }));
  /*Positive Testcase to check whether isuserselected returns userId*/
  it('isUserSelected method should return userId.',
    inject([chathome, XHRBackend], (chathome, mockBackend) => {
      const mockResponse = { userId: '1233' };
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      component.isUserSelected("1233")
      expect(mockResponse.userId).toEqual('1233');
    }));
  /*Negative Testcase to check whether isuserselected returns userId*/
  it('isUserSelected method should not return userId if null.',
    inject([chathome, XHRBackend], (chathome, mockBackend) => {
      const mockResponse = { userId: ' ' };
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      component.isUserSelected(" ")
      expect(mockResponse.userId).toEqual(' ');
    }));
  /*Positive Testcase for component creation*/
  it('should be created', () => {
    expect(component).toBeDefined();
  });
  /*Negative Testcase for component creation*/
  it('should not be created', () => {
    expect(component).not.toBeFalsy();
  });
})
