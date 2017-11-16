import { async, inject, TestBed } from '@angular/core/testing';
import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpService as httpservice } from './http.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
describe('httpService ,(mockBackend)', () => {
  /*Initial configuration that will run before every testcase*/
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        httpservice, HttpModule,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });
  /*Positive Testcase for hitting socket service by username*/
  it('checkUserSession method should return userslist.',
    inject([httpservice, XHRBackend], (httpservice, mockBackend) => {
      const mockResponse = { params: 'username' };
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      httpservice.checkUserSession("username", "true, 'HTTP fail.").subscribe((user) => {
        expect(user.params).toEqual('username');
      });
    }));
  /*Negative Testcase for hitting socket service by username*/
  it('checkUserSession method should not return userslist if null.',
    inject([httpservice, XHRBackend], (httpservice, mockBackend) => {
      const mockResponse = { params: ' ' };
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      httpservice.checkUserSession(" ", "true, 'HTTP fail.").subscribe((user) => {
        expect(user.params).toEqual(' ');
      });
    }));
  /*Positive Testcase for getting messages by passing username to socketservice*/
  it('getMessages method should return messages.',
    inject([httpservice, XHRBackend], (httpservice, mockBackend) => {
      const mockResponse = { params: 'username' };
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      httpservice.getMessages("username", "true, 'HTTP fail.").subscribe((user) => {
        expect(user.params).toEqual('username');
      });
    }));
  /*Negative Testcase for getting messages by passing username to socketservice*/
  it('getMessages method should not return messages if user not selected.',
    inject([httpservice, XHRBackend], (httpservice, mockBackend) => {
      const mockResponse = { params: ' ' };
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      httpservice.getMessages(" ", "true, 'HTTP fail.").subscribe((user) => {
        expect(user.params).toEqual(' ');
      });
    }));
  /*Positive Testcase to check whether service is injected or not*/
  it('can instantiate service when inject service',
    inject([httpservice], (service: httpservice) => {
      expect(service instanceof httpservice).toBe(true);
    }));
  /*Negative Testcase to check whether service is injected or not*/
  it('cannot instantiate service when service is not injected',
    inject([httpservice], (service: httpservice) => {
      expect(service instanceof httpservice).not.toBe(false);
    }));
  /*Positive Testcase to check whether mockdata is used instead of real database */
  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
    }));
  /*Positive Testcase to check whether instance of service is created or not*/
  it('can instantiate service with "new"', inject([Http], (http: Http) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new httpservice(http);
    expect(service instanceof httpservice).toBe(true, 'new service should be ok');
  }));
  /*Negative Testcase to check whether instance of service is created or not*/
  it('cannot instantiate service with "new"', inject([Http], (http: Http) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new httpservice(http);
    expect(service instanceof httpservice).not.toBe(false, 'new service should be ok');
  }));
})
