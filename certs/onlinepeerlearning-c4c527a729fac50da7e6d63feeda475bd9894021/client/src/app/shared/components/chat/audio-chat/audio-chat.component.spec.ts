import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioChatComponent } from './audio-chat.component';

describe('AudioChatComponent', () => {
  let component: AudioChatComponent;
  let fixture: ComponentFixture<AudioChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
