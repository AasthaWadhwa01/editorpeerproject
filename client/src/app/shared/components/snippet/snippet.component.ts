import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import swal from 'sweetalert2';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import { SnippetService } from '../../../shared/services/snippet.service'; 
import { config } from '../../config/snippet.config';

@Component({
 selector: 'app-snippet',
 templateUrl: './snippet.component.html',
 styleUrls: ['./snippet.component.css']
})

export class SnippetComponent implements OnInit {

constructor(private snippetService: SnippetService, private modalService: BsModalService) {}

//variable declarations
 snippets: any;
 title: any="Snippet";
 oldtitle: any;
 languages:any='All';
 languages1:any= 'Select Your Language';
 selectedValue: any = "Select Your Language";
 code: any;
 oldcode: any;
 language: any = "Select Your Language";
 oldlanguage: any;

modalRef: BsModalRef;
 config=config;

//ngOnInit method
 ngOnInit() {
   this.languages= config.language;
   this.languages1 = config.language1;
  this.show();
 }

//modal to edit sniippet
 openModal(template: TemplateRef<any>, data: any) {
     this.title = data.title;
   this.oldtitle = data.title;
     this.code = data.code;
   this.oldcode = data.code;
     this.language = data.language;
   this.oldlanguage = data.language;
   this.modalRef = this.modalService.show(template);
 }

//modal to add new snippet
 openModalAdd(template: TemplateRef<any>) {
   this.title = "";
     this.code = "";
     this.language = "Select Your Language";
   this.modalRef = this.modalService.show(template);
 }

//method to display snippets
 show() {
     this.snippetService.getSnippet()
  .subscribe(res=> this.snippets = res)
 }

//method to add new snippet
 add() {
   let obj = {
     "title": this.title,
     "language": this.language,
     "code": this.code
   }
   this.snippetService.addSnippet(obj)
   .subscribe(res => {
     if (res) {
         swal({ //alert message for success
         timer: 1500,
         title: "Snippet Added Successfully",
         type: 'success',
         showConfirmButton: false,
       }).catch(swal.noop);
     }
     this.mode();
   })
   this.modalRef.hide();
 }

//method to modify snippet
 edit() {
   if(this.oldtitle!=this.title || this.oldlanguage!=this.language || this.oldcode!=this.code)
   {
     let obj = {
     "oldtitle": this.oldtitle,
         "title": this.title,
         "language": this.language,
         "code": this.code
     }

    this.snippetService.updateSnippet(obj)
     .subscribe(res=> {
     if (res) {
         swal({ //alert message for success
         timer: 1500,
         title: "Snippet Edited Successfully",
         type: 'success',
         showConfirmButton: false,
       }).catch(swal.noop);
     }
     this.mode()
   })
}
this.modalRef.hide()
 }

//method to delete snippet
 deleteSnip(title: any) {
     this.snippetService.deleteSnippet(title)
     .subscribe(res=> {
     if (res) {
         swal({ //alert message for success
         timer: 1500,
         title: "Deleted Successfully",
         type: 'success',
         showConfirmButton: false,
       }).catch(swal.noop);
     }
     this.mode()
   })
}

//method to show snippets of particular language
 mode() {
   if(this.selectedValue!="All"){
   this.snippetService.getSnippet()
   .subscribe(res => {
     this.snippets = res.filter((data)=> data.language == this.selectedValue);
   })
 }
 else
   this.show();
}
}