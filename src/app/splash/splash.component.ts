import { Component, OnInit } from '@angular/core';
import { AuthService }      from '../auth.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {FbloginService} from '../fblogin.service';
import { FacebookService, LoginResponse } from 'ngx-facebook';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private fb: FacebookService, private fbloginService: FbloginService) { }

  ngOnInit() {
  }
  login(): void {
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
            this.router.navigate(['/splash']);
            console.log("Failed to log into facebook. Can you try again?");
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
                console.log("Failed to log into facebook. Can you try again?");
              }
            });
          }
        })
        .catch((error: any) => console.error(error));
      }
    });    
     // this.router.navigate(['/log']);
  }

}
