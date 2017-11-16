import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { config } from '../config/config'; 

@Injectable()
export class SnippetService {


  constructor(private http: Http) { }


 /* method used to Add snippet*/ 
  addSnippet(data) {
    return this.http
      .post(config.connect.apiURL+'/api/snippets',data)
      .map(res => res.json());
  }

 /* method  to get snippet from database and show it into editor*/ 
    getSnippet() {
    return this.http
      .get(config.connect.apiURL+'/api/snippets')
      .map(res => res.json());
  }

   /*update method used to modify snippet*/ 
     updateSnippet(title , code) {    
         return this.http    
          .put(config.connect.apiURL+'/api/snippets/update/' + title, code)   
            .map(res => res.json()); 
             }

              /*method to Remove snippet*/ 
     deleteSnippet(title) {    
         return this.http    
          .put(config.connect.apiURL+'/api/snippets/delete/' , title)   
            .map(res => res.json()); 
             }


}
