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
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';

import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';

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
import { SpeechRecognitionService } from './shared/services/speech-recognition.service';

import { AuthoriseGuard } from './shared/services/authorise.guard';
import { SnippetComponent } from './shared/components/snippet/snippet.component';
import { SnippetService } from './shared/services/snippet.service';

//import { AuthoriseGuard } from './shared/services/authorise.guard';
import { CoderunnerService } from './shared/services/coderunner.service';
import { ChatHomeComponent } from './shared/components/chat/chat-home/chat-home.component';

import { ErrorpageComponent } from './shared/components/errorpage/errorpage.component';
import { ForumsComponent } from './shared/components/forums/forums.component';
import { AddForumComponent } from './shared/components/forums/add-forum/add-forum.component';
import { ViewForumComponent } from './shared/components/forums/view-forum/view-forum.component';

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
    // component: SnippetComponent,
    children:[
    {
      path:'',
      component: SnippetComponent
    }]
  },
  {
    path: 'main',
    component: MainComponent,
    /* canActivate: [AuthoriseGuard]*/
  },
   {
    // path: 'forums/:value',
    path: 'forums',
    // component: ForumsComponent,
    children:[
    {
      path:'',
      component: ForumsComponent
    },{
      path:'add',
      component: AddForumComponent
    },
    {
      path:'view/:value',
      component: ViewForumComponent
    }]
    // canActivate: [AuthoriseGuard]
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
    WebeditorComponent,
    AuthenticateComponent,
    AudioChatComponent,
    VideoChatComponent,
    SnippetComponent,
    ChatHomeComponent,
    ErrorpageComponent,
    ForumsComponent,
    AddForumComponent,
    ViewForumComponent    
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
    CommonModule,
    LoadingModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.wanderingCubes,
      backdropBackgroundColour: 'rgba(255,255,0)',
      backdropBorderRadius: '100px',
      primaryColour: '#ffc107',
      secondaryColour: '#ffc107',
      tertiaryColour: '#ffc107'}),
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forRoot(apiRoutes, { useHash: true })
  ],
  providers: [GitService, EditorService, ChatService, ForumService, AuthenticationService, ProfileService, CoderunnerService, ChatService, HttpService, SocketService, SnippetService,SpeechRecognitionService,AuthoriseGuard],

  bootstrap: [AppComponent]
})

export class AppModule {}
