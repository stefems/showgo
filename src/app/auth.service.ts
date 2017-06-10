import { Injectable } from '@angular/core';
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


@Injectable()
export class AuthService {
  
  private getUserUrl = "/api/getUser";
  isLoggedIn: boolean = false;

  private currentUser: BehaviorSubject<User> = new BehaviorSubject(new User(0));


  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor (private fb: FacebookService, private http: Http, private fbloginService: FbloginService) {
    this.checkLogin();
  }

  user() {
    return this.currentUser.asObservable();
  }

  getUser(fbId: string, access_token: string): any {

    return this.http.get(this.getUserUrl+"/"+fbId+"/"+access_token)
      .map((res:Response) => {
        console.log("getUser() in auth service");
        console.log(res);
        //TODO: unhappy path CURRENTLY TESTING HERE
        if (!res.json().error) {
          this.currentUser.next(new User(res.json()));
          this.isLoggedIn = true;
          localStorage.setItem('showgoUserLoggedIn', res.json().id);
          localStorage.setItem('showgoUserAT', res.json().access_token);
          // console.log("user ought to be logged in...");
          return this.currentUser.asObservable();
        }
        else {
          console.log("user login failed.");
          return this.currentUser.asObservable();
        }
      });
  }
  loggedIn(): boolean {
    return this.isLoggedIn;
  }

  login(): void {
    this.fb.getLoginStatus()
    .then((response: LoginResponse) => {
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
        this.fb.login()
        .then((response: LoginResponse) => {
          console.log("fb login()");
          if (response.authResponse) {
            let access_token = response.authResponse.accessToken;
            let fbId = response.authResponse.userID;
            this.getUser(fbId, access_token).subscribe(res => {
              if (res.dbId !== "") {
                this.isLoggedIn = true;
              }
            });
          }
        })
        .catch((error: any) => console.error(error));
      }
    });    
  }

  logout(): any {
    this.currentUser.next(new User(0));
    this.isLoggedIn = false;
    this.fb.logout();
    localStorage.clear();
  }

  checkLogin(): void {
    //look in local storage for keys
    if (localStorage.getItem('showgoUserLoggedIn') && localStorage.getItem("showgoUserAT")) {
      let fbId = localStorage.getItem('showgoUserLoggedIn');
      let at = localStorage.getItem("showgoUserAT");
      this.getUser(fbId, at).subscribe(res => {
        // console.log(res);
        if (res.dbId !== "") {
          this.isLoggedIn = true;
          // this.router.navigate(['/events']);
        }
      });
    }
  }
}