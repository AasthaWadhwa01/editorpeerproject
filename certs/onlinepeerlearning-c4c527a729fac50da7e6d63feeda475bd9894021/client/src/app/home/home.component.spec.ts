import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import {AuthenticationService} from '../shared/services/authentication.service'
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterLinkWithHref } from '@angular/router';
import {HttpModule} from '@angular/http'

import { HomeComponent } from './home.component';
import { homeConfig } from '../shared/config/home.config';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let button1de:  DebugElement;
  let button1el:  HTMLElement;

  let button2de:  DebugElement;
  let button2el:  HTMLElement;

  let button3de:  DebugElement;
  let button3el:  HTMLElement;

    let buttonSubtitleDe:  DebugElement;
  let buttonSubtitleEl:  HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      
      imports:[RouterTestingModule, HttpModule],       
      declarations: [ HomeComponent ],
      providers: [{provide: BsModalService}, AuthenticationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    

    button1de = fixture.debugElement.query(By.css('.buttonTest1'));
    button1el = button1de.nativeElement;

    button2de = fixture.debugElement.query(By.css('.buttonTest2'));
    button2el = button2de.nativeElement;

    button3de = fixture.debugElement.query(By.css('.buttonTest3'));
    button3el = button3de.nativeElement;

        buttonSubtitleDe = fixture.debugElement.query(By.css('.buttonTest3'));
    buttonSubtitleEl = buttonSubtitleDe.nativeElement;
    fixture.detectChanges();
  });

  it('home component should be created', () => {
    expect(component).toBeTruthy();
  });

  it('button 1 should contain title', () => {
    fixture.detectChanges();
    expect(button1el.textContent).toContain(homeConfig.BUTTON1);
  });

  it('button 2 should contain title', () => {
    fixture.detectChanges();
    expect(button2el.textContent).toContain(homeConfig.BUTTON2);
  });

    it('button 3 should contain title', () => {
    fixture.detectChanges();
    expect(button3el.textContent).toContain(homeConfig.BUTTON3);
  });

        it('button 3 subtitle should contain title', () => {
    fixture.detectChanges();
    expect(buttonSubtitleEl.textContent).toContain(homeConfig.BUTTONSUBTITLE);
  });
});
