import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AceEditorModule } from 'ng2-ace-editor';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { Http,HttpModule  } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By} from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { BsModalService } from 'ngx-bootstrap/modal';

import { GitService as gitService } from '../../services/git.service';
import { AuthenticationService as authenticationService } from '../../services/authentication.service';
import { CoderunnerService as coderunnerservice } from '../../services/coderunner.service';
import { SnippetService as snippetservice } from '../../../shared/services/snippet.service';
import { EditorComponent } from './editor.component';

describe('EditorComponent', () => {
 let component: EditorComponent;
 let fixture: ComponentFixture<EditorComponent>;
 let de,deButton,deUpdateFile,deUpdate,deDltFile:      DebugElement;
 let el,elButton,elUpdateFile,elUpdate,elDltFile:      HTMLElement;
 let spy;
 let service: gitService;
 let openmodal:any=true;
 let fileName:any='angular';
 let commitMsg:any='testing';
 let test = {
   "url":"https://192.168.252.211:8080/#/main&togetherjs=FG27TBNhvS",
   "openmodal": "true",
   "file": "index",
   "repoName":"angular",
   "commitMsg":"testing",
   "response": { "n": 1, "ok": 1, "nModified": 1 },
   "negativeResponse": { "ok": 0, "nModified": 0, "n": 0 },    
 };
 
 beforeEach(async(() => {
   TestBed.configureTestingModule({
    imports: [
    AceEditorModule,
    LoadingModule,
    HttpModule,
    FormsModule
    ],
     declarations: [ EditorComponent ],
     providers: [
     {provide: BsModalService},
     {provide: gitService,useValue: service},
     {provide: authenticationService},
     {provide: coderunnerservice},
     {provide: snippetservice}/*,
     {provide: NgZone}*/
     ]
   })
   .compileComponents();
 }));
 
 beforeEach(() => {
   fixture = TestBed.createComponent(EditorComponent);
   component = fixture.componentInstance;
   de = fixture.debugElement.query(By.css('.file'));
    el = de.nativeElement;
    deButton = fixture.debugElement.query(By.css('.createbtn'));
    elButton = deButton.nativeElement;
     deUpdateFile = fixture.debugElement.query(By.css('.update'));
    elUpdateFile = deUpdateFile.nativeElement;
    deUpdate = fixture.debugElement.query(By.css('.updatebtn'));
    elUpdate = deUpdate.nativeElement;
    deDltFile = fixture.debugElement.query(By.css('.filedlt'));
    elDltFile = deDltFile.nativeElement;
 });
 it('Editor component should be created', () => {
   expect(component).toBeTruthy();
 });
 it('should display creating file in the current repository:', () => {
 fixture.detectChanges()
  expect(el.textContent).toContain(component.config.editor.CREATINGFILE);
});
 it('should display Create Button', () => {
 fixture.detectChanges()
  expect(elButton.textContent).toContain(component.config.editor.CREATEBTN);
});
  it('should display updating file in the current repository:', () => {
 fixture.detectChanges()
  expect(elUpdateFile.textContent).toContain(component.config.editor.UPDATINGFILE);
});
   it('should display Update Button', () => {
 fixture.detectChanges()
  expect(elUpdate.textContent).toContain(component.config.editor.UPDATEBTN);
});
    it('should display deleting file in the current repository:', () => {
 fixture.detectChanges()
  expect(elDltFile.textContent).toContain(component.config.editor.DELETINGFILE);
});
it("testing the openmodal method", () => {
  fixture.detectChanges();
  component.openModals(openmodal);
  expect(test.openmodal).toEqual('true');
});
 it("testing the createFile method", () => {
   fixture.detectChanges();
   spy = spyOn(service, 'createFile').and.returnValue(Observable.of(test.response));
   component.createFile(test.repoName,test.commitMsg);
   expect(component.data.n).toEqual(1);
   expect(component.data.nModified).toEqual(1);
   expect(component.data.ok).toEqual(1);
 });
/*it("testing the calledFromOutside method", () => {
  fixture.detectChanges();
  component.calledFromOutside(test.url);
  expect(test.code.url).toEqual('https://192.168.252.211:8080/#/main&togetherjs=FG27TBNhvS');
});*/
});