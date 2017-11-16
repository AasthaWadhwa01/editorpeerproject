import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../../shared/services/authentication.service'
import swal from 'sweetalert2';
import { config } from '../../config/nav.config';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AuthenticationService]
})
export class NavbarComponent implements OnInit {

  config = config
  //constructor to create instance of services
  constructor(private router: Router,
    private authenticationservice: AuthenticationService) {}

  //ngOnInit method
  ngOnInit() {}

  //method to logout from github 
  logout() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    let userId = user.userId;
    user = {
      userId: userId
    }
    this.authenticationservice.logoutEditor(user).subscribe((data1) => {
      if (data1.status == 200) {
        swal({
          timer: 2500,
          title: this.config.navbar.LOGOUTSUCCESS,
          text: "",
          type: this.config.navbar.SUCCESS,
          showConfirmButton: false,
        }).catch(swal.noop);

        this.router.navigate(["/"]);
        localStorage.removeItem('currentUser');
      }
    })
  }
}
