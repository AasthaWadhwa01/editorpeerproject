import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebeditorComponent } from './webeditor.component';

describe('WebeditorComponent', () => {
  let component: WebeditorComponent;
  let fixture: ComponentFixture<WebeditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebeditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
