//imports required from angular
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import {AuthenticationService} from '../shared/services/authentication.service'
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterLinkWithHref } from '@angular/router';
import {HttpModule} from '@angular/http'

//imports required fro  our project
import { HomeComponent } from './home.component';
import { homeConfig } from '../shared/config/home.config';

//describe testing block
describe('HomeComponent', () => {

 //component to be tested
 let component: HomeComponent;
 let fixture: ComponentFixture<HomeComponent>;

 //debug and native elements
 let button1De, button2De, button3De, buttonSubtitleDe, titleDe, tagLineDe :  DebugElement;
 let button1El, button2El, button3El, buttonSubtitleEl, titleEl, tagLineEl :  HTMLElement;

 //before each block for test environment
 beforeEach(async(() => {
   TestBed.configureTestingModule({
     imports:[RouterTestingModule, HttpModule],      
     declarations: [ HomeComponent ],
     providers: [{provide: BsModalService}, AuthenticationService]
   })
   .compileComponents();
 }));

 //before each block for testing the component
 beforeEach(() => {
   fixture = TestBed.createComponent(HomeComponent);
   component = fixture.componentInstance;

   button1De = fixture.debugElement.query(By.css('.buttonTest1'));
   button1El = button1De.nativeElement;

   button2De = fixture.debugElement.query(By.css('.buttonTest2'));
   button2El = button2De.nativeElement;

   button3De = fixture.debugElement.query(By.css('.buttonTest3'));
   button3El = button3De.nativeElement;

   buttonSubtitleDe = fixture.debugElement.query(By.css('.buttonTest3'));
   buttonSubtitleEl = buttonSubtitleDe.nativeElement;

   titleDe = fixture.debugElement.query(By.css('h1'));
   titleEl = titleDe.nativeElement;

   tagLineDe = fixture.debugElement.query(By.css('h3'));
   tagLineEl = tagLineDe.nativeElement;

   fixture.detectChanges();
 });

 //test cases in it block
 it('home component should be created', () => {
   expect(component).toBeTruthy();
 });

 it('button 1 should contain text', () => {
   fixture.detectChanges();
   expect(button1El.textContent).toContain(homeConfig.BUTTON1);
 });

 it('button 2 should contain text', () => {
   fixture.detectChanges();
   expect(button2El.textContent).toContain(homeConfig.BUTTON2);
 });

   it('button 3 should contain text', () => {
   fixture.detectChanges();
   expect(button3El.textContent).toContain(homeConfig.BUTTON3);
 });

   it('button 3 subtitle should contain text', () => {
   fixture.detectChanges();
   expect(buttonSubtitleEl.textContent).toContain(homeConfig.BUTTONSUBTITLE);
 });

   it('heading title should contain title', () => {
   fixture.detectChanges();
   expect(titleEl.textContent).toContain(homeConfig.TITLE);
 });

   it('tagline should contain text', () => {
   fixture.detectChanges();
   expect(tagLineEl.textContent).toContain(homeConfig.TAGLINE);
 });
});