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
    //todo: use this to prevent error:
    this.fb.getLoginStatus()
    .then((response: LoginResponse) => {
      if (response.status === 'connected') {
        let access_token = response.authResponse.accessToken;
        let fbId = response.authResponse.userID;
        this.authService.getUser(fbId, access_token).subscribe(res => {
          // console.log(res);
          //RES received isn't been handled...
          if (res.dbId !== "") {
            this.router.navigate(['/events']);
          }
          else {
            this.message = "Failed to log into facebook. Can you try again?";
          }
        });
      }
      else {
        this.fb.login()
        .then((response: LoginResponse) => {
          console.log("login()");
          console.log(response);
          if (response.authResponse) {
            let access_token = response.authResponse.accessToken;
            let fbId = response.authResponse.userID;
            this.authService.getUser(fbId, access_token).subscribe(res => {
              console.log("getUser()");
              console.log(res);
              //RES received else isn't been handled...
              if (res.dbId !== "") {
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
    });    
  }
}
