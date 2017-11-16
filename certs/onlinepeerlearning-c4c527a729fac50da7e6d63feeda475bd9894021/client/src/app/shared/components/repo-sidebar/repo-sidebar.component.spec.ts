import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoSidebarComponent } from './repo-sidebar.component';

describe('RepoSidebarComponent', () => {
  let component: RepoSidebarComponent;
  let fixture: ComponentFixture<RepoSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepoSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
