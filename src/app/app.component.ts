import { Component } from '@angular/core';
import { AuthService }      from './auth.service';
import { Subscription } from 'rxjs/Subscription';
import {User} from './user';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {FbloginService} from './fblogin.service';
import { FacebookService, LoginResponse } from 'ngx-facebook';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ShowGo';
  loginStatus: boolean = false;
  subscription = Subscription;
  loginStatusObservable: boolean = false;
  user: any;
  hasScrolled = false;

  
  constructor(private authService: AuthService, private router: Router, private fb: FacebookService, private fbloginService: FbloginService){    
    this.authService.user().subscribe(response => {
      // console.log("app constructor()");
      // console.log(response);
      this.user = response;
    });
  }

  ngOnInit(){

  }
  
  login(): void {
    console.log("login()");
    //todo: use this to prevent error:
    this.fb.getLoginStatus()
    .then((response: LoginResponse) => {
      console.log("getLoginStatus()");
      console.log(response);
      if (response.status === 'connected') {
        let access_token = response.authResponse.accessToken;
        let fbId = response.authResponse.userID;
        this.authService.getUser(fbId, access_token).subscribe(res => {
          console.log(res);
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
          console.log("fb login()");
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
                this.router.navigate(['/splash']);
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

  logout(): void {
    console.log("logout()");
    this.authService.logout();
    this.router.navigate(['/splash']);
  }

  home(): void {
    console.log("home()");
    this.router.navigate(['/']);
  }
}
