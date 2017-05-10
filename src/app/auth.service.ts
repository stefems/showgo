import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FacebookService, LoginResponse } from 'ngx-facebook';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/toPromise';
import { Subject }    from 'rxjs/Subject';
import {User} from './user';

@Injectable()
export class AuthService {

  private statusObservableSource = new Subject<boolean>(); 
  statusObservable = this.statusObservableSource.asObservable();
  private userObservableSource = new Subject<User>(); 
  userObservable = this.userObservableSource.asObservable();
  isLoggedIn: boolean = false;
  private user: User = null;
  private checkLoginUrl = "http://45.55.156.114:3000/loginCheck";
  private getUserUrl = "http://45.55.156.114:3000/api/getUser";

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor (private fb: FacebookService, private http: Http) {}

  // login(): Promise<boolean> {
  //   return this.http.get(this.checkLoginUrl)
  //     .toPromise()
  //     .then(response => response.json().status)
  //     .catch(err => console.log(err));
  // }
  login(): Observable<boolean> {
    return this.http.get(this.checkLoginUrl)
      .map((res:Response) => res.json().status);
  }
  getUser(fbId: string, access_token: string): any {
    if (this.isLoggedIn) {
      return this.user;
    }
    else if (fbId === "" || access_token === "") {
      return {"id": "1"};
    }
    else {
      var currentUser = this.user;
      return this.http.get(this.getUserUrl+"/"+fbId+"/"+access_token)
        .map((res:Response) => {
          console.log("getUser() in auth service");
          console.log(res.json());
          if (!res.json().error) {
            currentUser = new User(res.json());
            this.isLoggedIn = true;
            return currentUser;
          }
          else {
            return {"id": "1"};
          }
        })
        .toPromise();
    }
  }
  loggedIn(): boolean {
    return this.isLoggedIn;
  }

  logout(): void {
    this.user = null;
    this.isLoggedIn = false;
  }
}