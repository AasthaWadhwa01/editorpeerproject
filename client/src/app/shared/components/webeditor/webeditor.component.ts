import { Component, OnInit, ViewChild, ElementRef, Input, NgZone, TemplateRef, Output,EventEmitter,OnChanges,SimpleChange} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { FormsModule } from '@angular/forms'
import { AceEditorDirective } from 'ng2-ace-editor'
import { AceEditorModule } from 'ng2-ace-editor'
import * as JSZip from 'jszip'
import swal from 'sweetalert2';
import { SnippetService } from '../../../shared/services/snippet.service';
import { AuthenticationService } from '../../services/authentication.service';
import { GitService } from '../../services/git.service';
import { webEditorConfig } from '../../config/webEditor.config';
import { config } from './../../config/editor.config';

@Component({
  selector: 'app-webeditor',
  templateUrl: './webeditor.component.html',
  styleUrls: ['./webeditor.component.css']
})
export class WebeditorComponent implements OnInit , OnChanges{

  constructor(private snippet: SnippetService,private authenticationService: AuthenticationService,private gitService: GitService, private zone: NgZone, private modalService: BsModalService) {
    window['angularComponentRef'] = { component: this, zone: zone };
  }

  config = webEditorConfig;
  editorConfig=config;

  @Input() content: any
  @Input() reponame: any;
  @Input() filenamed: any;
  @Input() extension:any;

  //for html
  @ViewChild('htmleditor') htmleditor;
  @ViewChild('csseditor') csseditor;
  @ViewChild('jseditor') jseditor;

  //for closing html modals on button click
  @ViewChild('createClose') createClose: ElementRef;
  @ViewChild('updateClose') updateClose: ElementRef;
  @ViewChild('deleteClose') deleteClose: ElementRef;



  //for closing css modals on button click
  @ViewChild('cssCreateClose') cssCreateClose: ElementRef;
  @ViewChild('cssUpdateClose') cssUpdateClose: ElementRef;
  @ViewChild('cssDeleteClose') cssDeleteClose: ElementRef;


  //for closing js modals on button click
  @ViewChild('jsCreateClose') jsCreateClose: ElementRef;
  @ViewChild('jsUpdateClose') jsUpdateClose: ElementRef;
  @ViewChild('jsDeleteClose') jsDeleteClose: ElementRef;

  //sending data from child to parent
  @Output() repoNameForFileUpdateAtCreate: EventEmitter<any> = new EventEmitter();
  @Output() repoNameForFileUpdateAtUpdate: EventEmitter<any> = new EventEmitter();
  @Output() repoNameForFileUpdateAtDelete: EventEmitter<any> = new EventEmitter();

  latestcommit: any;
  treecommit: any;
  filesha: any;
  newtree: any;
  newcommit: any;
  basetree: any = {};
  newcommitobj: any = {};
  lastcommit: any = {};
  updateMessage: string;
  updateMsg: string;
  deleteCommit: string;
  deleteMsg: string;
  fileName: string;
  ifRepo:boolean=false;
  updatefileobj: any = {};
  deletefileobj: any = {};


  htmlValue: any  = this.config.webEditor.HTMLTEMP;
  cssValue: any = this.config.webEditor.CSSTEMP;
  jsValue: any = this.config.webEditor.JSSTEMP;
  code: any;
  cssblob: any;
  htmlblob: any;
  jsblob: any;
  textcontent: any;
  html: any;
  css: any;
  javascript: any;
  caretPos: any;
  caretText: any;
  obj: any;
  windowRef: any;
  methodToExport: any;
  link: string = '';
  showModalBox:boolean = false;
  loading:boolean;
  public modalRef: BsModalRef;

  /*variable for snippet used in css*/
  comments: any;
  tabels: string;
  unordered: any;
  forms: any;
  includeJs: any;
  includeCss: any;

  /*variable for snippet used in css*/
  commentsCss: any;
  elementSelector: any;
  classSelector: any;
  idSelector: any;
  mediaQueries: any;
  templateRef:any;

 /*it will open a modal when user will click on screen share button*/
  public openModals(template: TemplateRef < any > ) {
    this.methodToExport = this.calledFromOutside;
    if (this.showModalBox == false) {
      this.loading = true;
      this.templateRef = template;
    } else {
      swal({
        timer: 2000,
        title: webEditorConfig.screenShare.TITLE,
        text: webEditorConfig.screenShare.TEXT,
        type: webEditorConfig.screenShare.INFO,
        showConfirmButton: false,
      }).catch(swal.noop);
    }

   /*varialbe to toggle sharing status on/off*/
    this.showModalBox = !this.showModalBox;

 }

 /*will get the link generate from index.html*/
  calledFromOutside(url: string) {
    this.zone.run(() => {
      this.loading = false;
      this.link = url;
      this.modalRef = this.modalService.show(this.templateRef);
    });
  }

  ngOnChanges(changes: {[property: string]: SimpleChange}) {
    if(this.extension === "html"){
      this.htmlValue = this.content;
    }
    if (this.extension ==="css") {
      this.cssValue = this.content;
    }
      if (this.extension ==="js") {
      this.jsValue = this.content;
    }
  }

  ngOnInit() {
    if(!this.content){
      this.content=this.htmlValue;
    }
    this.onChange(this.code)
    this.snippet.getSnippet()
      .subscribe(res => {
        this.html = res.filter(ele => ele.language === 'Html');
        this.css = res.filter(ele => ele.language === 'Css');
        this.javascript = res.filter(ele => ele.language === 'Javascript');
      })
  }

    //method to check whether repository is selected or not
  isRepoSelected(){
   if(this.reponame){
     this.ifRepo = true;

   }else{
     swal({
       timer: 2500,
       title: "Please select your repository",
       text: "",
       type: 'error',
       showConfirmButton: false,
     }).catch(swal.noop);
    this.ifRepo = false;
   }
 }

  //method to create a  HTML file on git
  createFileHtml(fileName, createCommitMessage) {
    if (this.authenticationService.pacToken == null) {
      swal({
        timer: 7500,
        title: "You have not generated your token",
        text: "",
        type: 'error',
        showConfirmButton: false,
      }).catch(swal.noop);
    } else {
      this.loading = true;
      this.fileName = fileName.value['fileName'];
      this.updateMessage = createCommitMessage.value['createMsg'];
      this.reponame = this.reponame;
      
      //hitting the create file api to get sha of the latest commit
      this.gitService.createFile(this.reponame)
        .subscribe(repos => {
          this.latestcommit = repos.object.sha;
          //hitting the commit file api to get sha of the tree commit
          this.gitService.commitfile(this.reponame, this.latestcommit)
            .subscribe(repos => {
              this.treecommit = repos.sha;
              this.basetree = {
                "base_tree": this.treecommit,
                "tree": [{
                  "path": this.fileName,
                  "mode": "100644",
                  "type": "blob",
                  "content": this.htmlValue
                }]
              }
              //hitting the create file api to get sha of the new tree commit
              this.gitService.treecommit(this.reponame, this.basetree)
                .subscribe(repos => {
                  this.newtree = repos.sha;
                  this.newcommitobj = {
                    "parents": [this.latestcommit],
                    "tree": this.newtree,
                    "message": this.updateMessage
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
                        .subscribe(repos => {
                          this.repoNameForFileUpdateAtCreate.emit({repoName:this.reponame,sha:repos.object.sha})

                          //sweet alert on getting response
                          if (repos) {
                            this.loading = false;
                            swal({
                              timer: 2200,
                              title: "file " + this.fileName + " created successfully!",
                              text: "",
                              type: 'success',
                              showConfirmButton: false,
                            }).catch(swal.noop);
                          }
                          //sweet alert on getting error
                          else {
                            this.loading = false;
                            swal({
                              timer: 2200,
                              title: "Error occured",
                              text: "",
                              type: 'error',
                              showConfirmButton: false,
                            }).catch(swal.noop);
                          }
                        })
                    
                    })
                })
            })
        })

      //to close modal on button click  
      this.createClose.nativeElement.click();  
      this.cssCreateClose.nativeElement.click(); 
      this.jsCreateClose.nativeElement.click(); 
      fileName.reset();
      createCommitMessage.reset();
    }
  }


  //method to create a CSS file on git
  createFileCss(fileName, createCommitMessage) {
    if (this.authenticationService.pacToken == null) {
      swal({
        timer: 7500,
        title: "You have not generated your token",
        text: "",
        type: 'error',
        showConfirmButton: false,
      }).catch(swal.noop);
    } else {
      this.loading = true;
      this.fileName = fileName.value['fileName'];
      this.updateMessage = createCommitMessage.value['createMsg'];
      this.reponame = this.reponame;
      
      //hitting the create file api to get sha of the latest commit
      this.gitService.createFile(this.reponame)
        .subscribe(repos => {
          this.latestcommit = repos.object.sha;
          //hitting the commit file api to get sha of the tree commit
          this.gitService.commitfile(this.reponame, this.latestcommit)
            .subscribe(repos => {
              this.treecommit = repos.sha;
              this.basetree = {
                "base_tree": this.treecommit,
                "tree": [{
                  "path": this.fileName,
                  "mode": "100644",
                  "type": "blob",
                  "content": this.cssValue
                }]
              }
              //hitting the create file api to get sha of the new tree commit
              this.gitService.treecommit(this.reponame, this.basetree)
                .subscribe(repos => {
                  this.newtree = repos.sha;
                  this.newcommitobj = {
                    "parents": [this.latestcommit],
                    "tree": this.newtree,
                    "message": this.updateMessage
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
                        .subscribe(repos => {
                          this.repoNameForFileUpdateAtCreate.emit({repoName:this.reponame,sha:repos.object.sha})

                          //sweet alert on getting response
                          if (repos) {
                            this.loading = false;
                            swal({
                              timer: 2200,
                              title: "file " + this.fileName + " created successfully!",
                              text: "",
                              type: 'success',
                              showConfirmButton: false,
                            }).catch(swal.noop);
                          }
                          //sweet alert on getting error
                          else {
                            this.loading = false;
                            swal({
                              timer: 2200,
                              title: "Error occured",
                              text: "",
                              type: 'error',
                              showConfirmButton: false,
                            }).catch(swal.noop);
                          }
                        })
                    
                    })
                })
            })
        })

      //to close modal on button click  
      this.createClose.nativeElement.click();  
      this.cssCreateClose.nativeElement.click(); 
      this.jsCreateClose.nativeElement.click(); 
      fileName.reset();
      createCommitMessage.reset();
    }
  }


  //method to create a js file on git
  createFileJS(fileName, createCommitMessage) {
    if (this.authenticationService.pacToken == null) {
      swal({
        timer: 7500,
        title: "You have not generated your token",
        text: "",
        type: 'error',
        showConfirmButton: false,
      }).catch(swal.noop);
    } else {
      this.loading = true;
      this.fileName = fileName.value['fileName'];
      this.updateMessage = createCommitMessage.value['createMsg'];
      this.reponame = this.reponame;
      
      //hitting the create file api to get sha of the latest commit
      this.gitService.createFile(this.reponame)
        .subscribe(repos => {
          this.latestcommit = repos.object.sha;
          //hitting the commit file api to get sha of the tree commit
          this.gitService.commitfile(this.reponame, this.latestcommit)
            .subscribe(repos => {
              this.treecommit = repos.sha;
              this.basetree = {
                "base_tree": this.treecommit,
                "tree": [{
                  "path": this.fileName,
                  "mode": "100644",
                  "type": "blob",
                  "content": this.jsValue
                }]
              }
              //hitting the create file api to get sha of the new tree commit
              this.gitService.treecommit(this.reponame, this.basetree)
                .subscribe(repos => {
                  this.newtree = repos.sha;
                  this.newcommitobj = {
                    "parents": [this.latestcommit],
                    "tree": this.newtree,
                    "message": this.updateMessage
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
                        .subscribe(repos => {
                          this.repoNameForFileUpdateAtCreate.emit({repoName:this.reponame,sha:repos.object.sha})

                          //sweet alert on getting response
                          if (repos) {
                            this.loading = false;
                            swal({
                              timer: 2200,
                              title: "file " + this.fileName + " created successfully!",
                              text: "",
                              type: 'success',
                              showConfirmButton: false,
                            }).catch(swal.noop);
                          }
                          //sweet alert on getting error
                          else {
                            this.loading = false;
                            swal({
                              timer: 2200,
                              title: "Error occured",
                              text: "",
                              type: 'error',
                              showConfirmButton: false,
                            }).catch(swal.noop);
                          }
                        })
                    
                    })
                })
            })
        })

      //to close modal on button click  
      this.createClose.nativeElement.click();  
      this.cssCreateClose.nativeElement.click(); 
      this.jsCreateClose.nativeElement.click(); 
      fileName.reset();
      createCommitMessage.reset();
    }
  }

  //method to get the html file and update the content on git
  updateHtmlFile(commitMessage) {
    if (this.authenticationService.pacToken == null) {
      swal({
        timer: 7500,
        title: "You have not generated your token",
        text: "",
        type: 'error',
        showConfirmButton: false,
      }).catch(swal.noop);
    } else {
      this.loading = true;
      this.updateMsg = commitMessage.value['updateMsg'];

      //getting the file sha
      this.gitService.getsha(this.reponame, this.filenamed)
        .subscribe(repos => {
          this.filesha = repos.sha;
          this.updatefileobj = {
            "message": this.updateMsg,
            "path": this.filenamed,
            "content": btoa(this.htmlValue),
            "sha": this.filesha
          }
          //hitting the update file api to update the file contents
          this.gitService.updateFile(this.reponame, this.filenamed, this.updatefileobj)
            .subscribe(repos => {
              this.repoNameForFileUpdateAtUpdate.emit({repoName:this.reponame,sha:repos.commit.sha})
              //sweet alert on getting response
              if (repos) {
                this.loading = false;
                swal({
                  timer: 2200,
                  title: "file " + this.filenamed + " updated successfully!",
                  text: "",
                  type: 'success',
                  showConfirmButton: false,
                }).catch(swal.noop);
              }
              //sweet alert on getting error
              else {
                this.loading = false;
                swal({
                  timer: 2200,
                  title: "Error occured",
                  text: "",
                  type: 'error',
                  showConfirmButton: false,
                }).catch(swal.noop);
              }
            })
        })
      //to close modal on button click  
      this.updateClose.nativeElement.click();   
      this.cssUpdateClose.nativeElement.click();   
      this.jsUpdateClose.nativeElement.click();   
      commitMessage.reset();
    }
  }

  //method to get the css file and update the content on git
  updateCssFile(commitMessage) {
    if (this.authenticationService.pacToken == null) {
      swal({
        timer: 7500,
        title: "You have not generated your token",
        text: "",
        type: 'error',
        showConfirmButton: false,
      }).catch(swal.noop);
    } else {
      this.loading = true;
      this.updateMsg = commitMessage.value['updateMsg'];

      //getting the file sha
      this.gitService.getsha(this.reponame, this.filenamed)
        .subscribe(repos => {
          this.filesha = repos.sha;
          this.updatefileobj = {
            "message": this.updateMsg,
            "path": this.filenamed,
            "content": btoa(this.cssValue),
            "sha": this.filesha
          }
          //hitting the update file api to update the file contents
          this.gitService.updateFile(this.reponame, this.filenamed, this.updatefileobj)
            .subscribe(repos => {
              this.repoNameForFileUpdateAtUpdate.emit({repoName:this.reponame,sha:repos.commit.sha})
              //sweet alert on getting response
              if (repos) {
                this.loading = false;
                swal({
                  timer: 2200,
                  title: "file " + this.filenamed + " updated successfully!",
                  text: "",
                  type: 'success',
                  showConfirmButton: false,
                }).catch(swal.noop);
              }
              //sweet alert on getting error
              else {
                this.loading = false;
                swal({
                  timer: 2200,
                  title: "Error occured",
                  text: "",
                  type: 'error',
                  showConfirmButton: false,
                }).catch(swal.noop);
              }
            })
        })
      //to close modal on button click  
      this.updateClose.nativeElement.click();   
      this.cssUpdateClose.nativeElement.click();   
      this.jsUpdateClose.nativeElement.click();   
      commitMessage.reset();
    }
  }



//method to get the js file and update the content on git
  updateJsFile(commitMessage) {
    if (this.authenticationService.pacToken == null) {
      swal({
        timer: 7500,
        title: "You have not generated your token",
        text: "",
        type: 'error',
        showConfirmButton: false,
      }).catch(swal.noop);
    } else {
      this.loading = true;
      this.updateMsg = commitMessage.value['updateMsg'];

      //getting the file sha
      this.gitService.getsha(this.reponame, this.filenamed)
        .subscribe(repos => {
          this.filesha = repos.sha;
          this.updatefileobj = {
            "message": this.updateMsg,
            "path": this.filenamed,
            "content": btoa(this.jsValue),
            "sha": this.filesha
          }
          //hitting the update file api to update the file contents
          this.gitService.updateFile(this.reponame, this.filenamed, this.updatefileobj)
            .subscribe(repos => {
              this.repoNameForFileUpdateAtUpdate.emit({repoName:this.reponame,sha:repos.commit.sha})
              //sweet alert on getting response
              if (repos) {
                this.loading = false;
                swal({
                  timer: 2200,
                  title: "file " + this.filenamed + " updated successfully!",
                  text: "",
                  type: 'success',
                  showConfirmButton: false,
                }).catch(swal.noop);
              }
              //sweet alert on getting error
              else {
                this.loading = false;
                swal({
                  timer: 2200,
                  title: "Error occured",
                  text: "",
                  type: 'error',
                  showConfirmButton: false,
                }).catch(swal.noop);
              }
            })
        })
      //to close modal on button click  
      this.updateClose.nativeElement.click();   
      this.cssUpdateClose.nativeElement.click();   
      this.jsUpdateClose.nativeElement.click();   
      commitMessage.reset();
    }
  }



  //method to get the html file and delete the content on git
  deleteHtmlFile(commitMessage) {
    if (this.authenticationService.pacToken == null) {
      swal({
        timer: 7500,
        title: "You have not generated your token",
        text: "",
        type: 'error',
        showConfirmButton: false,
      }).catch(swal.noop);
    } else {
      this.loading = true;
      this.deleteMsg = commitMessage.value['deleteMsg'];
      //getting the file sha
      this.gitService.getsha(this.reponame, this.filenamed)
        .subscribe(repos => {
          this.filesha = repos.sha;
          this.deletefileobj = {
            "message": this.deleteMsg,
            "path": this.filenamed,
            "sha": this.filesha
          }
          //hitting the delete file api to delete the file
          this.gitService.deleteFile(this.reponame, this.filenamed, this.deletefileobj)
            .subscribe(repos => {
              this.repoNameForFileUpdateAtDelete.emit({repoName:this.reponame,sha:repos.commit.sha})
              //sweet alert on getting response
              if (repos) {
                this.loading = false;
                swal({
                  timer: 2200,
                  title: "file " + this.filenamed + " deleted successfully!",
                  text: "",
                  type: 'success',
                  showConfirmButton: false,
                }).catch(swal.noop);
              } else {
                this.loading = false;
                //sweet alert on getting error
                swal({
                  timer: 2200,
                  title: "Error occured",
                  text: "",
                  type: 'error',
                  showConfirmButton: false,
                }).catch(swal.noop);
              }
            })
        })

      //to close modal on button click  
      this.deleteClose.nativeElement.click();
      this.cssUpdateClose.nativeElement.click();
      this.jsUpdateClose.nativeElement.click();
      commitMessage.reset();
    }
  }

  //method to get the css file and delete the content on git
  deleteCssFile(commitMessage) {
    if (this.authenticationService.pacToken == null) {
      swal({
        timer: 7500,
        title: "You have not generated your token",
        text: "",
        type: 'error',
        showConfirmButton: false,
      }).catch(swal.noop);
    } else {
      this.loading = true;
      this.deleteMsg = commitMessage.value['deleteMsg'];
      //getting the file sha
      this.gitService.getsha(this.reponame, this.filenamed)
        .subscribe(repos => {
          this.filesha = repos.sha;
          this.deletefileobj = {
            "message": this.deleteMsg,
            "path": this.filenamed,
            "sha": this.filesha
          }
          //hitting the delete file api to delete the file
          this.gitService.deleteFile(this.reponame, this.filenamed, this.deletefileobj)
            .subscribe(repos => {
              this.repoNameForFileUpdateAtDelete.emit({repoName:this.reponame,sha:repos.commit.sha})
              //sweet alert on getting response
              if (repos) {
                this.loading = false;
                swal({
                  timer: 2200,
                  title: "file " + this.filenamed + " deleted successfully!",
                  text: "",
                  type: 'success',
                  showConfirmButton: false,
                }).catch(swal.noop);
              } else {
                this.loading = false;
                //sweet alert on getting error
                swal({
                  timer: 2200,
                  title: "Error occured",
                  text: "",
                  type: 'error',
                  showConfirmButton: false,
                }).catch(swal.noop);
              }
            })
        })

      //to close modal on button click  
      this.deleteClose.nativeElement.click();
      this.cssUpdateClose.nativeElement.click();
      this.jsUpdateClose.nativeElement.click();
      commitMessage.reset();
    }
  }

  //method to get the delete file and delete the content on git
  deleteJsFile(commitMessage) {
    if (this.authenticationService.pacToken == null) {
      swal({
        timer: 7500,
        title: "You have not generated your token",
        text: "",
        type: 'error',
        showConfirmButton: false,
      }).catch(swal.noop);
    } else {
      this.loading = true;
      this.deleteMsg = commitMessage.value['deleteMsg'];
      //getting the file sha
      this.gitService.getsha(this.reponame, this.filenamed)
        .subscribe(repos => {
          this.filesha = repos.sha;
          this.deletefileobj = {
            "message": this.deleteMsg,
            "path": this.filenamed,
            "sha": this.filesha
          }
          //hitting the delete file api to delete the file
          this.gitService.deleteFile(this.reponame, this.filenamed, this.deletefileobj)
            .subscribe(repos => {
              this.repoNameForFileUpdateAtDelete.emit({repoName:this.reponame,sha:repos.commit.sha})
              //sweet alert on getting response
              if (repos) {
                this.loading = false;
                swal({
                  timer: 2200,
                  title: "file " + this.filenamed + " deleted successfully!",
                  text: "",
                  type: 'success',
                  showConfirmButton: false,
                }).catch(swal.noop);
              } else {
                this.loading = false;
                //sweet alert on getting error
                swal({
                  timer: 2200,
                  title: "Error occured",
                  text: "",
                  type: 'error',
                  showConfirmButton: false,
                }).catch(swal.noop);
              }
            })
        })

      //to close modal on button click  
      this.deleteClose.nativeElement.click();
      this.cssUpdateClose.nativeElement.click();
      this.jsUpdateClose.nativeElement.click();
      commitMessage.reset();
    }
  }
  

/*snippet show in html editor*/
  showHtml(code) {
    this.content += " " + code;
  }

/*snippet show in css editor*/
 showCss(code) {
     this.cssValue+= " " + code;
  }

  /*Giving the basic syntax of an HTMl page on Iframe*/
  base_tpl: string = this.config.webEditor.OUTPUTTEMP;
  
  prepareSource() {
    let src = '';
    let css = '';
    let js = '';
    // HTML
    src = this.base_tpl.replace('</body>', this.htmlValue + '</body>');
    // CSS
    css = '<style>' + this.cssValue + '</style>';
    src = src.replace('</head>', css + '</head>');
    //Js
    src = src.replace('</script>', this.jsValue + '</script>');
    return src;
  };

  /*To return value in iframe*/
  render() {
    let source = this.prepareSource();
    let iframe = document.querySelector('#output iframe')
    
    let iframe_doc = iframe['contentDocument'];

    iframe_doc.open();
    iframe_doc.write(source);
    iframe_doc.close();
  };

  /*Method to pass the value directly into iframe*/
  onChange(code) {
    this.render();
  }

  cm_opt: any = {
    mode: 'text/html',
    gutter: true,
    lineNumbers: true,
  };
  /*HTML snippet methods start*/
  comment() {
    this.content += " " + this.comments;
  }

  table() {
    this.content += " " + this.tabels;
  }

  unodered() {
    this.content += " " + this.unordered;
  }
  form() {
    this.content += " " + this.forms;
  }
  includeJS() {
    this.content += " " + this.includeJs;
  }
  includeCSS() {
    this.content += " " + this.includeCss;
  }
  /*HTML snippet methods ends*/

  /*css snippet methods start*/
  commentCss() {
    this.cssValue += " " + this.commentsCss;
  }

  elementsSelector() {
    this.cssValue += " " + this.elementSelector;
  }

  class() {
    this.cssValue += " " + this.classSelector;
  }

  id() {
    this.cssValue += " " + this.idSelector;
  }

  mediaQuery() {
    this.cssValue += " " + this.mediaQueries;
  }
  /*css snippet methods ends*/

  /*download whole content in single file*/
  downloadFile() {

    var downloadLink = document.createElement("a");
    var blob = new Blob([this.textcontent]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "project.html";
    let parent = document.getElementById('myDiv');
    parent.appendChild(downloadLink);
    downloadLink.click();
    parent.removeChild(downloadLink);
    return false;
  }

  /*download html file*/
  downloadHtmlFile() {
    var downloadLink = document.createElement("a");

    var blob = new Blob([this.htmlValue]);
    this.htmlblob = blob;
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "index.html";
    let parent = document.getElementById('myHtmlDiv');
    parent.appendChild(downloadLink);
    downloadLink.click();
    parent.removeChild(downloadLink);
    return false;
  }

  /*download css file*/
  downloadCssFile() {
    var downloadLink = document.createElement("a");

    var blob = new Blob([this.cssValue]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "style.css";
    this.cssblob = blob;
    let parent = document.getElementById('myCssDiv');
    parent.appendChild(downloadLink);
    downloadLink.click();
    parent.removeChild(downloadLink);
    return false;
  }

  /*download Javascript file*/
  downloadJsFile() {
    var downloadLink = document.createElement("a");

    var blob = new Blob([this.jsValue]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "script.js";
    let parent = document.getElementById('myJsDiv');
    parent.appendChild(downloadLink);
    downloadLink.click();
    parent.removeChild(downloadLink);
    return false;
  }

  /*download Zip file*/
  downloadZip() {
    var zip = new JSZip();
    zip.file("index.html", this.htmlValue);
    zip.file("style.css", this.cssValue);
    zip.file("script.js", this.jsValue);
    zip.generateAsync({ type: "blob" })
      .then(function(content) {
        var downloadLink = document.createElement("a");

        var blob = new Blob([content]);
        var url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = "project.zip";
        let parent = document.getElementById('myDiv');
        parent.appendChild(downloadLink);
        downloadLink.click();
        parent.removeChild(downloadLink);
        return false;
      });
  }

  //Function to insert an html snippet at cursor position
  insertAtHtmlPos(data: any) {
    this.htmleditor.getEditor().session.insert(this.htmleditor.getEditor().getCursorPosition(), data)

  }

  //Function to insert a css snippet at cursor position
  insertAtCssPos(data: any) {
    this.csseditor.getEditor().session.insert(this.csseditor.getEditor().getCursorPosition(), data)

  }

  //Function to insert a javascript snippet at cursor position
  insertAtJavascriptPos(data: any) {
    this.jseditor.getEditor().session.insert(this.jseditor.getEditor().getCursorPosition(), data)

  }
}