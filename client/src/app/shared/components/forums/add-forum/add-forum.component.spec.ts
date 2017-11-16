import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/observable/of';

import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { AuthenticationService } from '../../../services/authentication.service';
import { ForumService } from '../../../services/forum.service';
import { AddForumComponent } from './add-forum.component';
import { forumConfig } from './../../../config/forum.config';

describe('AddForumComponent', () => {
 let component: AddForumComponent;
 let fixture: ComponentFixture < AddForumComponent > ;
 let de: DebugElement;
 let el: HTMLElement;
 let forumService: ForumService;
 let spy: jasmine.Spy;
 let data: any
 let service: any;

 let tests = {
   "response": { "n": 1, "ok": 1, "nModified": 1 },
   "negativeResponse": { "ok": 0, "nModified": 0, "n": 0 }
 };

 beforeEach(async(() => {
   data = tests.response;
   TestBed.configureTestingModule({
       declarations: [AddForumComponent, NavbarComponent, FooterComponent],
       providers: [{ provide: AuthenticationService }, { provide: Router }, { provide: ActivatedRoute }],
       imports: [FormsModule, HttpModule]
     })
     .compileComponents().then(() => {
       fixture = TestBed.createComponent(AddForumComponent);
       component = fixture.componentInstance;
       de = fixture.debugElement.query(By.css('.questionTitle'));
       el = de.nativeElement;
       fixture.detectChanges();
       service = fixture.debugElement.injector.get(ForumService);
       spy = spyOn(service, 'savePost').and.returnValue(Observable.of(data));
     });
 }));

 //+ve  test case to check component creation
 it('AddForumComponent should be created', () => {
   expect(component).toBeDefined();
 });

 //-ve test case to check component creation
 it('AddForumComponent component should not be created', () => {
   fixture.detectChanges();
   expect(component).not.toBeFalsy();
 });

 //+ve test case for insertPost method created in add forum
 it("testing the insertPost method", () => {
   fixture.detectChanges();
   component.insertPost();
   expect(tests.response.n).toEqual(1);
   expect(tests.response.nModified).toEqual(1);
   expect(tests.response.ok).toEqual(1);


 });

 //-ve test case for insertPost method created in add forum
 it("negative test for insertPost method", () => {
   let negativeData = tests.negativeResponse;
   component.insertPost();
   fixture.detectChanges();
   expect(negativeData.n).toEqual(0);
   expect(negativeData.nModified).toEqual(0);
   expect(negativeData.ok).toEqual(0);

 });

 //tets case for config of the question title in html
 it('should display QUESTION_TITLE', () => {
   fixture.detectChanges();
   expect(el.textContent).toContain(forumConfig.NEWPOST.QUESTION_TITLE);
 });
});