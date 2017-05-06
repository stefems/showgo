import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

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
  private checkLoginUrl = "http://45.55.156.114:3000/loginCheck";
  private getUserUrl = "http://45.55.156.114:3000/getUser";

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor (private http: Http) {}

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
  getUser(): Observable<User> {
    return this.http.get(this.getUserUrl)
      .map((res:Response) => new User(res.json()));
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}