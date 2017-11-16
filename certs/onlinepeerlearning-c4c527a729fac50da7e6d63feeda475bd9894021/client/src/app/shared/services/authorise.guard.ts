import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
//AuthoriseGuard class implemenmting canActivate method to protect routes
export class AuthoriseGuard implements CanActivate {
 public authorised: boolean;
 public token: any;

 constructor(private route: Router) {}

 //calling isAuthorised method to check user authorisation
 canActivate() {
   return this.isAuthorised();
 }

 //checking valid or invalid user
 private isAuthorised(): boolean {
   //accessing token from local storage
   let user =JSON.parse(localStorage.getItem('currentUser'));
   let token=user.token;
   //if token is valid then user can visit different routes
   if (token) {
     this.authorised = true;
   }
   //redirect user to login page
   else
   {
     this.authorised = false;
     this.route.navigate(['/']);
   }
   return this.authorised;
 }

}


