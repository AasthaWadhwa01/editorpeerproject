import { async, inject, TestBed } from '@angular/core/testing';
import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';
import * as angular from 'angular';
import { tick, fakeAsync } from '@angular/core/testing';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { AuthenticationService } from './authentication.service';
describe('authenticationService ,(mockBackend)', () => {
  /*Initial configuration that will run before every testcase*/
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, RouterTestingModule],
      providers: [
        AuthenticationService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });
  /*Positive Testcase to check whether instance of service is created or not*/
  it('can instantiate service with "new"', inject([Http, Router], (http: Http, router: Router) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new AuthenticationService(http, router);
    expect(service instanceof AuthenticationService).toBe(true, 'new service should be ok');
  }));
  /*Negative Testcase to check whether instance of service is created or not*/
  it('cannot instantiate service with "new"', inject([Http, Router], (http: Http, router: Router) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new AuthenticationService(http, router);
    expect(service instanceof AuthenticationService).not.toBe(false, 'new service should be ok');
  }));
  /*Positive Testcase to check whether service is injected or not*/
  it('can instantiate service when inject service',
    inject([AuthenticationService], (service: AuthenticationService) => {
      expect(service instanceof AuthenticationService).toBe(true);
    }));
  /*Negative Testcase to check whether service is injected or not*/
  it('cannot instantiate service when service is not injected',
    inject([AuthenticationService], (service: AuthenticationService) => {
      expect(service instanceof AuthenticationService).not.toBe(false);
    }));
  /*Testcase to check whether mockdata is used instead of real database */
  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
    }));
  /*Positive Testcase for getting a user of particular userid*/
  it('should test getUser method',
    inject([AuthenticationService, XHRBackend], (AuthenticationService, mockBackend) => {
      const mockResponse = [{ userId: 123 },
        { userId: 234 }
      ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      AuthenticationService.getUser().subscribe((User) => {
        expect(User[1].userId).toEqual(234);
      });
    }));
  /*Negative Testcase for getting a user of particular userid*/
  it('should test getUser method',
    inject([AuthenticationService, XHRBackend], (AuthenticationService, mockBackend) => {
      const mockResponse = [{ userId: 123 },
        { userId: 234 }
      ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      AuthenticationService.getUser().subscribe((User) => {
        expect(User[1].userId).not.toEqual(123);
      });
    }));
  /*Positive Testcase for getPersonalAccessToken method to get a token*/
  it('should test getPersonalAccessToken method',
    inject([AuthenticationService, XHRBackend], (AuthenticationService, mockBackend) => {
      const mockResponse = [{ token: 123 },
        { token: 234 }
      ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      AuthenticationService.getPersonalAccessToken().subscribe((Accesstoken) => {
        expect(Accesstoken[1].token).toEqual(234);
      });
    }));
  /*Negative Testcase for getPersonalAccessToken method to get a token*/
  it('should test getPersonalAccessToken method',
    inject([AuthenticationService, XHRBackend], (AuthenticationService, mockBackend) => {
      const mockResponse = [{ token: 123 },
        { token: 234 }
      ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      AuthenticationService.getPersonalAccessToken().subscribe((Accesstoken) => {
        expect(Accesstoken[1].token).not.toEqual(123);
      });
    }));
  /*testcase for addPersonalAccessToken method to add a token*/
  it('test addPersonalAccessToken method',
    inject([AuthenticationService, XHRBackend], (AuthenticationService, mockBackend) => {
      const mockResponse = [{ Authorization: 'Basic' }];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      AuthenticationService.addPersonalAccessToken((token) => {
        expect(token[0].Authorization).toEqual('Basic');
      });
    }));
  /*Testcase for logoutEditor on the basis of userId*/
  it('should test logoutEditor method',
    inject([AuthenticationService, XHRBackend], (AuthenticationService, mockBackend) => {
      const mockResponse = [{ userId: '123' },
        { userId: '123456' }
      ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      AuthenticationService.logoutEditor((User) => {
        expect(User[1].userId).toEqual('123456');
      });
    }));
  /*Testcase for setUserInfo method which sets user's information*/
  it('should test setUserInfo method',
    inject([AuthenticationService, XHRBackend], (AuthenticationService, mockBackend) => {
      const mockResponse = [{ userName: 'Abhishek', UserId: 5004, token: 500 },
        { userName: 'Karan', UserId: 6004, token: 600 }
      ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      AuthenticationService.setUserInfo((User) => {
        expect(User[1].userName).toEqual('karan');
        expect(User[1].userId).toEqual(6004);
        expect(User[1].token).toEqual(600);
      });
    }));
  /*Testcase for authorization method*/
  it('should test authoriZation method',
    inject([AuthenticationService, XHRBackend], (AuthenticationService, mockBackend) => {
      const mockResponse = [{ userId: 123 },
        { userId: 234 }
      ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      AuthenticationService.authoriZation((User) => {
        expect(User[1].userId).toEqual(234);
      });
    }));
  /*Testcase for getUserId method to get user userId of a user*/
  it('should test getUserId method',
    inject([AuthenticationService, XHRBackend], (AuthenticationService, mockBackend) => {
      const mockResponse = [{ userId: 123 },
        { userId: 234 }
      ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      AuthenticationService.getUserId((User) => {
        expect(User[1].userId).toEqual(234);
      });
    }));
  /*Testcase for getToken method to get token*/
  it('should test getToken method',
    inject([AuthenticationService, XHRBackend], (AuthenticationService, mockBackend) => {
      const mockResponse = [{ token: 123 },
        { token: 234 }
      ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      AuthenticationService.getToken((User) => {
        expect(User[1].token).toEqual(234);
      });
    }));
})
describe('feat(localStorage Mock): ', function() {
  // Mock localStorage
  beforeEach(() => {
    var store = {};
    spyOn(localStorage, 'getItem').and.callFake((key: string): String => {
      return store[key] || null;
    });
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): string => {
      return store[key] = < string > value;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key: string, value: string): string => {
      return store[key] || null;
    });
  });
  it('should set an Item', () => {
    expect <any> (localStorage.setItem('foo', 'bar')).toBe('bar'); // bar
    expect <any> (localStorage.getItem('foo')).toBe('bar');
    expect <any> (localStorage.removeItem('bar')).toBe(null);
  });
})
