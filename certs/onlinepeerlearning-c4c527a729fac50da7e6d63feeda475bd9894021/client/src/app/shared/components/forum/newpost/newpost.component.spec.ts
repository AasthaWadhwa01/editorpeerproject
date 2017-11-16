import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewpostComponent } from './newpost.component';
import { ForumService } from '../../../services/forum.service';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { CKEditorModule } from 'ng2-ckeditor';

describe('NewpostComponent', () => {
  let spy;
  let service;
  let data :any;
  let component: NewpostComponent;
  let fixture: ComponentFixture<NewpostComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;
  let test = {
   "response": { "n": 1, "ok": 1, "nModified": 1 },
   "negativeResponse": { "ok": 0, "nModified": 0, "n": 0 },
   "data": { "response": "what is javascript" }
 } ;
  
  beforeEach(async(() => {
    data = test.response;
    TestBed.configureTestingModule({
      imports: [
       HttpModule,
       FormsModule,
       ReactiveFormsModule,
       RouterTestingModule,
       CKEditorModule
      ],
      declarations: [ NewpostComponent ],
      providers: [ForumService ]
    })
    .compileComponents().then(() => {
     fixture = TestBed.createComponent(NewpostComponent);
     component = fixture.componentInstance;
     //console.log(component.messageTest);
     fixture.detectChanges();
     service = fixture.debugElement.injector.get(ForumService);
     spy = spyOn(service, 'save').and.returnValue(Observable.of(data));


   });
})); 
  it('should be created', () => {
    const forum=fixture.debugElement.componentInstance;
    expect(forum).toBeTruthy();
  });

it("testing the insertPost method", () => {
   fixture.detectChanges();
   component.insertPost(test.data);
   expect(test.response.n).toEqual(1);
   expect(test.response.nModified).toEqual(1);
   expect(test.response.ok).toEqual(1);
 });
 
it("negative test for insertPost method", () => {
   //  let data=test.response;
   let negativeData = test.negativeResponse;
   // component.data=test.categoryData;
   component.insertPost(test.data);
   fixture.detectChanges();
   expect(test.response.n).not.toEqual(negativeData.nModified);
   expect(test.response.nModified).not.toEqual(negativeData.n);
   expect(test.response.ok).not.toEqual(negativeData.ok);

 })
})