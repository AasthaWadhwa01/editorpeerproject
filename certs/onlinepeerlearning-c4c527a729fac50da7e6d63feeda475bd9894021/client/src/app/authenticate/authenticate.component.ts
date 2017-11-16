import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})

export class AuthenticateComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute, private authenticationservice: AuthenticationService
  ) {}


  ngOnInit() {
    //get userId and token from the URL
    let userId = this.route.snapshot.params['userId'];
    let token = this.route.snapshot.params['token'];

    //call method  to find username of this userId
    this.authenticationservice.getUser(userId).subscribe(data => {
      if (data.status == 200) {
        let userInfo = {
          userId: userId,
          token: token,
          userName: data.data.userName
        }

        this.authenticationservice.setUserInfo(userInfo);

      } else {
        this.router.navigate(["/error"])

      }
    })
  }
}
