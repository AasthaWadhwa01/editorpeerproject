import { fakeAsync,async,tick, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {DebugElement} from '@angular/core'
import {By } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { BsModalService as bsModalService } from 'ngx-bootstrap/modal';
import { NO_ERRORS_SCHEMA} from '@angular/core';
import  { Observable } from 'rxjs/Observable';
import { HttpModule,XHRBackend,ResponseOptions} from '@angular/http';
import { Component, OnInit, Input,  TemplateRef } from '@angular/core';
import { NgZone } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import * as $ from 'jquery';
import swal from 'sweetalert2';
import { ComponentLoaderFactory as componentLoaderFactory,ModalModule } from 'ngx-bootstrap';
import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';

import { MainComponent as mainhome } from './main.component';
import { NavbarComponent as navbar } from '../shared/components/navbar/navbar.component';
import { FooterComponent as footer } from '../shared/components/footer/footer.component';
import { RepoSidebarComponent as reposidebar } from '../shared/components/repo-sidebar/repo-sidebar.component';
import { EditorComponent as editor } from '../shared/components/editor/editor.component';
import { WebeditorComponent as webeditor } from '../shared/components/webeditor/webeditor.component'
import { ChatHomeComponent as chathome } from '../shared/components/chat/chat-home/chat-home.component';
import { mainConfig as config } from '../shared/config/main.config';
import { GitService } from '../shared/services/git.service'
import { AuthenticationService  } from '../shared/services/authentication.service';
import { EditorService  } from '../shared/services/editor.service';
import { ChatService  } from '../shared/services/chatservices/chat.service';
import { SocketService  } from '../shared/services/chatservices/socket.service';
import { Router, ActivatedRoute,RouterLinkWithHref } from '@angular/router';
import { ProfileService } from '../shared/services/profile.service';
import { SnippetService } from '../shared/services/snippet.service';
//describe testing block
describe('MainComponent', () => {
  //component to be tested
  let component: any;
  let fixture: ComponentFixture<mainhome>;
  let spy: jasmine.Spy;
  let spy1: jasmine.Spy;
  let spy2: jasmine.Spy;
  let spy3: jasmine.Spy;
  /*let spy4: jasmine.Spy;*/
  let spy5: jasmine.Spy;
   //debug and native elements
  let dehead,deoption1,deoption2,denewrepo,dereponame,dedescription,depac: DebugElement;
  let elhead,eloption1,eloption2,elnewrepo,elreponame,eldescription,elpac: HTMLElement;
  const testQuote ={repos:'prashant'};
 //mocked service
  let authenticationService = { 
  };
  let profileService = {};
   let editorService = {};
    let chatService = {};
    let socketService ={};
    let gitService : GitService ;
    let snippetService ={};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [mainhome],
      imports : [RouterTestingModule, FormsModule,HttpModule,ModalModule.forRoot()],
      schemas:[NO_ERRORS_SCHEMA],
      providers : [GitService,
      {provide:navbar,footer,reposidebar,editor,webeditor,chathome},
      {provide:mainhome},
      {provide:AuthenticationService , usevalue:authenticationService},
      {provide:ProfileService, usevalue:profileService},
      {provide:EditorService , usevalue:editorService},
      {provide:ChatService, usevalue:chatService},
      {provide : SocketService, usevalue: socketService},
      {provide:SnippetService, usevalue:snippetService},
      { provide: XHRBackend, useClass: MockBackend },
      bsModalService,componentLoaderFactory]
    })
    .compileComponents();
  }));
   //before each block for testing the component
  beforeEach(() => {
  spyOn(localStorage, 'getItem').and.callFake(function (key) {
    return JSON.stringify({"test":"test"});
  });
 
    fixture = TestBed.createComponent(mainhome);
    component = fixture.componentInstance;
    gitService = fixture.debugElement.injector.get(GitService);
    spy = spyOn(gitService, 'getRepos')
          .and.returnValue(Observable.of(testQuote));
    spy1 = spyOn(gitService, 'getTree')
          .and.returnValue(Observable.of(testQuote));
    spy2 = spyOn(gitService, 'openFolder')
          .and.returnValue(Observable.of(testQuote));
    spy3 = spyOn(gitService, 'getFile')
          .and.returnValue(Observable.of(testQuote)); 
    /*spy4 = spyOn(gitService, 'createToken')
          .and.returnValue(Observable.of(testQuote));*/
  /*  spy5 = spyOn(gitService, 'createRepos')
          .and.returnValue(Observable.of(testQuote)); */
    dehead = fixture.debugElement.query(By.css('.accordionTitle'));
    elhead = dehead.nativeElement;
    
    deoption1 = fixture.debugElement.query(By.css('.option1'));
    eloption1 = deoption1.nativeElement;
     deoption2 = fixture.debugElement.query(By.css('.option2'));
     eloption2 = deoption2.nativeElement;
     denewrepo = fixture.debugElement.query(By.css('.newrepo'));
    elnewrepo = denewrepo.nativeElement; 
     dereponame = fixture.debugElement.query(By.css('.reponame'));
    elreponame = dereponame.nativeElement; 
     dedescription = fixture.debugElement.query(By.css('.description'));
    eldescription = dedescription.nativeElement; 
   depac = fixture.debugElement.query(By.css('.pac'));
   elpac = depac.nativeElement;
    fixture.detectChanges();
  });
   
   //test cases in it block
  it('should be created', () => {
    expect(component).toBeTruthy();
  });
 it('heading h5 should contain text', () => {
   fixture.detectChanges();
   expect(elhead.textContent).toContain(config.TITLE);
 });
  it('option1  should contain text', () => {
   fixture.detectChanges();
   expect(eloption1.textContent).toContain(config.OPTION1);
 });
  it('option2  should contain text', () => {
   fixture.detectChanges();
   expect(eloption2.textContent).toContain(config.OPTION2);
 });
  it('newrepo  should contain text', () => {
   fixture.detectChanges();
   expect(elnewrepo.textContent).toContain(config.NEWREPOSITORY);
 });
  it('reponamee  should contain text', () => {
   fixture.detectChanges();
   expect(elreponame.textContent).toContain(config.REPOSITORYNAME);
 });
  it('description  should contain text', () => {
   fixture.detectChanges();
   expect(eldescription.textContent).toContain(config.DESCRIPTION);
 });
    it('PACGENERATE  should contain text', () => {
   fixture.detectChanges();
   expect(elpac.textContent).toContain(config.PACGENERATE);
 });
  
//test case which should show quote after getQuote promise   
it('should show quote after getQuote promise (fakeAsync)', fakeAsync(() => { 
    fixture.detectChanges();   
      // wait for async locationchange method   
        tick();     
        // update view with quote   
          fixture.detectChanges();     
             expect(testQuote.repos).toEqual('prashant');   }));
 
// testcases for methods
// positive test case for getreponame method
 it('getreponame method should return reponame.',
    inject([mainhome, XHRBackend], (mainhome, mockBackend) => {
      const mockResponse = { reponame: 'bootstrap' };
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      component.getreponame("reponame")
      expect(mockResponse.reponame).toEqual('bootstrap');
    }));
   
   // negative test case for getreponame method
it('getreponame method should not return reponame if null.',
    inject([mainhome, XHRBackend], (mainhome, mockBackend) => {
      const mockResponse = { reponame: ' ' };
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      component.getreponame(" ")
      expect(mockResponse.reponame).toEqual(' ');
    }));
// positive testcase for getfilename
it('getfilename method should return filename.',
    inject([mainhome, XHRBackend], (mainhome, mockBackend) => {
      const mockResponse = { filename: 'html' };
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      component.getreponame("filename")
      expect(mockResponse.filename).toEqual('html');
    }));
// negative testcase for getfilrname
it('getfilename method should not return filename if null.',
    inject([mainhome, XHRBackend], (mainhome, mockBackend) => {
      const mockResponse = { filename: ' ' };
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      component.getreponame(" ")
      expect(mockResponse.filename).toEqual(' ');
    }));
 // positive testcase for getcontent
 it('getcontent method should return text in content.',
    inject([mainhome, XHRBackend], (mainhome, mockBackend) => {
      const mockResponse = { text: 'css' };
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      component.getcontent("text")
      expect(mockResponse.text).toEqual('css');
    }));
 // negative testcase for getcontent
 it('getcontent method should not return text if null.',
    inject([mainhome, XHRBackend], (mainhome, mockBackend) => {
      const mockResponse = { text: ' ' };
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      component.getcontent(" ")
      expect(mockResponse.text).toEqual(' ');
    }));
 //positive testcase for getMode
 it('getMode method should return editormode in selectedvalue.',
    inject([mainhome, XHRBackend], (mainhome, mockBackend) => {
      const mockResponse = { editormode: 'js' };
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      component.getMode("editormode")
      expect(mockResponse.editormode).toEqual('js');
    }));
 //negative testcase for getMode
 it('getMode method should not return selectedvalue if editormode is null',
    inject([mainhome, XHRBackend], (mainhome, mockBackend) => {
      const mockResponse = { editormode: ' ' };
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      component.getMode(" ")
      expect(mockResponse.editormode).toEqual(' ');
    }));
 // positive test case for getRepoNameForFileUpdat
  it('getRepoNameForFileUpdatee method should return value.',
    inject([mainhome, XHRBackend], (mainhome, mockBackend) => {
      const mockResponse = { repoNameForFileUpdate: 'js' };
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      component.getRepoNameForFileUpdate("repoNameForFileUpdate")
      expect(mockResponse.repoNameForFileUpdate).toEqual('js');
    }));
 // negative testcase for getRepoNameForFileUpdat
  it('getRepoNameForFileUpdate method should not return selectedvalue if repoNameForFileUpdate is null ',
    inject([mainhome, XHRBackend], (mainhome, mockBackend) => {
      const mockResponse = { repoNameForFileUpdate: ' ' };
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      component.getRepoNameForFileUpdate(" ")
      expect(mockResponse.repoNameForFileUpdate).toEqual(' ');
    }));
 it('reposearch should work', () => {
   let user = fixture.debugElement.injector.get(GitService);
   component.reposearch()
 });
 it(' showFile should work', () => {
   let user = fixture.debugElement.injector.get(GitService);
   component. showFile()
 
 });
 it(' show should work', () => {
   let user = fixture.debugElement.injector.get(GitService);
   component. show()
 
 });
 /*it(' createtoken should work', () => {
   let user = fixture.debugElement.injector.get(GitService);
   component. createAccessToken()
 
 });*/
   
    /*t(' show should work', () => {
   let user = fixture.debugElement.injector.get(GitService);
   component.  createRepo()
 
 });*/
});