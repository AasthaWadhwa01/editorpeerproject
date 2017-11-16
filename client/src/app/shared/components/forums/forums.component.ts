import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router'
import { MatIconRegistry } from '@angular/material';
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import swal from 'sweetalert2';

//Reactive Extensions Library
import 'rxjs/Rx';

//Custom Files Imports
import { ForumService } from '../../services/forum.service';
import { forumConfig } from './../../config/forum.config';

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.css']
})
export class ForumsComponent implements OnInit {

  likes = 0;
  likeflag = false;
  dislikeflag = false;
  dislikes = 0;
  data: any = [];
  currentUser: any;
  userName: any;
  userId: any = {};
  answer: any = {};
  tags: any = [];
  noofanswer: number = 0;
  answerlength: any = [];
  pageNext: number[] = [];
  forumConfig = forumConfig;

  constructor(private forum: ForumService, private router: Router) {}

  // method to show posts on forum
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userName = this.currentUser.userName;
    this.viewPost();
  }

  //method call posts from service
  viewPost() {
    this.forum.getPost().subscribe((res) => {
      this.data = res.data;
    })
  }

  //method for search 
  getDetails(searchTerm: any) {
    if (searchTerm.value !== "") {
      this.forum.searchEntries(searchTerm.value)
        .subscribe(res => {
          console.log(res);
          this.data = res.data;
        });
    } else {
      swal({
        title: '!!OOPS!!',
        html: $('<div>')
          .addClass('some-class')
          .text('Enter Something First!!'),
        animation: false,
        customClass: 'animated tada'
      })
    }

  }
  //method to navigate to questions detail
  getPostDetail(value): any {
    this.router.navigate(['forums', 'view', value])
  }

  //method for likes
  like(value): any {
    this.userId = {
      userId: this.userName,
    }
    this.forum.updateLike(value, this.userId)
      .subscribe(res => {
        this.viewPost();
      })
  }

  //method for dislikes
  dislike(value): any {
    this.userId = {
      userId: this.userName,
    }
    this.forum.updateDislike(value, this.userId)
      .subscribe(res => {
        this.viewPost();
      })
  }
}
