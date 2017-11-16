import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router'
import { MatIconRegistry } from '@angular/material';
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import 'rxjs/Rx';

import { ForumService } from '../../../services/forum.service';
import { forumConfig } from './../../../config/forum.config';

@Component({
  selector: 'app-viewpost',
  templateUrl: './viewpost.component.html',
  styleUrls: ['./viewpost.component.css'],
  providers: [ForumService]
})

export class ViewpostComponent implements OnInit {
  likes = 0;
  likeflag = false;
  dislikeflag = false;
  dislikes = 0;
  data: any = {};
  answer: any = {};
  noofanswer: number = 0;
  answerlength: any = [];
  p: number[] = [];
  forumConfig=forumConfig;
  public modalRef: BsModalRef;
  public configModal = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false
  };

  constructor(private forum: ForumService, private router: Router, private modalService: BsModalService) {

  }
  
  // method to show posts on forum
  ngOnInit() {
    this.viewPost();
  }
  //open modal window 
  public clickHelpModal(template: TemplateRef < any > ) {
    this.modalRef = this.modalService.show(template, Object.assign({}, this.configModal, { class: 'gray modal-lg' }));
  }
  //method call posts from service
  viewPost() {
    this.forum.getPost().subscribe((data1) => {
      this.data = data1;
      console.log(this.data);
    })
  }
  //method for search 
  getDetails(searchTerm: any) {
    this.forum.searchEntries(searchTerm.value)
      .subscribe(res => {
        this.data = res;
      });
  }
  //method to navigate to questions detail
  getPostDetail(value): any {
    this.router.navigate(['/forums' ,value])
  }
  //method for likes
  like() {
    if (this.likeflag == false) {
      if (this.dislikeflag == true) {
        this.likes++;
        this.likeflag = true;
        this.dislikes--;
        this.dislikeflag = false;
      } else {
        this.likes++;
        this.likeflag = true;
      }
    } else {
      this.likes--;
      this.likeflag = false;
    }
  }
  //method for dislikes
  dislike() {

    if (this.dislikeflag == false) {
      if (this.likeflag == true) {
        this.dislikes++;
        this.dislikeflag = true;
        this.likes--;
        this.likeflag = false;
      } else {
        this.dislikes++;
        this.dislikeflag = true;
      }
    } else {
      this.dislikes--;
      this.dislikeflag = false;
    }
  }
  //method to navigate to answers
  showAnswers(value) {
    this.router.navigate(['/answers', value])

  }

}
