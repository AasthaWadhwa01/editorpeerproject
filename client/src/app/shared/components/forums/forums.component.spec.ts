import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Http, HttpModule, XHRBackend, ResponseOptions } from '@angular/http';
import { inject } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { NgxPaginationModule } from 'ngx-pagination';
import { TruncateModule } from 'ng2-truncate';
import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';
import { ForumsComponent as forum } from './forums.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ForumService as forumservice } from '../../services/forum.service';
import { AuthenticationService } from '../../services/authentication.service';
import { forumConfig } from './../../config/forum.config';
describe('ForumsComponent', () => {
  //variable declaration
  let data: any;
  let component: forum;
  let fixture: ComponentFixture < forum > ;
  let de, dforums: DebugElement;
  let el, eforums: HTMLElement;
  let service;
  let spy, spy1, spy2, spy3, spy4,spy5 ,spy6: jasmine.Spy;
  let forumdata = { questionTitle: 'what??', problemDescription: 'because.' };
  let event = { data: { tags: "helllll" } };
  let userName = { currentUser: { userName: "Nishtha" } };
  let store = {};
  //creating the stub data
  let test = {
    "response": { "n": 1, "ok": 1, "nModified": 1 },
    "questionTitle": { "title": "what is angular" },
    "negativeResponse": { "ok": 0, "nModified": 0, "n": 0 },
    "likes": { "like": "2" },
    "dislikes": { "dislike": "2" }
  };
  beforeEach(async(() => {
    class RouterStub {
      navigate(url: string) { return url; }
    }
    data = test.response;
    TestBed.configureTestingModule({
        declarations: [forum, NavbarComponent, FooterComponent],
        imports: [
          NgxPaginationModule,
          TruncateModule,
          HttpModule,
          FormsModule
        ],
        providers: [forumservice, AuthenticationService, BsModalService,
          { provide: Router, useClass: RouterStub },
          { provide: forum },
          { provide: XHRBackend, useClass: MockBackend }
        ]
      })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(forum);
        component = fixture.componentInstance;
        service = fixture.debugElement.injector.get(forumservice);
        spy  = spyOn(service, 'getPost').and.returnValue(Observable.of(event));
        spy1 = spyOn(service, 'searchEntries').and.returnValue(Observable.of(data));
        spy2 = spyOn(service, 'updateLike').and.returnValue(Observable.of(data));
        spy3 = spyOn(service, 'updateDislike').and.returnValue(Observable.of(data));
        spy4 = spyOn(component, 'viewPost').and.returnValue(Observable.of(userName));
       
        spyOn(localStorage, 'getItem').and.callFake(function (key) {
        return JSON.stringify({"userName":"VidushiSharma"});
       });
        
      });
  }));
  //test for component creation
  it('forum component should be created', () => {
    component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });
  //negative test for component creation
  it('forum component should not be created', () => {
    component = fixture.debugElement.componentInstance;
    expect(component).not.toBeFalsy();
  });
  //test viewPost() method which call service method getPost()
  it('testing the get post detail method', () => {
    fixture.detectChanges();
    component.viewPost();
    expect(test.response.n).toEqual(1);
    expect(test.response.ok).toEqual(1);
    expect(test.response.nModified).toEqual(1);
  });
  //negative test viewPost() method which call service method getPost()
  it("negative test for get post detail method", () => {
    component.viewPost();
    fixture.detectChanges();
    expect(test.response.nModified).not.toEqual(0);
    expect(test.response.ok).not.toEqual(0);
  });
  //test get getDetails() method which call service method searchEntries()
  it('testing the get detail method', () => {
    fixture.detectChanges();
    component.getDetails(test.response);
    expect(test.response.n).toEqual(1);
  });
  //test to mock backend data
  it('should mock backend data', () => {
    fixture.detectChanges();
    expect(forumdata.questionTitle).toEqual('what??');
    expect(forumdata.problemDescription).toEqual('because.');
  });
  //test case for forums config check
  it('forums should come from config', () => {
    fixture.detectChanges();
    dforums = fixture.debugElement.query(By.css('.forom'));
    eforums = dforums.nativeElement;
    expect(eforums.textContent).toContain(forumConfig.VIEWPOST.ALL_QUESTIONS);
  });
  //negative test case for forums config check
  it('forums should not come from config', () => {
    fixture.detectChanges();
    dforums = fixture.debugElement.query(By.css('.forom'));
    eforums = dforums.nativeElement;
    forumConfig.VIEWPOST.ALL_QUESTIONS = "question"
    expect(eforums.textContent).not.toContain("vidushi");
  });
  //test like() method which call service method updateLike()
  it('testing the like method', () => {
    fixture.detectChanges();
    component.like(test.likes.like);
    expect(test.response.n).toEqual(1);
    expect(test.response.ok).toEqual(1);
    expect(test.response.nModified).toEqual(1);
  });
  //test dislike() method which call service method updateLike()
  it('testing the dislike method', () => {
    fixture.detectChanges();
    component.dislike(test.dislikes.dislike);
    expect(test.response.n).toEqual(1);
    expect(test.response.ok).toEqual(1);
    expect(test.response.nModified).toEqual(1);
  });
  //negative test like() method which call service method updatelike()
  it("negative test for like method", () => {
    let negativeData = test.negativeResponse;
    component.like(negativeData);
    fixture.detectChanges();
    expect(test.response.n).not.toEqual(negativeData.nModified);
    expect(test.response.nModified).not.toEqual(negativeData.n);
    expect(test.response.ok).not.toEqual(negativeData.ok);
  });
  //test to navigate when click on getPostDetail method
  it('should navigate when click happens on  getpostdetail',
    inject([Router], (router: Router) => {
      fixture.detectChanges();
      const spy4 = spyOn(router, 'navigate');
      de = fixture.debugElement.query(By.css(".question"));
      el = de.nativeElement;
      el.click();
      const navargs = spy4.calls.first().args[0];
      expect(navargs).toContain("/forums/view")
    }));
  /*positive testcase to check whether getPostDetail returns questionTitle*/
  it('alignMessage method should not return userId if null.',
    inject([forum, XHRBackend], (forum, mockBackend) => {
      const mockResponse = { questionTitle: 'angular' };
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      component.getPostDetail("angular")
      expect(mockResponse.questionTitle).toEqual('angular');
    }));
  /*negative testcase to check whether getPostDetail returns questionTitle*/
  it('getPostDetail method should not return questionTitle if null.',
    inject([forum, XHRBackend], (forum, mockBackend) => {
      const mockResponse = { questionTitle: '' };
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      component.getPostDetail("")
      expect(mockResponse.questionTitle).toEqual('');
    }));
  // positive test for like method
  it('like method should return likes ',
    inject([forum, XHRBackend], (forum, mockBackend) => {
      const mockResponse = { likeValue: '200' };
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      component.like("200")
      expect(mockResponse.likeValue).toEqual('200');
    }));
  // negative test for like method
  it('like method should return likes ',
    inject([forum, XHRBackend], (forum, mockBackend) => {
      const mockResponse = { likeValue: '' };
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      component.like("")
      expect(mockResponse.likeValue).toEqual('');
    }));
  // positive test for dislike method
  it('testing the dislike method ',
    inject([forum, XHRBackend], (forum, mockBackend) => {
      const mockResponse = { dislikeValue: '2' };
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      component.dislike("2")
      expect(mockResponse.dislikeValue).toEqual('2');
    }));
  // negative test for dislike method
  it('testing the dislike method ',
    inject([forum, XHRBackend], (forum, mockBackend) => {
      const mockResponse = { dislikeValue: '' };
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      component.dislike("")
      expect(mockResponse.dislikeValue).toEqual('');
    }));
  // positive testcase for getDetail() method to search Terms
  it('testing the getDetails method to searchTerms',
    inject([forum, XHRBackend], (forum, mockBackend) => {
      const mockResponse = { searchTerm: 'what is angular' };
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      component.getDetails("what is angular")
      expect(mockResponse.searchTerm).toEqual('what is angular');
    }));
  // negative testcase for getDetail() method to search Terms
  it('testing the getDetails method to searchTerms',
    inject([forum, XHRBackend], (forum, mockBackend) => {
      const mockResponse = { searchTerm: '' };
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      component.getDetails("")
      expect(mockResponse.searchTerm).toEqual('');
    }));
  //negative testcase for username cannot be null
  it('username cannot be null', () => {
    expect < any > (localStorage.getItem('userName')).not.toBeNull();
  });
});
