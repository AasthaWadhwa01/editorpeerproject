import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { config } from '../config/config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import * as $ from 'jquery';
import { AuthenticationService } from './authentication.service'

@Injectable()
export class GitService {
  accessToken: any;
  userName: any;

  constructor(private _http: Http, private authenticationService: AuthenticationService) {
    let userDetails = JSON.parse(localStorage.getItem('currentUser'));
    this.userName = userDetails.userName;
  }

  //method to get github userName
  getUser() {
    if (this.userName) {
      return this._http.get(config.giturls.HOSTURLUSERS + this.userName +
          '?client_id=' + config.connect.CLIENT_ID +
          '&client_secret=' + config.connect.CLIENT_SECRET)
        .map(res => res.json())
        .catch(this.handleError);
    }
  }

  //method to get all the repositories of the user
  getRepos() {
    if (this.userName) {
      return this._http.get(config.giturls.HOSTURLUSERS + this.userName +
          '/repos?client_id=' + config.connect.CLIENT_ID +
          '&client_secret=' + config.connect.CLIENT_SECRET)
        .map(res => res.json())
        .catch(this.handleError);
    }
  }

  //method to list down all the repositories
  getTree(repo) {
    if (this.userName) {
      return this._http.get(config.giturls.HOSTURL + this.userName + "/" +
          repo + '/contents?client_id=' + config.connect.CLIENT_ID +
          '&client_secret=' + config.connect.CLIENT_SECRET)
        .map(res => res.json())
        .catch(this.handleError);
    }
  }
  //method to display files
  getFile(repo, file) {
    if (this.userName) {
      let headers = new Headers({ 'accept': "application/vnd.github.VERSION.raw" });
      let options = new RequestOptions({ headers: headers });
      return this._http.get(config.giturls.HOSTURL + this.userName + "/" +
        repo + '/contents/' + file + '?client_id=' + config.connect.CLIENT_ID +
        '&client_secret=' + config.connect.CLIENT_SECRET, options)
    }
  }

  //method to create file on github
  createFile(text) {
    if (this.userName) {
      return this._http.get(config.giturls.HOSTURL + this.userName + '/' + text + '/git/refs/heads/master' + '?client_id=' + config.connect.CLIENT_ID +
          '&client_secret=' + config.connect.CLIENT_SECRET, this.authenticationService.addPersonalAccessToken())
        .map(res => res.json())
    }
  }


  //method to create file on github
  commitfile(text, sha) {
    if (this.userName) {
      return this._http.get(config.giturls.HOSTURL + this.userName + '/' + text + '/git/commits/' + sha + '?client_id=' + config.connect.CLIENT_ID +
          '&client_secret=' + config.connect.CLIENT_SECRET, this.authenticationService.addPersonalAccessToken())
        .map(res => res.json())
    }
  }

  //method to create file on github
  treecommit(text, basetree) {
    if (this.userName) {
      return this._http.post(config.giturls.HOSTURL + this.userName + '/' + text + '/git/trees' + '?client_id=' + config.connect.CLIENT_ID +
          '&client_secret=' + config.connect.CLIENT_SECRET, basetree, this.authenticationService.addPersonalAccessToken())
        .map(res => res.json())
    }
  }

  //method to create file on github
  newcommit(text, newcommit) {
    if (this.userName) {
      return this._http.post(config.giturls.HOSTURL + this.userName + '/' + text + '/git/commits' + '?client_id=' + config.connect.CLIENT_ID +
          '&client_secret=' + config.connect.CLIENT_SECRET, newcommit, this.authenticationService.addPersonalAccessToken())
        .map(res => res.json())
    }
  }

  //method to create a fiel on github 
  lastcommit(text, lastcommit) {
    if (this.userName) {
      return this._http.post(config.giturls.HOSTURL + this.userName + '/' + text + '/git/refs/heads/master' + '?client_id=' + config.connect.CLIENT_ID +
          '&client_secret=' + config.connect.CLIENT_SECRET, lastcommit, this.authenticationService.addPersonalAccessToken())
        .map(res => res.json())
    }
  }

  //method to update the user
  updateUser(userName: string) {
    this.userName = userName;
  }

  //method to handle error
  private handleError(error: any) {
    if (error.status === 401) {
      return Observable.throw(error.status);
    } else {
      return Observable.throw(error.status || 'Server error');
    }
  }

  //method to get the sha of the file   
  getsha(text, filename) {
    if (this.userName) {

      return this._http.get(config.giturls.HOSTURL + this.userName + '/' + text + config.giturls.CONTENTURL + filename, this.authenticationService.addPersonalAccessToken())

        .map(res => res.json())
    }
  }

  //method to update the file on github
  updateFile(text, filename, updateobj) {
    if (this.userName) {
      return this._http.put(config.giturls.HOSTURL + this.userName + '/' + text + config.giturls.CONTENTURL + filename, updateobj, this.authenticationService.addPersonalAccessToken())
        .map(res => res.json())
    }
  }

  //method to delete the file on github
  deleteFile(text, filename, deletefileobj) {
    console.log(this.authenticationService.addPersonalAccessToken());
    console.log(this.authenticationService.pacToken);
    if (this.userName) {

      let headers = new Headers({ 'Authorization': "Basic " + this.authenticationService.pacToken });
      return this._http.delete(config.giturls.HOSTURL + this.userName + '/' + text + config.giturls.CONTENTURL + filename, new RequestOptions({
          headers: headers,
          body: deletefileobj
        }))
        .map(res => res.json())
    }
  }

  //method to create user personal access token
  createToken(credentials, password) {
    if (this.userName) {
      return this._http.post('https://api.github.com/authorizations', credentials, this.authorizationToken(this.userName, password))
        .map(res => res.json())
    }
  }

  //method to create Repository on github
  createRepos(text) {
    if (this.userName) {
      return this._http.post(config.giturls.CREATEREPOS, text, this.authenticationService.addPersonalAccessToken())
        .map(res => res.json())
    }
  }

//method to get Folders inside the repository
  getFolderContents(repodetails:string) {
    repodetails=repodetails.trim();
      return this._http.get(config.giturls.HOSTURL+this.userName+'/'+repodetails+'/contents?client_id=' + config.connect.CLIENT_ID +
          '&client_secret=' +  config.connect.CLIENT_SECRET)

        .map(res => res.json())
        
   }

//method to get files inside the folder
   openFolder(value,reponamed) {
   let val=value;
      return this._http.get(config.giturls.HOSTURL+this.userName+"/"+reponamed+"/contents/"+val+ '?client_id=' + config.connect.CLIENT_ID +
          '&client_secret=' + config.connect.CLIENT_SECRET)
        .map(res => res.json())
    }

//method to get file data and pass to editor
   getFileData(path,reponamed){
      let headers = new Headers({ 'accept': "application/vnd.github.VERSION.raw" });
      let options = new RequestOptions({ headers: headers });
  return this._http.get("https://api.github.com/repos/"+this.userName+"/"+reponamed+"/contents/"+path+ '?client_id=' + config.connect.CLIENT_ID+
          '&client_secret=' +  config.connect.CLIENT_SECRET)
        .map(res => res.json())
        
   }

  //method for authorization for creating new repository
  private authorization(accessToken) {
    let headers = new Headers({ 'Authorization': "Basic " + accessToken });
    return new RequestOptions({ headers: headers });
  }

  //method for authorization for creating personal access token
  private authorizationToken(username, password) {
    let data = btoa(username + ':' + password)
    let headers = new Headers({ "Authorization": "Basic " + data });
    return new RequestOptions({ headers: headers })
  }

//GET LATEST COMMIT file
  getLatestRepoTree(reponame,sha){
    console.log('getLatestRepoTree')
    return this._http.get(config.giturls.HOSTURL+this.userName+'/'+reponame+'/contents/?ref='+sha+'&client_id=' + config.connect.CLIENT_ID +
          '&client_secret=' +  config.connect.CLIENT_SECRET)
      .map(res => res.json());
  }
}


