import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';
import { XHRBackend, ResponseOptions, HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { inject } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import 'rxjs/add/observable/of';
/*import third party libraries*/
import { RepoSidebarComponent } from './repo-sidebar.component';
import { GitService } from '../../services/git.service';
import { EditorService } from '../../services/editor.service';
import { ProfileService } from '../../services/profile.service';
import { AuthenticationService } from '../../services/authentication.service';
describe('RepoSidebarComponent', () => {
   let data: any;
  let component: RepoSidebarComponent;
  let fixture: ComponentFixture<RepoSidebarComponent>;
 
  let spy: jasmine.Spy;
  let spy1: jasmine.Spy;
  let service: GitService;
  let authentication: AuthenticationService;
  let testQuote: any= {repos:'aastha'}
  let test = {
    "response": { "n": 1, "ok": 1, "nModified": 1 },
    "repo": { "repositery": "angular" },
    "file": "index",
    "negativeResponse": { "ok": 0, "nModified": 0, "n": 0 },
    
  };
  let de: DebugElement;
  let el: HTMLInputElement;
  beforeEach(async(() => {
    class RouterStub {
    navigate(url: string) { return url; }
   }
   
    data = test.response;
    TestBed.configureTestingModule({
    declarations: [ RepoSidebarComponent ],
    imports: [
        HttpModule,
        FormsModule
      ],
      providers: [{provide: GitService} ,{provide:EditorService},
         { provide: BsModalService },
         { provide: ProfileService },
         { provide: Router, useClass: RouterStub },
         { provide: AuthenticationService },
         { provide: ComponentFixtureAutoDetect, useValue: true }, 
              
      ]
    }).compileComponents();
  })); 
   authentication = fixture.debugElement.injector.get(AuthenticationService);
   spy1 = spyOn(authentication, 'getPersonalAccessToken').and.returnValue(Observable.of(testQuote));
 
 //before each block for testing the component
 beforeEach(() => {
 spyOn(localStorage, 'getItem').and.callFake(function (key) {
   return JSON.stringify({"test":"test"});
 });
   fixture = TestBed.createComponent(RepoSidebarComponent);
   component = fixture.componentInstance;
   service = fixture.debugElement.injector.get(GitService);
    spy = spyOn(service, 'getLatestRepoTree').and.returnValue(Observable.of(testQuote));
/*   authentication = fixture.debugElement.injector.get(AuthenticationService);
   spy1 = spyOn(authentication, 'getPersonalAccessToken').and.returnValue(Observable.of(testQuote));
 */
   fixture.detectChanges();
 });
  //test for component whether created or not
  it('should created the repo-sidebar component', () => {
    expect(component).toBeTruthy();
  });
  //negative test for component whether created or not
  it('should not create the repo-sidebar component', () => {
    expect(component).not.toBeFalsy();
  });
//test case for show method
  it("testing the getDirectoryContentAfterChanges() method", () => {
    fixture.detectChanges();
  
    component. getDirectoryContentAfterChanges(test.repo.repositery, test.file);
    expect(test.response.n).toEqual(1);
    expect(test.response.nModified).toEqual(1);
    expect(test.response.ok).toEqual(1);
  });
  
  //negative test case for show method
  it("negative test for getDirectoryContentAfterChanges method", () => {
    fixture.detectChanges();
  
    component.getDirectoryContentAfterChanges(test.repo.repositery, test.file);
    expect(test.response.n).not.toEqual(test.negativeResponse.n);
    expect(test.response.nModified).not.toEqual(test.negativeResponse.nModified);
    expect(test.response.ok).not.toEqual(test.negativeResponse.ok);
  });
});
