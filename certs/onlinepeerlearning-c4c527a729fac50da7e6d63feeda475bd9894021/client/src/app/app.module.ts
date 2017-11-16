import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';
import { MatTabsModule } from '@angular/material';
import { MatTabGroup } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { ModalModule } from 'ngx-bootstrap';
import { AceEditorModule } from 'ng2-ace-editor'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { MatInputModule } from '@angular/material';
import { MatRadioModule } from '@angular/material';
import { TagInputModule } from 'ngx-chips';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EditorComponent } from './shared/components/editor/editor.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { RepoSidebarComponent } from './shared/components/repo-sidebar/repo-sidebar.component';

import { FooterComponent } from './shared/components/footer/footer.component';
import { GitService } from './shared/services/git.service'
import { EditorService } from './shared/services/editor.service';
import { SocketService } from './shared/services/chatservices/socket.service';
import { HttpService } from './shared/services/chatservices/http.service';
import { ChatService } from './shared/services/chatservices/chat.service';

import { MainComponent } from './main/main.component';
import { ForumComponent } from './shared/components/forum/forum.component';
import { ViewpostComponent } from './shared/components/forum/viewpost/viewpost.component';
import { DetailpostComponent } from './shared/components/forum/detailpost/detailpost.component';
import { NewpostComponent } from './shared/components/forum/newpost/newpost.component';
import { ForumService } from './shared/services/forum.service';
import { CKEditorModule } from 'ng2-ckeditor';

import { WebeditorComponent } from './shared/components/webeditor/webeditor.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TruncateModule } from 'ng2-truncate';
import { AudioChatComponent } from './shared/components/chat/audio-chat/audio-chat.component';
import { VideoChatComponent } from './shared/components/chat/video-chat/video-chat.component';
import { AuthenticationService } from './shared/services/authentication.service'
import { ProfileService } from './shared/services/profile.service';

import { AuthoriseGuard } from './shared/services/authorise.guard';
import { SnippetComponent } from './shared/components/snippet/snippet.component';
import { SnippetService } from './shared/services/snippet.service';

//import { AuthoriseGuard } from './shared/services/authorise.guard';
import { CoderunnerService } from './shared/services/coderunner.service';
import { AnswersComponent } from './shared/components/forum/answers/answers.component';
import { ChatHomeComponent } from './shared/components/chat/chat-home/chat-home.component';

import { ErrorpageComponent } from './shared/components/errorpage/errorpage.component';

let apiRoutes: Routes = [{
    path: '',
    component: HomeComponent
  },
  {
    path: 'error',
    component: ErrorpageComponent
  },
  {
    path: 'snippets',
    component: SnippetComponent
  },
  {
    path: 'main',
    component: MainComponent,
    /* canActivate: [AuthoriseGuard]*/
  },
  {
    path: 'view',
    component: ViewpostComponent,
    // canActivate: [AuthoriseGuard]
  },
  {
    path: 'forums/:value',
    component: DetailpostComponent,
    // canActivate: [AuthoriseGuard]
  },
  {
    path: 'add',
    component: NewpostComponent,
  },

  {
    path: 'profile',
    component: ProfileComponent,
    //canActivate: [AuthoriseGuard]
  },
  {
    path: 'auth/:userId/:token',
    component: AuthenticateComponent,
    //canActivate: [AuthoriseGuard]
  },
  {
    path: '**',
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditorComponent,
    NavbarComponent,
    RepoSidebarComponent,
    FooterComponent,
    WebeditorComponent,
    ProfileComponent,
    MainComponent,
    ViewpostComponent,
    DetailpostComponent,
    NewpostComponent,
    ForumComponent,
    WebeditorComponent,
    AuthenticateComponent,
    AudioChatComponent,
    VideoChatComponent,
    SnippetComponent,
    AnswersComponent,
    ChatHomeComponent,
    ErrorpageComponent
  ],

  imports: [
    BrowserModule,
    NgxPaginationModule,
    HttpModule,
    FormsModule,
    CKEditorModule,
    BrowserAnimationsModule,
    AceEditorModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    TruncateModule,
    TagInputModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatFormFieldModule,
    ModalModule.forRoot(),
    RouterModule.forRoot(apiRoutes, { useHash: true })
  ],
  providers: [GitService, EditorService, ChatService, ForumService, AuthenticationService, ProfileService, CoderunnerService, ChatService, HttpService, SocketService, SnippetService],

  bootstrap: [AppComponent]
})

export class AppModule {}
