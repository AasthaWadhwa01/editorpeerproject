import { Component, OnInit, Input, NgZone, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import * as $ from 'jquery';
import swal from 'sweetalert2';
import { config } from '../shared/config/config';
import { GitService } from '../shared/services/git.service'
import { AuthenticationService } from '../shared/services/authentication.service';
// import { Router, ActivatedRoute } from '@angular/router';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { ProfileService } from '../shared/services/profile.service';
import { mainConfig } from '../shared/config/main.config';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  content: any = "";
  reponame: any;
  filenamed: any;
  languages: any = [];
  mode: any = 'html';
  githubUser: any;
  selectedValue: any = "html";
  data: any;
  fileData: any;
  selectedfile: any;
  url: any = "";
  text: any = "enter code here";
  windowRef: any;
  methodToExport: any;
  link: string = '';
  value: any;
  accessToken: any;
  public modalRef: BsModalRef;
  currentUser: any;
  user: {}
  config = mainConfig;
  personalAccessToken: string;
  repoNameForUpdate:string;
  loading : boolean;
  extension: any;

  constructor(private gitService: GitService, private zone: NgZone, private modalService: BsModalService,
    private authenticationService: AuthenticationService, private router: Router, private profileService: ProfileService,private activatedRoute: ActivatedRoute) {
    this.methodToExport = this.calledFromOutside;
    window['angularComponentRef'] = { component: this, zone: zone };
  }

  public openModal(template: TemplateRef < any > ) {
    this.modalRef = this.modalService.show(template);
  }

  calledFromOutside(url: string) {
    this.zone.run(() => { 
      this.link = url;
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      params => {
        let mode = params['mode'];
             if(mode) {
          this.mode=mode;
        } else {
        this.mode = "html"
        }
        });

    this.languages = config.language;
   /* this.mode = "html"*/
    this.gitService.getRepos()
      .subscribe(repos => {
        this.githubUser = repos;
    })
  }

  reposearch(selected) {
    this.reponame = selected;
    this.gitService.getTree(selected)
      .subscribe(data => {
        this.data = data

      })
  }

  showFile(reponame, filename) {
    this.gitService.openFolder(reponame, filename)
      .subscribe(
        data => {
          this.data = data
          this.url = this.url + filename + "/"
        }, err => {
          this.show(reponame, this.url + filename)
          this.url = "";

        })
  }

  show(reponame, filename) {
    this.reponame = reponame;
    this.filenamed = filename;

    this.gitService.getFile(reponame, filename)
      .subscribe(data => {
        this.fileData = data;
        this.text = this.fileData._body;
        this.content = this.text;
      })
  }

  changeMode() {
    this.mode = this.selectedValue;
    this.router.navigate([], { queryParams:{ mode:this.mode }});
  }

  getcontent(text) {
    this.content = text;
  }

  getfilename(filename) {
    this.filenamed = filename;
  }

  getreponame(reponame) {
    this.reponame = reponame;
  }

  getMode(editorMode) {
    this.selectedValue = editorMode;
    this.changeMode();
  }

  getRepoNameForFileUpdate(repoNameForFileUpdate){
    this.repoNameForUpdate = repoNameForFileUpdate
  }

  getFileExtension(fileExtension){
    debugger
    this.extension = fileExtension
  }

  //method for logout
  logout() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    let userId = user.userId;
    user = {
      userId: userId
    }
    this.authenticationService.logoutEditor(user).subscribe((data1) => {
      if (data1.status == 200) {
        swal({
          timer: 2500,
          title: "Logged Out Successfully",
          text: "",
          type: 'success',
          showConfirmButton: false,
        }).catch(swal.noop);
      }
      this.router.navigate(["/"]);
      localStorage.removeItem('currentUser');
    })
  }

generateToken(form){
  this.loading=true;
  this.createAccessToken(form.value.pass,form.value.tokenName);
  form.reset();
}

  //method generate personal access token for new user
  createAccessToken(password, tokenName) {
    let cred = {
      "scopes": [
        "repo"
      ],
      "note": tokenName
    }
    this.gitService.createToken(cred, password)
      .subscribe(data => {
        this.loading=false;
        if (data) {
          swal({
            timer: 2500,
            title: "Personal Access Token Successfully created",
            text: "",
            type: 'success',
            showConfirmButton: false,
          }).catch(swal.noop);
        } else {
          this.loading=false;
          swal({
            timer: 2500,
            title: "Personal Access Token is not created",
            text: "",
            type: 'error',
            showConfirmButton: false,
          }).catch(swal.noop);
        }
        this.accessToken = data.token;
        this.authenticationService.pacToken = data.token;
        this.storeToken(this.accessToken)
      })
  }

  //method to store personal access token into database
  storeToken(token) {
    let accessToken = {
      "token": token
    }
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let userId = currentUser.userId;
    this.profileService.storeAccessToken(userId, accessToken)
      .subscribe(response => {})
  }

//method to create new repository
createNewRepo(form){
  if(this.authenticationService.pacToken==null){
    swal({
   timer: 8500,
   title: mainConfig.PACMSG,
   text:  "",
   type: 'error',
   showConfirmButton: true,
 }).catch(swal.noop);
  }
  else{
    this.loading=true;
  this.createRepo(form.value.repositoryName,form.value.description);
}
  form.reset();
}

 //method for creating new repository
 createRepo(name, desc) {
   let repoName = {
     "name": name,
     "description": desc,
     "homepage": "https://github.com",
     "private": false,
     "auto_init": true,
     "has_issues": false,
     "has_projects": false,
     "has_wiki": false
   }

 this.gitService.createRepos(repoName)
     .subscribe(data => {
       this.loading=false;
       if (data) {
         this.githubUser.push(data);
         swal({
           timer: 2500,
           title: mainConfig.REPOCREATE,
           text:  "",
           type:  'success',
           showConfirmButton: false,
       }).catch(swal.noop);
     }

      else {
        this.loading=false;
             swal({
         timer: 2500,
         title: mainConfig.REPONOTCREATE,
         text:  "",
         type: 'error',
         showConfirmButton: false,
       }).catch(swal.noop);
           }
     })
}
}


