import { async, inject, TestBed } from '@angular/core/testing';
import {MockBackend,MockConnection} from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpService as httpservice } from './chatservices/http.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { AuthenticationService} from './authentication.service';
import { ForumService as forumService } from './forum.service';

describe('forumService ,(mockBackend)', () => {

/*Initial configuration that will run before every testcase*/
beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [HttpModule,RouterTestingModule],
    providers: [
      forumService,AuthenticationService,httpservice,HttpModule,
      { provide: XHRBackend, useClass: MockBackend}
    ]
  });
});

/*Testcase to check whether service is injected or not*/
it('can instantiate service when inject service',
  inject([forumService], (service: forumService) => {
    expect(service instanceof forumService).toBe(true);
  }));

/*Testcase to check whether mockdata is used instead of real database */
it('can provide the mockBackend as XHRBackend',
  inject([XHRBackend], (backend: MockBackend) => {
    expect(backend).not.toBeNull('backend should be provided');
  }));

 //testcase for savePost method
 it('test savePost method',
   inject([forumService, XHRBackend], (forumService, mockBackend) => {
     const mockResponse = [{ data:'post'},];
     mockBackend.connections.subscribe((connection) => {
       connection.mockRespond(new Response(new ResponseOptions({
         body: JSON.stringify(mockResponse)
       })));
     });
     forumService.savePost().subscribe((data) => {
       expect(data).toEqual([{ data: 'post' }]);
     });
   }));

//Testcase for getPost method
 it('test getPost method',
   inject([forumService, XHRBackend], (forumService, mockBackend) => {
     const mockResponse = [{ title: 'javascript', code: '<html></html>' },
     ];
     mockBackend.connections.subscribe((connection) => {
       connection.mockRespond(new Response(new ResponseOptions({
         body: JSON.stringify(mockResponse)
       })));
     });
     forumService.getPost().subscribe((getData) => {
       expect(getData).toEqual([{title: 'javascript', code: '<html></html>'}]);
     });
   }));

 //Testcase for searchEntries method
 it('test searchEntries method',
   inject([forumService, XHRBackend], (forumService, mockBackend) => {
     const mockResponse = [{ searchTerm: 'javascript'}];
     mockBackend.connections.subscribe((connection) => {
       connection.mockRespond(new Response(new ResponseOptions({
         body: JSON.stringify(mockResponse)
       })));
     });

     forumService.searchEntries().subscribe((getSearch) => {
       expect(getSearch).toEqual([{searchTerm: 'javascript'}]);
     });
   }));

 //Testcase for getPostById method
 it('test getPostById method',
   inject([forumService, XHRBackend], (forumService, mockBackend) => {
     const mockResponse = [{ id: '0112'}];
     mockBackend.connections.subscribe((connection) => {
       connection.mockRespond(new Response(new ResponseOptions({
         body: JSON.stringify(mockResponse)
       })));
     });

     forumService.getPostById().subscribe((id) => {
       expect(id).toEqual([{id:'0112'}]);
     });
   }));

 //Testcase for getPostById method
 it('test getPostById method',
   inject([forumService, XHRBackend], (forumService, mockBackend) => {
     const mockResponse = [{ id: '0112'}];
     mockBackend.connections.subscribe((connection) => {
       connection.mockRespond(new Response(new ResponseOptions({
         body: JSON.stringify(mockResponse)
       })));
     });
     forumService.getPost().subscribe((id) => {
       expect(id).toEqual([{id:'0112'}]);
     });
   }));
 
   //Testcase for savePost method
   it('test savePost method',
   inject([forumService, XHRBackend], (forumService, mockBackend) => {
     const mockResponse = [{id:1,answer:"abc"},];
     mockBackend.connections.subscribe((connection) => {
       connection.mockRespond(new Response(new ResponseOptions({
         body: JSON.stringify(mockResponse)
       })));
     });
     forumService.savePost().subscribe((saveData) => {
       expect(saveData[0].id).toEqual(1);
     });
   }));
})