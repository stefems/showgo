import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import {Observable} from 'rxjs/Rx';
import {Subject} from "rxjs/Rx";
import {BehaviorSubject} from "rxjs/Rx";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FacebookService, LoginResponse } from 'ngx-facebook';
import {FbloginService} from './fblogin.service';



import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/toPromise';
import {User} from './user';

declare var FB: any;

@Injectable()
export class AuthService {
  
  private getUserUrl = "/api/getUser";
  isLoggedIn: boolean = false;

  private currentUser: BehaviorSubject<User> = new BehaviorSubject(new User(0));


  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor (private router: Router, private fb: FacebookService, private http: Http, private fbloginService: FbloginService) {
    this.checkLogin();
    let initParams = {
      appId: '1928641050691340',
      xfbml: true,
      version: 'v2.8',
    };

    FB.init(initParams);
  }

  user() {
    return this.currentUser.asObservable();
  }

  getUser(fbId: string, access_token: string): any {

    return this.http.get(this.getUserUrl+"/"+fbId+"/"+access_token)
      .map((res:Response) => {
        console.log("getUser() in auth service");
        console.log(res);
        if (!res.json().error) {
          this.currentUser.next(new User(res.json()));
          this.isLoggedIn = true;
          localStorage.setItem('showgoUserLoggedIn', res.json().id);
          localStorage.setItem('showgoUserAT', res.json().access_token);
          // console.log("user ought to be logged in...");
          return this.currentUser.asObservable();
        }
        else {
          this.logout();
          return this.currentUser.asObservable();
        }
      });
  }

  getId(access_token: string): any {
    return this.http.get("/api/getId/" + access_token)
      .map((res:Response) => {
        //TODO: unhappy path CURRENTLY TESTING HERE
        if (!res.json().error) {
          return res.json().id;
        }
        else {
          console.log("could not get the user id from the access token.");
          return false;
        }
      });
  }

  loggedIn(): boolean {
    return this.isLoggedIn;
  }

  login(): void {
    console.log("auth service login()");
    this.fb.getLoginStatus()
    .then((response: LoginResponse) => {
      console.log(response.status);
      if (response.status === 'connected') {
        console.log("connected");
        let access_token = response.authResponse.accessToken;
        let fbId = response.authResponse.userID;
        this.getUser(fbId, access_token).subscribe(res => {
          if (res.dbId !== "") {
            this.isLoggedIn = true;
          }
        });
      }
      else {   
        window.location.href="https://www.facebook.com/v2.9/dialog/oauth?client_id=1928641050691340&redirect_uri="+window.location.href+"&response_type=token&scope=user_friends,rsvp_event,user_events";
      }
    }).catch((error: any) => console.error(error));;
  }

  logout(): any {
    this.fb.getLoginStatus()
    .then((response: LoginResponse) => {
      console.log(response.status);
      this.currentUser.next(new User(0));
      this.isLoggedIn = false;
      localStorage.clear();
      if (response.status === 'connected') {
        console.log("logging out...");
        this.fb.logout().then( (res) => {
          console.log(res.authResponse);
          this.fb.getLoginStatus()
          .then((r: LoginResponse) => {
            console.log(r.status);
          });
        });
      }
    });
  }

  loginNew(): void {
    console.log("auth service login()");
    FB.getLoginStatus(function(response) {
      console.log(response.status);
      if (response.status === 'connected') {
        console.log("connected");
        let access_token = response.authResponse.accessToken;
        let fbId = response.authResponse.userID;
        this.getUser(fbId, access_token).subscribe(res => {
          if (res.dbId !== "") {
            this.isLoggedIn = true;
          }
        });
      }
      else {   
        window.location.href="https://www.facebook.com/v2.9/dialog/oauth?client_id=1928641050691340&redirect_uri="+window.location.href+"&response_type=token&scope=user_friends,rsvp_event,user_events";
      }
    }, true);
  }

  logoutNew(): any {
    FB.getLoginStatus(function(response) {
      console.log(response.status);
      this.currentUser.next(new User(0));
      this.isLoggedIn = false;
      localStorage.clear();
      if (response.status === 'connected') {
        console.log("logging out...");
        FB.logout(function(res) {
          console.log(res.authResponse);
          FB.Auth.setAuthResponse(null, 'unknown');
          FB.getLoginStatus(function(response) {
            console.log(response.status);
          }, true);
        });
      }
    }.bind(this), true);
  }

  checkLogin(): void {

    if (window.location.hash) {
      // console.log("hash");
      let access_token = window.location.hash.split("=")[1].split("&")[0];
      this.getId(access_token).subscribe(res => {
        // console.log(res);
        // console.log(access_token);
        if (res) {
          this.getUser(res, access_token).subscribe(res => {
            // console.log(res);
            if (res.dbId !== "") {
              this.isLoggedIn = true;
            }
          });
        }
      });
    }
    //look in local storage for keys
    else if (localStorage.getItem('showgoUserLoggedIn') && localStorage.getItem("showgoUserAT")) {
      // console.log("localstorage");
      let fbId = localStorage.getItem('showgoUserLoggedIn');
      let at = localStorage.getItem("showgoUserAT");
      // console.log(fbId + " " + at);
      this.getUser(fbId, at).subscribe(res => {
        if (res.dbId !== "") {
          this.isLoggedIn = true;
        }
      });
    }
    else {
      // console.log("none");
    }
  }
}