import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ForumService } from '../../../services/forum.service';
import swal from 'sweetalert2';
import { forumConfig } from './../../../config/forum.config';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css'],
  providers: [ForumService]
})

export class NewpostComponent implements OnInit, AfterViewInit{
    forumConfig=forumConfig;
    ckeditorContent:any;
    date:any;
    questionTitle:string;
    problemDescription:string;
    tags:string;
    dateCurr:any;
    codeSnippet:string;
    obj:any={};
    addSnippet:any;

  constructor(private forum: ForumService) {}

  ngOnInit() {
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
      removeButtons:forumConfig.NEWPOST.CKEDITOR.REMOVED_BUTTONS,
      removePlugins:forumConfig.NEWPOST.CKEDITOR.REMOVED_PLUGINS,
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
  insertPost(data) {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    let userName=user.userName
    this.obj = {
      questionTitle: this.questionTitle,
      codeSnippet: CKEDITOR.instances.addSnippet.getData(),
      problemDescription: CKEDITOR.instances.problemDescription.getData(),
      tags: this.tags,
      date: this.date,
      userName:userName
    }
    this.forum.savePost(this.obj).subscribe((res) => {

      if (res) {
        console.log(res)
        swal({ //alert message for success
          timer: 2200,
          title: "Posted Successfully",
          text: "",
          type: 'success',
          showConfirmButton: false,
        })
      } else {
        swal({ //alert message for error
          timer: 2200,
          title: "Error occured",
          text: "",
          type: 'error',
          showConfirmButton: false,
        })
      }
    })
  }
}
