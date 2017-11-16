import { Component, EventEmitter, Output, ViewChild, OnInit, Input, TemplateRef } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { config } from './../../config/config';
import { AceEditorModule } from 'ng2-ace-editor';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import swal from 'sweetalert2';

import { EditorService } from '../../services/editor.service';
import { GitService } from '../../services/git.service'
import { CoderunnerService } from '../../services/coderunner.service'

import 'brace';
import 'brace/ext/language_tools';
import 'brace/mode/html';
import 'ace-builds/src-min-noconflict/snippets/html';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {

  @Input() content: any = "";
  @Input() reponame: any;
  @Input() filenamed: any;

  config = config

  jsValue: any = "";
  data: any;
  codeoutput: any;
  dataObj: any = "";
  latestcommit: any;
  treecommit: any;
  newtree: any;
  newcommit: any;
  filename: any;
  filesha: any;
  value: any;

  public modalRef: BsModalRef;
  basetree: any = {};
  newcommitobj: any = {};
  lastcommit: any = {};
  updatefileobj: any = {};
  deletefileobj: any = {};

  constructor(private coderunner: CoderunnerService, private gitService: GitService, private modalService: BsModalService) {}

  ngOnInit() {}

  /*execute the code and return output*/
  executecode() {
    this.coderunner.executecode(this.jsValue)
      .subscribe(data => {
        this.codeoutput = data
        this.dataObj = this.codeoutput._body
      })
  }

  public openModal(template: TemplateRef < any > ) {
    this.modalRef = this.modalService.show(template);
  }

  /*download Javascript file*/
  downloadJsFile() {
    let downloadLink = document.createElement("a");
    let blob = new Blob([this.jsValue]);
    let url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "script.js";
    let parent = document.getElementById('jsDiv');
    parent.appendChild(downloadLink);
    downloadLink.click();
    parent.removeChild(downloadLink);
    return false;
  }

  //method to store the entered value
  onKey(event) {
    this.value += event
  }


  //method to create a file on git
  save(fileName, commitMessage) {


    console.log("qwewqeqew"+this.content);
    console.log("wqwqeqwe"+this.reponame);
    console.log("wqdqwdeqwd"+this.filenamed);
    //hitting the create file api to get sha of the latest commit
    this.gitService.createFile(this.reponame)
      .subscribe(repos => {
        console.log(this.reponame);
        this.latestcommit = repos.object.sha;

        //hitting the commit file api to get sha of the tree commit
        this.gitService.commitfile(this.reponame, this.latestcommit)
          .subscribe(repos => {
            this.treecommit = repos.sha;
            this.basetree = {
              "base_tree": this.treecommit,
              "tree": [{
                "path": fileName,
                "mode": "100644",
                "type": "blob",
                "content": this.content
              }]
            }

            //hitting the create file api to get sha of the new tree commit
            this.gitService.treecommit(this.reponame, this.basetree)
              .subscribe(repos => {
                this.newtree = repos.sha;
                this.newcommitobj = {
                  "parents": [this.latestcommit],
                  "tree": this.newtree,
                  "message": commitMessage
                }

                //hitting the create file api to get sha of the new commit
                this.gitService.newcommit(this.reponame, this.newcommitobj)
                  .subscribe(repos => {
                    this.newcommit = repos.sha;
                    this.lastcommit = {
                      "sha": this.newcommit
                    }

                    //hitting final api to create the file
                    this.gitService.lastcommit(this.reponame, this.lastcommit)
                      .subscribe(repos => {})

                    //sweet alert on getting response
                    if (repos) {
                      swal({
                        timer: 2200,
                        title: "file " + fileName + " created successfully!",
                        text: "",
                        type: 'success',
                        showConfirmButton: false,
                      })
                    }

                    //sweet alert on getting error
                    else {
                      swal({
                        timer: 2200,
                        title: "Error occured",
                        text: "",
                        type: 'error',
                        showConfirmButton: false,
                      })
                    }
                  })
              })
          })
      })
  }


  //method to get the file and update the content on git
  update(commitMessage) {
    console.log("INDIDE UPDATE " + this.content);
    //getting the file sha
    this.gitService.getsha(this.reponame, this.filenamed)
      .subscribe(repos => {
        this.filesha = repos.sha;
        this.updatefileobj = {
          "message": commitMessage,
          "path": this.filenamed,
          "content": btoa(this.content),
          "sha": this.filesha
        }

        //hitting the update file api to update the file contents
        this.gitService.updateFile(this.reponame, this.filenamed, this.updatefileobj)
          .subscribe(repos => {

            //sweet alert on getting response
            if (repos) {
              swal({
                timer: 2200,
                title: "file " + this.filenamed + " updated successfully!",
                text: "",
                type: 'success',
                showConfirmButton: false,
              })
            }

            //sweet alert on getting error
            else {
              swal({
                timer: 2200,
                title: "Error occured",
                text: "",
                type: 'error',
                showConfirmButton: false,
              })
            }
          })
      })
  }



  //method to get the file and delete the content on git
  delete(commitMessage) {
    console.log("INSIDE DELETE " + this.content);

    //getting the file sha
    this.gitService.getsha(this.reponame, this.filenamed)
      .subscribe(repos => {
        this.filesha = repos.sha;
        this.deletefileobj = {
          "message": commitMessage,
          "path": this.filenamed,
          "sha": this.filesha
        }

        //hitting the delete file api to delete the file
        this.gitService.deleteFile(this.reponame, this.filenamed, this.deletefileobj)
          .subscribe(repos => {

            //sweet alert on getting response
            if (repos) {
              swal({
                timer: 2200,
                title: "file " + this.filenamed + " deleted successfully!",
                text: "",
                type: 'success',
                showConfirmButton: false,
              })
            } else {

              //sweet alert on getting error
              swal({
                timer: 2200,
                title: "Error occured",
                text: "",
                type: 'error',
                showConfirmButton: false,
              })
            }
          })
      })
  }
}
