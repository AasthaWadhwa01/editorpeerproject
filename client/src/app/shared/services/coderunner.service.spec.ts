import { async, inject, TestBed } from '@angular/core/testing';
import {
 MockBackend,
 MockConnection
} from '@angular/http/testing';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';

import { CoderunnerService } from './coderunner.service';

describe('coderunnerService ,(mockBackend)', () => {

 /*Initial configuration that will run before every testcase*/
 beforeEach(() => {
   TestBed.configureTestingModule({
     imports: [HttpModule],
     providers: [
       CoderunnerService,
       { provide: XHRBackend, useClass: MockBackend }
     ]
   });
 });

 /*Testcase to check whether service is injected or not*/
 it('can instantiate service when inject service',
   inject([CoderunnerService], (service: CoderunnerService) => {
     expect(service instanceof CoderunnerService).toBe(true);
   }));

 /*Testcase to check whether mockdata is used instead of real database */
 it('can provide the mockBackend as XHRBackend',
   inject([XHRBackend], (backend: MockBackend) => {
     expect(backend).not.toBeNull('backend should be provided');
   }));

 /*Testcase to check whether instance of service is created or not*/
 it('can instantiate service with "new"', inject([Http], (http: Http) => {
   expect(http).not.toBeNull('http should be provided');
   let service = new CoderunnerService(http);
   expect(service instanceof CoderunnerService).toBe(true, 'new service should be ok');
 }));

})