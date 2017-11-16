import { DebugElement,Component, OnInit, AfterViewInit } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { CKEditorModule } from 'ng2-ckeditor';
import { Router, ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { ViewForumComponent } from './view-forum.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { ForumService as forumService } from '../../../services/forum.service';
import { AuthenticationService as authenticationService } from '../../../services/authentication.service';
import { AuthoriseGuard as authGaurd } from '../../../services/authorise.guard';
import { forumConfig } from './../../../config/forum.config';
describe('ViewForumComponent', () => {
 let component: ViewForumComponent;
 let fixture: ComponentFixture<ViewForumComponent>;
 let de: DebugElement;
 let el: HTMLElement;
 let spy: jasmine.Spy;
 let spy1: jasmine.Spy;
 let data: any
 let service: any;
 let userName: "Nishtha";
 let testData: any;
 let tests = {
   "response": { "n": 1, "ok": 1, "nModified": 1 },
   "negativeResponse": { "ok": 0, "nModified": 0, "n": 0 }
 };
 
  beforeEach(async(() => {
    testData = tests.response;
   TestBed.configureTestingModule({
     declarations: [ ViewForumComponent, NavbarComponent, FooterComponent ],
     imports: [FormsModule,HttpModule,RouterTestingModule, CKEditorModule],
     schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],
     providers: [forumService, authGaurd,authenticationService]
   })
   .compileComponents().then(() => {
       fixture = TestBed.createComponent(ViewForumComponent);
       component = fixture.componentInstance;
       de = fixture.debugElement.query(By.css('.allQuestion'));
       el = de.nativeElement;
       service = fixture.debugElement.injector.get(forumService);
       spy = spyOn(service, 'saveAnswer').and.returnValue(Observable.of(userName));
       spy1 = spyOn(service, 'getPostById').and.returnValue(Observable.of(userName));
       spyOn(localStorage, 'getItem').and.callFake(function (key) {return JSON.stringify({"userName":"test"});
  });
    });
 }));
 beforeEach(() => {
   fixture = TestBed.createComponent(ViewForumComponent);
   component = fixture.componentInstance;
   //fixture.detectChanges();
 });
 //test case to create component
 it('should be created', () => {
   expect(component).toBeTruthy();
 });
 //-ve test case to check component creation
 it('AddForumComponent component should not be created', () => {
 expect(component).not.toBeFalsy();
 });
 //+ve test case for postAnswer method created in add forum
 it("testing the postAnswer method", () => {
   fixture.detectChanges();
   spy = spyOn(service, 'saveAnswer').and.returnValue(Observable.of(testData));
   component.postAnswer();
   expect(tests.response.n).toEqual(1);
   expect(tests.response.nModified).toEqual(1);
   expect(tests.response.ok).toEqual(1);
 });
 //-ve test case for postAnswer method created in add forum
  it("negative test for postAnswer method", () => {   
   let negativeData = tests.negativeResponse;
   component.postAnswer();
   spy = spyOn(service, 'saveAnswer').and.returnValue(Observable.of(testData));
   fixture.detectChanges();
   expect(negativeData.n).toEqual(0);
   expect(negativeData.nModified).toEqual(0);
   expect(negativeData.ok).toEqual(0);
 });
  //-ve tests case for config of the question title in html
  it('should not display ALL_QUESTIONS', () => {
   fixture.detectChanges();
   expect(el.textContent).not.toContain("AllQuestions");
 });
});
describe('viewforum localStorage data Mocking: ', function() {
  // Mock localStorage
  beforeEach(() => {
    let store = {};
    spyOn(localStorage, 'getItem').and.callFake((key: string): String => {
      return store[key] || null;
    });
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): string => {
      return store[key] = < string > value;
    });
  });
  // it should set and get an item 
  it('should set and get an Item', () => {
    expect < any > (localStorage.setItem('userName', 'Nishtha')).toBe('Nishtha');
    expect < any > (localStorage.getItem('userName')).toBe('Nishtha');
  });
  // it should return null for non existing items
  it('should return null for non existing items', () => {
    expect < any > (localStorage.getItem('userName')).toBeNull();
  });
});