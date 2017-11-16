import { Component, OnInit } from '@angular/core';
import { SnippetService } from '../../../shared/services/snippet.service';
import * as CKEditorModule from 'ng2-ckeditor';
import { config } from '../../config/config';

@Component({
  selector: 'app-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.css']
})

export class SnippetComponent implements OnInit {

  constructor(private snippet: SnippetService) { }
    languag:any;
    title: any;
    language: any;
    code: any;
    text : any ;
    editor1 : any;
    languages: any = [];
    con = config;  // config
  ngOnInit() {
    this.languages = config.language;
    //config for ckeditor
    var configurations = {
     extraPlugins: 'codesnippet',
     codeSnippet_theme: 'monokai_sublime',
     height: 356
   };
    
    // input text area for code snippet of ck editor
   CKEDITOR.replace('editor1', configurations);
   CKEDITOR.instances.editor1.setData("");
   this.code = CKEDITOR.instances.editor1.getData();
   console.log(this.code)
  }

   // method to add code to snippet
  submit() {
    
  	let obj = {
  		title: this.title,
  		language: this.languag,
  		code: CKEDITOR.instances.editor1.getData()
  	}
    console.log(obj);
  	this.snippet.addSnippet(obj)
  	.subscribe(res=>console.log(res))
  }

   // method to set the prefered language
   mode(event) {
   this.languag = event.target.value;
   console.log(this.languag);
   }


}


