import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

import { config } from '../config/config';

@Injectable()
export class CoderunnerService {

  config = config

  constructor(private http: Http) {}

  executecode(code) {
    let data = {
      testscript: code
    }
    return this.http
      .post(this.config.connect.vmURL + '/execute', data)
  }
}
