import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'
import { Router, ActivatedRoute,RouterLinkWithHref} from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing';
import {DebugElement } from '@angular/core'
import {By } from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { HttpModule } from '@angular/http'
import {NavbarComponent} from '../navbar/navbar.component'
import {FooterComponent} from '../footer/footer.component'
import { config  } from '../../config/snippet.config';
import { SnippetService } from '../../../shared/services/snippet.service';
import { SnippetComponent  } from './snippet.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import 'rxjs/Rx';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import swal from 'sweetalert2';
import { ComponentLoaderFactory,ModalModule } from 'ngx-bootstrap';
describe('SnippetComponent', () => {
 let component: SnippetComponent;
 let fixture: ComponentFixture<SnippetComponent>;
 let headde,addde,selectde: DebugElement;
 let headel,addel,selectel: HTMLElement;
 let testData:any;
 let testmode:any;
 let service: any;
 let de: DebugElement;
 let el: HTMLElement;
 let spyadd: jasmine.Spy;
 let spyget: jasmine.Spy;
 let spydelete: jasmine.Spy;
 let spyupdate: jasmine.Spy;
 let tests = {
  "response": { "n": 1, "ok": 1, "nModified": 1 },
  "negativeResponse": { "ok": 0, "nModified": 0, "n": 0 },
    "responsemode": { "Title": "head tag", "language": "Html", "code": "<head><head>" },
 };
 
 /*let event ={target:{value:{lang:"Html"}}}*/
 beforeEach(async(() => {
   testData = tests.response;
   testmode = tests.responsemode;
  TestBed.configureTestingModule({
   declarations: [ SnippetComponent,NavbarComponent,FooterComponent ],
   imports : [FormsModule, RouterTestingModule, HttpModule,ModalModule.forRoot()],
   providers : [SnippetService,BsModalService,ComponentLoaderFactory]
  })
  .compileComponents().then(() => {
    fixture = TestBed.createComponent(SnippetComponent);
    component = fixture.componentInstance;
    headde = fixture.debugElement.query(By.css('.title'));
    headel = headde.nativeElement;
    addde = fixture.debugElement.query(By.css('.Add'));
    addel = addde.nativeElement;
    selectde = fixture.debugElement.query(By.css('.selectlang'));
    selectel = selectde.nativeElement;
  
    fixture.detectChanges();
    fixture.detectChanges();
    service = fixture.debugElement.injector.get(SnippetService);
    spyadd = spyOn(service, 'addSnippet').and.returnValue(Observable.of(testData));
    spyget = spyOn(service, 'getSnippet').and.returnValue(Observable.of(testData));
    spydelete = spyOn(service, 'deleteSnippet').and.returnValue(Observable.of(testData));
    spyupdate = spyOn(service, 'updateSnippet').and.returnValue(Observable.of(testData));
    
   });
 }));
 /*component creation test case*/
 it('component should be created', () => {
  expect(component).toBeTruthy();
 });
 /*test case for interpolation(title)*/
 it('it should display title',() =>{
  fixture.detectChanges();
  expect(headel.textContent).toBe(config.con.TITLE);
 })
  /*test case for interpolation(add snippet)*/
 it('it should add snippet',() =>{
  fixture.detectChanges();
  expect(addel.textContent).toBe(config.con.ADD);
 })
  /*test case for interpolation(language)*/
 it('it should display language',() =>{
  fixture.detectChanges();
  expect(selectel.textContent).toBe(config.con.SELECTLANG);
 })
  /*test case for submit method created in add forum*/
 it("testing the Add method", () => {
  fixture.detectChanges();
  component.add();
  expect(tests.response.n).toEqual(1);
  expect(tests.response.nModified).toEqual(1);
  expect(tests.response.ok).toEqual(1);
 });
 /*Test Case for delete snippet method*/
 it("testing the delete snippet method", () => {
  fixture.detectChanges();
  component.deleteSnip("head tag");
  expect(tests.response.n).toEqual(1);
  expect(tests.response.ok).toEqual(1);
 });
 /*Test Case for show snippet method*/
 it("testing the show method", () => {
  fixture.detectChanges();
  component.show();
   expect(testmode.Title).toEqual("head tag");
  expect(testmode.language).toEqual("Html");
  expect(testmode.code).toEqual("<head><head>");
 });
 /*Test Case for edit snippet method*/
 it("testing the edit method", () => {
  fixture.detectChanges();
  component.edit();
   expect(testmode.Title).toEqual("head tag");
  expect(testmode.language).toEqual("Html");
  expect(testmode.code).toEqual("<head><head>");
 });
});