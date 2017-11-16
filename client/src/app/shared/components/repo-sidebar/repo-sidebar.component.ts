import { Component, OnInit, Output, Input, EventEmitter, TemplateRef, OnChanges, SimpleChange } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import * as $ from 'jquery';
import swal from 'sweetalert2'
/*import third party libraries*/
import { EditorService } from '../../services/editor.service';
import { GitService } from '../../services/git.service';
import { config } from './../../config/repoSidebar.config';
import { ProfileService } from '../../services/profile.service'
import { AuthenticationService } from '../../services/authentication.service'
@Component({
  selector: 'app-repo-sidebar',
  templateUrl: './repo-sidebar.component.html',
  styleUrls: ['./repo-sidebar.component.css']
})
export class RepoSidebarComponent implements OnInit, OnChanges {

  @Input() mode: String;
  @Input() githubUser: any;
  @Input() repoNameForFileListUpdate: any;

  config = config;
  /*declaring all the required variables*/
  selectedValue: any;
  reponamed: any;
  filenamed: any;
  data: any;
  fileData: any;
  selectedfile: any;
  url: any = "";
  text: any = config.repoSidebar.ENTER_CODE;
  public modalRef: BsModalRef;
  value: any;
  accessToken: any;
  data1: any;
  currentUser: any;
  isTree: Boolean = true;
  public emptyRepo: String;
  extension: any;
  confirm: any;
  folder: any;
  filename: string
  folderDetails: Array < string >= [];

  @Output() content = new EventEmitter < any > ();
  @Output() repoName = new EventEmitter < any > ();
  @Output() fileName = new EventEmitter < any > ();
  @Output() editorMode = new EventEmitter < any > ();

  @Output() fileExtension = new EventEmitter < any > ();

  constructor(
    private editorService: EditorService,
    private gitService: GitService,
    private modalService: BsModalService,
    private profileService: ProfileService,
    private authenticationService: AuthenticationService
  ) {

  }

  //repoName on select option
  ngOnChanges(changes: {
    [property: string]: SimpleChange
  }) {
    if (this.repoNameForFileListUpdate) {
      this.getDirectoryContentAfterChanges(this.repoNameForFileListUpdate.repoName, this.repoNameForFileListUpdate.sha);
    }
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    this.authenticationService.getPersonalAccessToken(this.currentUser.userId)
      .subscribe((res) => {
        this.authenticationService.pacToken = res.data.accessToken;
      })
  }

  //open modal of CRUD repo 
  public openRepoModal(template: TemplateRef < any > ) {
    this.modalRef = this.modalService.show(template);
  }
  public openTokenModal(template: TemplateRef < any > ) {
    this.modalRef = this.modalService.show(template);
  }

  //get folder Contents
  getDirectoryContent() {
    this.reponamed = this.selectedValue;
    this.gitService.getFolderContents(this.reponamed)
      .subscribe(repo => {
        this.folderDetails = repo;
        this.folderDetails = this.folderDetails.sort(this.sortBy("type"));
        this.repoName.emit(this.reponamed);
      })
  }

  //show folder after repoName
  getDirectoryContentAfterChanges(repoName, SHA) {
    this.gitService.getLatestRepoTree(repoName, SHA)
      .subscribe((data) => {
        this.folderDetails = data;
        this.folderDetails = this.folderDetails.sort(this.sortBy("type"));
        this.repoName.emit(this.reponamed);
      });
  }

  //folder contents
  getFolderInfo($event: any) {
    let eleId = $event.target.id;
    if (eleId) {

      if ($('#' + eleId + ' ol')[0] || $('#' + eleId + ' li')[0]) {
        $('#' + eleId + ' ol').remove();
        $('#' + eleId + ' li').remove();
        $event.target.firstElementChild.removeAttribute('class');
        $event.target.firstElementChild.setAttribute('class', 'fa fa-caret-right');
      } else {
        $event.target.firstElementChild.removeAttribute('class');
        $event.target.firstElementChild.setAttribute('class', 'fa fa-caret-down');
        let folderValue = $event.target.innerText
        let path = $event.target.dataset.path;
        this.gitService.openFolder(path, this.reponamed).subscribe(folder => {
          folder = folder.sort(this.sortBy("type"));
          folder.map((ele, index) => {
            if (ele.type === 'dir') {
              return this.appendDir(ele.name, eleId, index, ele.path);
            } else if (ele.type === 'file') {
              return this.appendFile(ele.name, eleId, index, ele.path);
            }
          })
        })
      }
    } else {
      this.getFile($event);
    }
  }
  //tree structure
  //append folder
  appendDir(name, id, index, path) {
    let margin = this.getMargin(id, 'dir');
    $('#' + id).append(`<ol id= ${name}${index} data-path=${path} (click)="getInfo($event)"
      style="list-style-type:none; padding-left: 0px; margin-left:${margin};">
      <i class="fa fa-caret-right" aria-hidden="true"></i>&nbsp;<i class="fa fa-folder-open" aria-hidden="true"></i> &nbsp; ${name} </ol>`);
  }
  //append file
  appendFile(name, id, index, path) {
    let margin = this.getMargin(id, 'file');
    $('#' + id).append(`<li (click)="getFile($event)" data-path=${path} data-filename=${name}
      style="list-style-type:none; margin-left:${margin}">
      <i class="fa fa-file" aria-hidden="true"></i> &nbsp; ${name}
      </li>`);
  }

  //show file data on editor
  getFile($event) {
    this.filename = $event.target.dataset.filename;
    let path = $event.target.dataset.path;
    this.gitService.getFileData(path, this.reponamed).subscribe(data => {
      this.extension = this.filename.split('.').pop();
      this.folder = this.filename.split('.');
      if (this.folder.length > 1) {
        if (this.extension !== "js" && this.extension !== "html" && this.extension !== "css") {
          swal({
            timer: 8500,
            text: config.repoSidebar.NO_EXT,
            type: 'error',
            showConfirmButton: true,
          }).catch(swal.noop);
        } else if (this.mode === "javascript" && this.extension !== "js" && this.extension !== "md" && this.extension !== "json" && this.extension !== "gitignore" && this.extension !== "ts" && this.extension !== "txt" && this.extension !== "jpg" && this.extension !== "png") {
          swal({
            text: config.repoSidebar.HTML_MODE,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK',
            cancelButtonText: 'No, cancel!',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger'
          }).then(() => {
            this.mode = "html"
            this.editorMode.emit(this.mode);
          })
        } else if (this.mode === "javascript" && this.extension == "js") {
          swal({
            text: config.repoSidebar.ASK_MODE,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel!',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger'
          }).then(() => {
            this.mode = "javascript"
            this.editorMode.emit(this.mode);
          }, ((dismiss) => {
            // dismiss can be 'cancel', 'overlay',
            if (dismiss === 'cancel') {
              this.mode = "html"
              this.editorMode.emit(this.mode);
            }
          }))
        } else if (this.mode === "html" && this.extension !== "html" && this.extension !== "css" && this.extension !== "md" && this.extension !== "json" && this.extension !== "gitignore" && this.extension !== "ts" && this.extension !== "txt" && this.extension !== "jpg" && this.extension !== "png") {
          swal({
            text: config.repoSidebar.JAVASCRIPT_MODE,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK',
            cancelButtonText: 'No, cancel!',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger'
          }).then(() => {
            this.mode = "javascript"
            this.editorMode.emit(this.mode);
          })
        }
      }
      this.fileData = data;
      this.text = atob(data.content);
      this.content.emit(this.text);
      this.repoName.emit(this.reponamed);
      this.fileName.emit(this.filename);
      this.fileExtension.emit(this.extension);
    })
  }

  //calulate margin based on parent element
  getMargin(id: string, type: string) {
    let prtMrg = $('#' + id)[0]['parentElement'].style.marginLeft;
    let margin = (prtMrg) ? prtMrg.substr(0, prtMrg.length - 2) : 0;
    if (type === 'file') {
      return +14 + 'px';
    }
    return +12 + 'px';
  }

  // for sorting any string keys
  sortBy(prop) {
    return (a, b) => {
      return (a[prop] > b[prop]) ? 1 : (a[prop] < b[prop]) ? -1 : 0;
    }
  }
}
