import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { config } from '../config/config';
@Injectable()
export class EditorService {
    config = config;
    //creating servicing instances
    constructor(public http:Http) {
     }
    //method to run code code and get output
    runCode(code){
        console.log(code)
        return this.http
        .post(this.config.connect.url+this.config.connect.port+'/index/executeCode',code)
        .map(res => res.json());
    }
}