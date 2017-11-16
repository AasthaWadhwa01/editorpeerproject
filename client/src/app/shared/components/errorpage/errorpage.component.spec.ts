//imports required from angular
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core'
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterLinkWithHref } from '@angular/router';

//imports required from our project
import { ErrorpageComponent } from './errorpage.component';
import { errorConfig } from '../../config/error.config'

//describe testing block
describe('ErrorpageComponent', () => {

  //component to be tested
 let component: ErrorpageComponent;
 let fixture: ComponentFixture<ErrorpageComponent>;

 //debug and native elements
 let errorDe, errorMessageDe, homeButtonDe :  DebugElement;
 let errorEl, errorMessageEl, homeButtonEl :  HTMLElement;

 //before each block for test environment
 beforeEach(async(() => {
   TestBed.configureTestingModule({
     imports:[RouterTestingModule],
     declarations: [ ErrorpageComponent ]
   })
   .compileComponents();
 }));

 beforeEach(() => {
   fixture = TestBed.createComponent(ErrorpageComponent);
   component = fixture.componentInstance;

   errorDe = fixture.debugElement.query(By.css('h1'));
   errorEl = errorDe.nativeElement;

   errorMessageDe = fixture.debugElement.query(By.css('p'));
   errorMessageEl = errorMessageDe.nativeElement;

   homeButtonDe = fixture.debugElement.query(By.css('button'));
   homeButtonEl = homeButtonDe.nativeElement;

   fixture.detectChanges();
 });

 //test cases in it block
 it('error component should be created', () => {
   expect(component).toBeTruthy();
 });
 
 it('error should contain error', () => {
 fixture.detectChanges();
 expect(errorEl.textContent).toContain(errorConfig.ERROR);
 });

 it('error message should contain error message', () => {
 fixture.detectChanges();
 expect(errorMessageEl.textContent).toContain(errorConfig.ERRORMESSAGE);
 });

 it('home button should contain home button text', () => {
 fixture.detectChanges();
 expect(homeButtonEl.textContent).toContain(errorConfig.HOMEBUTTON);
 });
});