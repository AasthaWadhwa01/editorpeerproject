import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'
import { RouterModule, Router, ActivatedRoute } from '@angular/router'
import * as CKEditorModule from 'ng2-ckeditor';
import { HttpModule } from '@angular/http'

import { SnippetService } from '../../../shared/services/snippet.service';
import { SnippetComponent } from './snippet.component';

describe('SnippetComponent', () => {
  let component: SnippetComponent;
  let fixture: ComponentFixture<SnippetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnippetComponent ],
      imports : [FormsModule, RouterModule,CKEditorModule, HttpModule],
      providers : [SnippetService, {provide: Router},{provide: ActivatedRoute}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
