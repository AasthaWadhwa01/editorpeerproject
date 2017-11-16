import { async, inject, TestBed } from '@angular/core/testing';
import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SocketService as socketservice } from './socket.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

describe('socketService ,(mockBackend)', () => {

  /*Initial configuration that will run before every testcase*/
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        socketservice, HttpModule,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  /*Positive Testcase to check whether service is injected or not*/
  it('can instantiate service when inject service',
    inject([socketservice], (service: socketservice) => {
      expect(service instanceof socketservice).toBe(true);
    }));

  /*Negative Testcase to check whether service is injected or not*/
  it('can instantiate service when inject service',
    inject([socketservice], (service: socketservice) => {
      expect(service instanceof socketservice).not.toBe(false);
    }));

  /*Testcase to check whether mockdata is used instead of real database */
  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
    }));

  /*Positive Testcase to check whether instance of service is created or not*/
  it('can instantiate service with "new"', inject([Http], () => {
    //expect().not.toBeNull('http should be provided');
    let service = new socketservice();
    expect(service instanceof socketservice).toBe(true, 'new service should be ok');
  }));

  /*Negative Testcase to check whether instance of service is created or not*/
  it('cannot instantiate service with "new"', inject([Http], () => {
    //expect().not.toBeNull('http should be provided');
    let service = new socketservice();
    expect(service instanceof socketservice).not.toBe(false, 'new service should be ok');
  }));

})
