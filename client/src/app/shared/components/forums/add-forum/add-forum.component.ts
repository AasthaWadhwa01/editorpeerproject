import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { CKEditorModule } from 'ng2-ckeditor';

import { forumConfig } from './../../../config/forum.config';
import { ForumService } from '../../../services/forum.service';

@Component({
  selector: 'app-add-forum',
  templateUrl: './add-forum.component.html',
  styleUrls: ['./add-forum.component.css'],
  providers: [ForumService]
})

export class AddForumComponent implements OnInit, AfterViewInit {

  forumConfig = forumConfig;
  ckeditorContent: any;
  date: any;
  userName: any;
  questionTitle: string;
  problemDescription: string;
  tags: string;
  dateCurr: any;
  currentUser: any;
  codeSnippet: string;
  obj: any = {};
  addSnippet: any;
  items: any = [];
  data: any;

  constructor(private forum: ForumService, private router: Router) {

  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userName = this.currentUser.userName;

    this.date = new Date();
    let day = this.date.getDate();
    let month = this.date.getMonth() + 1;
    let year = this.date.getFullYear();
    this.date = day + '/' + month + '/' + year;
  }

  //method to call problemDescriptionConfigEditor
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

    var problemDescriptionConfig = {
      codeSnippet_theme: 'monokai_sublime',
      height: 356,
      removeButtons: 'About'

    };
    CKEDITOR.replace('problemDescription', problemDescriptionConfig);
    CKEDITOR.instances.problemDescription.setData("");
  }

  //method to add post on forum
  insertPost() {
    if (this.questionTitle && CKEDITOR.instances.problemDescription.getData()) {
      this.obj = {
        questionTitle: this.questionTitle,
        codeSnippet: CKEDITOR.instances.addSnippet.getData(),
        problemDescription: CKEDITOR.instances.problemDescription.getData(),
        tags: this.items,
        date: this.date,
        userName: this.userName,
      }

      this.forum.savePost(this.obj).subscribe((res) => {
        if (res) {
          swal({
            timer: 2000,
            title: "Question Added Successfully",
            type: 'success',
            showConfirmButton: false,
          }).then(() => {},
            (dismiss) => {

              if (dismiss === 'timer') {
                //navigate here
                this.router.navigateByUrl('forums');
              }
            });
        }
      })
    } else {
      swal({
        title: '!!OOPS!!',
        html: $('<div>')
          .addClass('some-class')
          .text('!!Question Title & Problem Description Are Mandatory Please Cooperate!!'),
        animation: false,
        customClass: 'animated tada'
      })
    }

  }
  cancel() {
    this.router.navigateByUrl('forums');
  }

}
