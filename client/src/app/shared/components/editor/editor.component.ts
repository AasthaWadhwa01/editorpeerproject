import { Component, EventEmitter, Output, ViewChild, OnInit, Input, NgZone, TemplateRef, ElementRef } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { config } from './../../config/editor.config';
import { AceEditorModule } from 'ng2-ace-editor';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import swal from 'sweetalert2';

import { webEditorConfig } from '../../config/webEditor.config';
import { EditorService } from '../../services/editor.service';
import { GitService } from '../../services/git.service';
import { AuthenticationService } from '../../services/authentication.service';
import { CoderunnerService } from '../../services/coderunner.service';
import { SnippetService } from '../../../shared/services/snippet.service';
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


	//to close modals on button click
	@ViewChild('createClose') createClose: ElementRef;
	@ViewChild('updateClose') updateClose: ElementRef;
	@ViewChild('deleteclose') deleteClose: ElementRef;
	/*=======
		@ViewChild('txtclose') txtclose: ElementRef;
		@ViewChild('updateclose') updateclose: ElementRef;
		@ViewChild('deleteclose') deleteclose: ElementRef;
	*/

	//emitting reponame for updating file list
	// @Output() repoNameForFileUpdate = new EventEmitter < any > ();
	@Output() repoNameForFileUpdateAtCreate: EventEmitter<any> = new EventEmitter();
	@Output() repoNameForFileUpdateAtUpdate: EventEmitter<any> = new EventEmitter();
	@Output() repoNameForFileUpdateAtDelete: EventEmitter<any> = new EventEmitter();

	@ViewChild('editor') editor;


	@Input() content: any = "";
	@Input() reponame: any;
	@Input() filenamed: any;

	config = config;
	ifRepo:boolean=false;
	updateMessage: string;
	fileName: string
	deleteCommit: string;
	deleteMsg: string;
	updateMsg: string;
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
	javascript: any;
	methodToExport: any;
	link: string = '';
	showModalBox: boolean = false;
	loading: boolean;

	public modalRef: BsModalRef;
	basetree: any = {};
	newcommitobj: any = {};
	lastcommit: any = {};
	updatefileobj: any = {};
	deletefileobj: any = {};
	templateRef:any;

	constructor(private snippet: SnippetService, private authenticationService: AuthenticationService, private coderunner: CoderunnerService, private gitService: GitService, private zone: NgZone, private modalService: BsModalService) {
		window['angularComponentRef'] = { component: this, zone: zone };
	}

	/*it will open a modal when user will click on screen share button*/
  public openModals(template: TemplateRef < any > ) {
    this.methodToExport = this.calledFromOutside;
    if (this.showModalBox == false) {
      this.loading=true;
      this.templateRef=template;
    }else {
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
      this.loading=false;
      this.link = url;
      this.modalRef = this.modalService.show(this.templateRef);
    });
  }

	ngOnInit() {

		this.snippet.getSnippet()
			.subscribe(res => {
				this.javascript = res.filter(ele => ele.language === 'Javascript');
			})
	}
	/*snippet show in  editor*/
	showJavascript(code) {
		this.content += " " + code;
	}
	/*execute the code and return output*/
	executecode() {
		this.coderunner.executecode(this.content)
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
		let blob = new Blob([this.content]);
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

	//method to check whether repository is selected or not
	isRepoSelected(){
   if(this.reponame){
     this.ifRepo = true;

   }else{
     swal({
       timer: 2500,
       title: config.editor.SELECTREPOSITORY,
       text: "",
       type: 'error',
       showConfirmButton: false,
     }).catch(swal.noop);
    this.ifRepo = false;
   }
 }


	//method to create a file on git
	createFile(fileName, createCommitMessage) {
		if (this.authenticationService.pacToken == null) {
			swal({
				timer: 2200,
				title: config.editor.NOTREGISTERED,
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
													if (repos) {
																this.loading = false;
																swal({
																	timer: 2200,
																	title: "file " + this.fileName + " created successfully!",
																	text: "",
																	type: 'success',
																	showConfirmButton: false,
																}).catch(swal.noop);															}
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
											 //sweet alert on getting response
										})
								})
						})
				})

			//to close modal on button click 
			this.createClose.nativeElement.click();
			fileName.reset();
			createCommitMessage.reset();
		}
	}
	//method to get the file and update the content on git
	updateFile(commitMessage) {
		if (this.authenticationService.pacToken == null) {
			swal({
				timer: 2200,
				title: config.editor.NOTREGISTERED,
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
						"content": btoa(this.content),
						"sha": this.filesha
					}
					//hitting the update file api to update the file contents
					this.gitService.updateFile(this.reponame, this.filenamed, this.updatefileobj)
						.subscribe(repos => {
    					this.repoNameForFileUpdateAtUpdate.emit({repoName:this.reponame,sha:repos.commit.sha})
							this.loading = false;
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
			commitMessage.reset();
		}
	}
	//method to get the file and delete the content on git
	deleteFile(commitMessage) {
		if (this.authenticationService.pacToken == null) {
			swal({
				timer: 2200,
				title: config.editor.NOTREGISTERED,
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
			commitMessage.reset();
		}
	}
	//function to insert a snippet at cursor position
	insertAtPos(data: any) {
		this.editor.getEditor().session.insert(this.editor.getEditor().getCursorPosition(), data)

	}
}
