import { Component, OnInit } from '@angular/core';
import {FbloginService} from '../fblogin.service';
import { AuthService }      from '../auth.service';

import { FacebookService, LoginResponse } from 'ngx-facebook';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  user = null;
  message = "Please login!";
  constructor(private authService: AuthService, private router: Router, private fb: FacebookService, private fbloginService: FbloginService) {

  }

  ngOnInit() {
  }

  loginWithFacebook(): void {
 
    this.fb.login()
      .then((response: LoginResponse) => {
      	console.log("login()");
      	if (response.authResponse) {
      		let access_token = response.authResponse.accessToken;
      		let fbId = response.authResponse.userID;
	        this.authService.getUser(fbId, access_token).then(authResponse => {
      		  console.log("getUser()");
      		  if (authResponse.id != "1") {
      		  	this.router.navigate(['/events']);
      		  }
            else {
              this.message = "Failed to log into facebook. Can you try again?";
            }
	        });
	    }
      })
      .catch((error: any) => console.error(error));
 
  }
}
