import {  async, ComponentFixture, TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterLinkWithHref } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebeditorComponent } from './webeditor.component';
import { AceEditorDirective } from 'ng2-ace-editor'
import { AceEditorModule } from 'ng2-ace-editor'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { NO_ERRORS_SCHEMA }          from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { SnippetService} from '../../services/snippet.service';
import { GitService } from '../../services/git.service';
import { webEditorConfig } from '../../config/webEditor.config';
import { ComponentLoaderFactory,ModalModule } from 'ngx-bootstrap';
describe('Settings component Testing', () => {
/*config= webEditorConfig;*/
let comp: WebeditorComponent;
let fixture: ComponentFixture < WebeditorComponent > ;
let button1de:  DebugElement;
let button1el:  HTMLElement;
let test = {
    "code": { "body": '<body></body>', "style": "float:right", "url":"https://192.168.252.211:8080/#/main&togetherjs=FG27TBNhvS","comment":"this is a html tag","file":"file.exe","htmlfile":"htmlfile.exe","cssfile":"cssfile.exe"  },
    "html": { "code": "<html></html>" },
    "url":"https://192.168.252.211:8080/#/main&togetherjs=FG27TBNhvS",
    "openmodal": "true",
    "file": "index",
    "negativeResponse": { "ok": 0, "nModified": 0, "n": 0 },    
  };
 let openmodal:any = true;
beforeEach(async() => {
 TestBed.configureTestingModule({
    imports: [RouterTestingModule,ModalModule.forRoot(),
    HttpModule,AceEditorModule,
    FormsModule, ReactiveFormsModule],
    declarations: [WebeditorComponent],
    schemas:      [ NO_ERRORS_SCHEMA ],
   //declaring component to be tested
   providers: [{ provide:SnippetService },{ provide:BsModalService },{ provide:ComponentLoaderFactory },{ provide: AuthenticationService },{ provide: GitService }]
  }).compileComponents();
})
/*Initial configuration that will run before every testcase*/
beforeEach(() => {
  fixture = TestBed.createComponent(WebeditorComponent);
  comp = fixture.componentInstance;
  button1de = fixture.debugElement.query(By.css('.output'));
  button1el = button1de.nativeElement;
})
/*Testcase to check whether component is created or not*/
it('should create webeditor component', () => {
  comp = fixture.debugElement.componentInstance;
  expect(comp).toBeTruthy();
});
it('it should display output', () => {
  fixture.detectChanges();
  expect(button1el.textContent).toContain(webEditorConfig.webEditor.OUTPUT);
});
it("testing the openmodal method", () => {
   fixture.detectChanges();
   comp.openModals(openmodal);
   expect(test.openmodal).toEqual('true');
 });
it("testing the calledFromOutside method", () => {
   fixture.detectChanges();
   comp.calledFromOutside(test.url);
   expect(test.code.url).toEqual('https://192.168.252.211:8080/#/main&togetherjs=FG27TBNhvS');
 });
it("testing the showHtml method", () => {
   fixture.detectChanges();
   comp.showHtml(test.html.code);
   expect(test.code.body).toEqual('<body></body>');
 });
it("testing the showHtml method", () => {
   fixture.detectChanges();
   comp.showCss(test.html.code);
   expect(test.code.style).toEqual('float:right');
 });
it("testing the comment method", () => {
   fixture.detectChanges();
   comp.comment();
   expect(test.code.comment).toEqual('this is a html tag');
 });
it("testing the table method", () => {
   fixture.detectChanges();
   comp.table();
   expect(test.code.comment).toEqual('this is a html tag');
 });
it("testing the downloadFile method", () => {
   fixture.detectChanges();
   comp.downloadFile();
   expect(test.code.file).toEqual('file.exe');
 });
it("testing the downloadhtmlFile method", () => {
   fixture.detectChanges();
   comp.downloadHtmlFile();
   expect(test.code.htmlfile).toEqual('htmlfile.exe');
 });
it("testing the downloadhtmlFile method", () => {
   fixture.detectChanges();
   comp.downloadCssFile();
   expect(test.code.cssfile).toEqual('cssfile.exe');
 });
})