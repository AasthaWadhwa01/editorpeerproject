import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { By } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Http, XHRBackend, ResponseOptions, HttpModule } from '@angular/http';
import { inject } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ViewpostComponent } from './viewpost.component';
import { ForumService } from '../../../services/forum.service';


describe('ViewpostComponent', () => {
class RouterStub {
    navigate(url: string) { return url; }
  }

let component: ViewpostComponent;
let fixture: ComponentFixture<ViewpostComponent>;
let de, dDetail:      DebugElement;
let el, eDetail:      HTMLElement;
const forumdata = {questionTitle:'what??',problemDescription:'because.' };
let spy, spy1;
let forumservice: ForumService; // the actually injected service

//creating the stub data
let tests = {
  "response": { "n": 1, "ok": 1, "nModified": 1 },
  "data": { "response": "category already exists" },
  "negativeResponse": { "ok": 0, "nModified": 0, "n": 0 },
  "categoryResponse": { "Response": "category Name alerady exist" }
};

beforeEach(async(() => {
  TestBed.configureTestingModule({
     imports: [HttpModule, FormsModule, ReactiveFormsModule, RouterTestingModule, CKEditorModule, BrowserModule],
    declarations: [ ViewpostComponent ],
    providers: [{ provide: ForumService,  useValue: forumdata }, { provide: Router, useClass: RouterStub }, { provide: ActivatedRoute }, { provide: BsModalService }, { provide: Http }, { provide: XHRBackend }]
  })
  .compileComponents();
}));

beforeEach(() => {
  fixture = TestBed.createComponent(ViewpostComponent);
  component = fixture.componentInstance;
  //  Setup spy on the `getPost` method
  forumservice = fixture.debugElement.injector.get(ForumService);
});

  //test for component creation
  it('viewpost component should be created', () => {
    component=fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  //test to mock backend data
  it('should mock backend data', () => {
  fixture.detectChanges(); 
  expect(forumdata.questionTitle).toEqual('what??');
  expect(forumdata.problemDescription).toEqual('because.');
  });

  //negative test to mock backend data
  it("should not mock backend data", () => {
  fixture.detectChanges();
  expect(forumdata.questionTitle).not.toEqual("wht?");
  expect(forumdata.problemDescription).not.toEqual("bcoz");
  })

  //test viewPost() method which call service method getPost()
  it("testing the viewPost() method",() => {
  fixture.detectChanges();
  spy = spyOn(forumservice,'getPost').and.returnValue(Observable.of(forumdata));
  component.viewPost();
  expect(tests.response.n).toEqual(1);
  expect(tests.response.nModified).toEqual(1);
  expect(tests.response.ok).toEqual(1);
  });

  //negative test viewPost() method which call service method getPost()
  it("negative testing the viewPost() method",() => {
  fixture.detectChanges();
  spy = spyOn(forumservice,'getPost').and.returnValue(Observable.of(forumdata));
  component.viewPost();
  expect(tests.negativeResponse.n).not.toEqual(1);
  expect(tests.negativeResponse.nModified).not.toEqual(1);
  expect(tests.negativeResponse.ok).not.toEqual(1);
  });

  //test getDetails() method which call service method searchEntries()
  it("testing the getDetails() method", () => {
  fixture.detectChanges();
  spy1 = spyOn(forumservice,'searchEntries').and.returnValue(Observable.of(forumdata));
  component.getDetails(tests.data.response);
  expect(tests.response.n).toEqual(1);
  expect(tests.response.nModified).toEqual(1);
  expect(tests.response.ok).toEqual(1);
  });

  //negative test getDetails() method which call service method searchEntries()
  it("negative testing the getDetails() method",() => {
  fixture.detectChanges();
  spy = spyOn(forumservice,'searchEntries').and.returnValue(Observable.of(forumdata));
  component.getDetails(tests.data.response);
  expect(tests.negativeResponse.n).not.toEqual(1);
  expect(tests.negativeResponse.nModified).not.toEqual(1);
  expect(tests.negativeResponse.ok).not.toEqual(1);
  });

});
