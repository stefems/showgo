import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/toPromise';
import { Subject }    from 'rxjs/Subject';
import {User} from './user';
import {Event} from './event';

@Injectable()
export class ApiService {

  private eventsObservableSource = new Subject<Event[]>(); 
  eventsObservable = this.eventsObservableSource.asObservable();
  private getEventsUrl = "http://45.55.156.114:3000/api/events";
  private postJoinUrl = "http://45.55.156.114:3000/api/join";
  private postDeclineUrl = "http://45.55.156.114:3000/api/decline";
  private postInterestedUrl = "http://45.55.156.114:3000/api/interested";


  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor (private http: Http) {}

  // login(): Promise<boolean> {
  //   return this.http.get(this.checkLoginUrl)
  //     .toPromise()
  //     .then(response => response.json().status)
  //     .catch(err => console.log(err));
  // }
  getEvents(): Observable<Event[]> {
    return this.http.get(this.getEventsUrl)
      .map((res:Response) => {
        let eventArray = [];
        for (let i = 0; i < res.json().length; i++) {
          let newEvent = new Event(res.json()[i]);
          eventArray.push(newEvent);
        }
        res.json()
        return eventArray;
      });
  }
  postJoin(eventId: string, user_id: string): Observable<boolean> {
    var url = this.postJoinUrl + "/" + eventId + "/" + user_id;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, {}, options)
      .map((res:Response) => {
        console.log(res);
        if (res) {
          return true;
        }
        return false;
      });
      //TODO: how the fuck do these catches work
      /*
      .catch(err => {
        console.log(err);
        return false;
      });*/
  }
  postDecline(eventId: string, access_token: string): Observable<boolean> {
    var url = this.postDeclineUrl + "/" + eventId + "/" + access_token;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, {}, options)
      .map((res:Response) => {
        console.log(res);
        if (res) {
          return true;
        }
        return false;
      });
      //TODO: how the fuck do these catches work
      /*
      .catch(err => {
        console.log(err);
        return false;
      });*/
  }
  postInterested(eventId: string, access_token: string): Observable<boolean> {
    var url = this.postInterestedUrl + "/" + eventId + "/" + access_token;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, {}, options)
      .map((res:Response) => {
        console.log(res);
        if (res) {
          return true;
        }
        return false;
      });
  }

}