import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Subject} from "rxjs/Rx";
import {BehaviorSubject} from "rxjs/Rx";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FacebookService, LoginResponse } from 'ngx-facebook';


import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/toPromise';
import {User} from './user';

@Injectable()
export class AuthService {

  // private statusObservableSource = new Subject<boolean>(); 
  // statusObservable = this.statusObservableSource.asObservable();
  // private userObservableSource = new Subject<User>(); 
  // userObservable = this.userObservableSource.asObservable();
  // private user = this.userObservableSource.asObservable();
  // private checkLoginUrl = "http://45.55.156.114:3000/loginCheck";
  private getUserUrl = "https://salty-citadel-53279.herokuapp.com/api/getUser";
  isLoggedIn: boolean = false;

  private currentUser: BehaviorSubject<User> = new BehaviorSubject(new User(0));


  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor (private fb: FacebookService, private http: Http) {
    
  }

  user() {
    return this.currentUser.asObservable();
  }

  getUser(fbId: string, access_token: string): any {
    return this.http.get(this.getUserUrl+"/"+fbId+"/"+access_token)
      .flatMap((res:Response) => {
        // console.log("getUser() in auth service");
        // console.log(res.json());
        //TODO: unhappy path CURRENTLY TESTING HERE
        if (!res.json().error) {
          this.currentUser.next(new User(res.json()));
          this.isLoggedIn = true;
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

  logout(): void {
    this.currentUser.next(new User(0));
    this.isLoggedIn = false;
  }
}