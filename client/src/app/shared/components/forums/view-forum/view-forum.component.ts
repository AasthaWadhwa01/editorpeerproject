//@angular Files Imports
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ParamMap } from '@angular/router';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import swal from 'sweetalert2';
//Reactive Extensions Library
import 'rxjs/add/operator/switchMap';
//Custom Files Imports
import { ForumService } from '../../../services/forum.service';
import { AuthoriseGuard } from '../../../services/authorise.guard';
import { forumConfig } from './../../../config/forum.config';
import * as $ from 'jquery'

@Component({
  selector: 'app-view-forum',
  templateUrl: './view-forum.component.html',
  styleUrls: ['./view-forum.component.css']
})

export class ViewForumComponent implements OnInit {
  constructor(private forum: ForumService, private authorise: AuthoriseGuard, private router: ActivatedRoute, private route: Router) {

  }

  answerText: string;
  addSnippet: any;
  name: string;
  editor: string;
  obj: any = {};
  codeSnippet: string;
  data: any = {};
  solutions: any = [];
  currentUser: any;
  errors: string;
  answer: string = "";
  questionTitle: string = "";
  userId: any;
  userName: any;
  date: any;
  forumConfig = forumConfig;
  public check: boolean;

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userName = this.currentUser.userName;
    this.date = new Date();
    let day = this.date.getDate();
    let month = this.date.getMonth() + 1;
    let year = this.date.getFullYear();
    this.date = day + '/' + month + '/' + year;

    // getPostById method get the post by searching its id
    this.viewQuestionDetail();
    this.check = this.authorise.canActivate();
  }

  //view question detail
  viewQuestionDetail() {
    this.router.paramMap
      .switchMap((params: ParamMap) => this.forum.getPostById(this.router.snapshot.params['value']))
      .subscribe((res) => {
        this.data = res.data;
        this.solutions = this.data.answers;
      })
  }

  //method to load editor to postAnswer
  ngAfterViewInit() {
    var configuration = {
      extraPlugins: 'codesnippet',
      codeSnippet_theme: 'monokai_sublime',
      height: 356,
      removeButtons: forumConfig.NEWPOST.CKEDITOR.REMOVED_BUTTONS,
      removePlugins: forumConfig.NEWPOST.CKEDITOR.REMOVED_PLUGINS,
    };
    CKEDITOR.replace('addSnippet', configuration);
    CKEDITOR.instances.addSnippet.setData("");

    var answerTextConfig = {
      codeSnippet_theme: 'monokai_sublime',
      height: 356,
      removeButtons: 'About'
    };

    CKEDITOR.replace('answerText', answerTextConfig);
    CKEDITOR.instances.answerText.setData("");
  }

  //method to postAnswer
  postAnswer() {
    this.obj = {
      username: this.userName,
      answer: CKEDITOR.instances.answerText.getData(),
      codeSnippet: CKEDITOR.instances.addSnippet.getData(),
      date: this.date
    }
    this.forum.saveAnswer(this.data._id, this.obj)
      .subscribe(res => {
        swal("Successfully added answer", "", "success");
        this.viewQuestionDetail();
        CKEDITOR.instances.answerText.setData("");
        CKEDITOR.instances.addSnippet.setData("");
      })
  }
}
