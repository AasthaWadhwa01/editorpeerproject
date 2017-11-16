import { async, ComponentFixture, ComponentFixtureAutoDetect, TestBed, tick, fakeAsync, inject } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { FooterComponent } from './footer.component';
import { config } from './../../config/footer.config';

describe('FooterComponent', () => {
 let component: FooterComponent;
 let fixture: ComponentFixture<FooterComponent>;
 let dcopy, dwebsite : DebugElement;
 let ecopy, ewebsite : HTMLElement;

 beforeEach(async(() => {
   TestBed.configureTestingModule({
     declarations: [ FooterComponent ]
   })
   .compileComponents();
 }));

 beforeEach(() => {
   fixture = TestBed.createComponent(FooterComponent);
   component = fixture.componentInstance;

   dcopy = fixture.debugElement.query(By.css('.copyright'));
   ecopy = dcopy.nativeElement;

   dwebsite = fixture.debugElement.query(By.css('.website'));
   ewebsite = dwebsite.nativeElement;
   
   fixture.detectChanges();
 });

 //test case for coponent creation
 it('should be created', () => {
   expect(component).toBeTruthy();
 });

 //negative test case for coponent creation
 it('should not be created', () => {
   expect(component).not.toBeFalsy();
 });

 //test case for copyright
 it('copyright should come from config', () => {
 fixture.detectChanges();
 expect(ecopy.textContent).toContain(config.footer.Copyright);
 });

 //negative test case for copyright
 it('copyright should not come from config', () => {
 fixture.detectChanges();
 expect(ecopy.textContent).not.toContain(config.footer.Coyright);
 });

 //test case for copyright
 it('website should come from config', () => {
 fixture.detectChanges();
 expect(ewebsite.textContent).toContain(config.footer.website);
 });

 //negative test case for copyright
 it('website should not come from config', () => {
 fixture.detectChanges();
 expect(ewebsite.textContent).not.toContain(config.footer.websit);
 });

});