import { async, inject, TestBed } from '@angular/core/testing';
import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { ProfileService } from './profile.service';
describe('profileService ,(mockBackend)', () => {
  /*Initial configuration that will run before every testcase*/
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ProfileService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });
  /*Positive Testcase to check whether service is injected or not*/
  it('can instantiate service when inject service',
    inject([ProfileService], (service: ProfileService) => {
      expect(service instanceof ProfileService).toBe(true);
    }));
  /*Negative Testcase to check whether service is injected or not*/
  it('cannot instantiate service when service is not injected',
    inject([ProfileService], (service: ProfileService) => {
      expect(service instanceof ProfileService).not.toBe(false);
    }));
  /*Testcase to check whether mockdata is used instead of real database */
  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
    }));
  //Positive Testcase for getDataFromDB method
  it('should test getDataFromDB method',
    inject([ProfileService, XHRBackend], (ProfileService, mockBackend) => {
      const mockResponse = [{ userId: 123 },
        { userId: 234 }
      ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      ProfileService.getDataFromDB().subscribe((profile) => {
        expect(profile[1].userId).toEqual(234);
      });
    }));
  //Negative Testcase for getDataFromDB method
  it('should test getDataFromDB method',
    inject([ProfileService, XHRBackend], (ProfileService, mockBackend) => {
      const mockResponse = [{ userId: 123 },
        { userId: 234 }
      ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      ProfileService.getDataFromDB().subscribe((profile) => {
        expect(profile[1].userId).not.toEqual(123);
      });
    }));
  //Testcase for uploadFile
  it(' Should check uploadFile method',
    inject([ProfileService, XHRBackend], (ProfileService, mockBackend) => {
      const mockResponse = [
        { userId: 123, formData: '<html></html>' },
        { userId: 456, formData: '<head></head>' }
      ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      ProfileService.uploadFile().subscribe((profile) => {
        expect(profile[0].userId).toEqual(123);
        expect(profile[1].formData).toEqual('<head></head>');
      });
    }));
  //Testcase for store Access token
  it(' Should check uploadFile method',
    inject([ProfileService, XHRBackend], (ProfileService, mockBackend) => {
      const mockResponse = [
        { userId: 123, token: 'xyz' },
        { userId: 456, token: 'abc' }
      ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      ProfileService.storeAccessToken().subscribe((profile) => {
        expect(profile[0].userId).toEqual(123);
        expect(profile[1].token).toEqual('abc');
      });
    }));
  //Testcase to check status of GetDataFromDB method 
  it('can get data from db',
    inject([ProfileService, XHRBackend], (profileService, mockBackend) => {
      mockBackend.connections.subscribe((connection) => {
        expect(connection.request.method).toEqual(RequestMethod.Get);
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify([{ status: 200 }])
        })))
      });
      profileService.getDataFromDB().subscribe((profile) => {
        expect(profile[0].status).toBe(200);
      })
    }));
  //Testcase to check status of uploadFile method
  it('can upload file',
    inject([ProfileService, XHRBackend], (profileService, mockBackend) => {
      mockBackend.connections.subscribe((connection) => {
        expect(connection.request.method).toEqual(RequestMethod.Put);
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify([{ status: 200 }])
        })))
      });
      profileService.uploadFile().subscribe((profile) => {
        expect(profile[0].status).toBe(200);
      })
    }));
  //Testcase to check status of storeAccessToken method
  it('can store Access token',
    inject([ProfileService, XHRBackend], (profileService, mockBackend) => {
      mockBackend.connections.subscribe((connection) => {
        expect(connection.request.method).toEqual(RequestMethod.Put);
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify([{ status: 200 }])
        })))
      });
      profileService.storeAccessToken().subscribe((profile) => {
        expect(profile[0].status).toBe(200);
      })
    }));
  //Testcase to check status of updatePersonalInfo method
  it('can update personal info',
    inject([ProfileService, XHRBackend], (profileService, mockBackend) => {
      mockBackend.connections.subscribe((connection) => {
        expect(connection.request.method).toEqual(RequestMethod.Put);
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify([{ status: 200 }])
        })))
      });
      profileService.updatePersonalInfo().subscribe((profile) => {
        expect(profile[0].status).toBe(200);
      })
    }));
})
