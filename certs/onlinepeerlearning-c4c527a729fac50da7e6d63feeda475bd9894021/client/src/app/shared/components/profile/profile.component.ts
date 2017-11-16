import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Headers, RequestOptions } from '@angular/http';

import { ProfileService } from '../../services/profile.service';
import {config} from '../../config/profileConfig';
import { errorConfig } from '../../config/errorConfig';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  userInfo:FormGroup;
  currentUser:any;
  imgPath:string='';
  formData: FormData;
  options: RequestOptions;
  config=config;
  errorConfig= errorConfig;

  constructor(@Inject(FormBuilder) private fb: FormBuilder,private profileService:ProfileService) {
    // initialising user details to be displayed
    this.userInfo = fb.group({
      userid: ['', [Validators.required]],
      repos_url: ['', [Validators.required]],
      public_repos: ['', [Validators.required]],
      avatar_url: ['', [Validators.required]],
      name: ['', [Validators.required]]
    }); 

  }
  // method to be called when the component loads
  ngOnInit() {
    this.currentUser= JSON.parse(localStorage.getItem('currentUser'))
    this.profileService.getDataFromDB(this.currentUser.userId)
    .subscribe((res)=>{
      let data={
        userid:res.data.userId,
        public_repos:res.data.publicRepos,
        avatar_url:res.data.avatarUrl,
        name:this.currentUser.userName
      }
      this.imgPath=data.avatar_url;
      this.displayData(data);
    })
  }
  // method to display data when the component loads---method called in ngOnInit()
  displayData(data:any){
    this.userInfo=this.fb.group({
      userid:[data.userid],
      name:[data.name],
      repos_url:[data.repos_url],
      public_repos:[data.public_repos]
    })
  }
  // method to be called when file upload button is clicked
    fileChange(event) {
      this.formData= new FormData();
   let fileList: FileList = event.target.files;
   if(fileList.length > 0) {
    let file: File = fileList[0];
    this.formData.append('uploadFile', file, file.name);
    let headers = new Headers();
    headers.append('enctype', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    this.options = new RequestOptions({ headers: headers });
     
   }
}

// method to be called when Upload button is clicked
uploadFile(){
  this.profileService.uploadFile(this.currentUser.userId,this.formData,this.options)
  .subscribe(
    res=>{
      this.imgPath=res.data.avatarUrl;
    },error=> {{errorConfig.error.UPLOAD}}
    )
}
}


  
