import { async, ComponentFixture, ComponentFixtureAutoDetect, TestBed, tick, fakeAsync } from '@angular/core/testing';
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

import { NavbarComponent } from './navbar.component';
import {AuthenticationService} from '../../../shared/services/authentication.service'

describe('NavbarComponent', () => {
  class RouterStub {
    navigate(url: string) { return url; }
  }

  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;
  let spy, spy1;
  //creating the stub data
  let tests = {
  "response": { "n": 1, "ok": 1, "nModified": 1 },
  "data": { "response": "category already exists" },
  "negativeResponse": { "ok": 0, "nModified": 0, "n": 0 },
  "categoryResponse": { "Response": "category Name alerady exist" }
  };
  const authdata = {userName: 'Nishtha',userId: '50042977' };
  let authenticationService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, FormsModule, ReactiveFormsModule, RouterTestingModule, CKEditorModule, BrowserModule],
      declarations: [ NavbarComponent ],
      providers: [{ provide: AuthenticationService,  useValue: authenticationService }, { provide: Router, useClass: RouterStub }, { provide: ActivatedRoute }, { provide: BsModalService }, { provide: Http }, { provide: XHRBackend }, { provide: ComponentFixtureAutoDetect, useValue: true }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;

    authenticationService = fixture.debugElement.injector.get(AuthenticationService);
    spy = spyOn(authenticationService,'logoutEditor').and.returnValue(Observable.of(authdata))
    
    fixture.detectChanges();
  });

  //test case to check component creation
  it('navbar component should be created', () => {
    component=fixture.debugElement.componentInstance;
    expect(component).toBeDefined();
  });

    it('Navigate when user click on back button',
    inject([Router], (router: Router) => {
      // spy = spyOn(locationChangeService, 'locationChangeMethod').and.callThrough();
      spy1 = spyOn(router, 'navigate');
      de = fixture.debugElement.query(By.css('.logout'))
      el = de.nativeElement;
      el.click();
      const navArgs = spy1.calls.first().args[0];
      expect(navArgs).toContain('/');
}))});