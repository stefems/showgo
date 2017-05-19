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
  private postEventActionUrl = "http://45.55.156.114:3000/api/eventAction";
  private postJoinUrl = "http://45.55.156.114:3000/api/join";
  private postDeclineUrl = "http://45.55.156.114:3000/api/decline";
  private postInterestedUrl = "http://45.55.156.114:3000/api/interested";
  private postFriend = "http://45.55.156.114:3000/api/friend";

  public headers = new Headers({ 'Content-Type': 'application/json' });
  public options = new RequestOptions({ headers: this.headers });


  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor (private http: Http) {}

  friendPost(friendId: string, access_token: string): Observable<boolean> {
    let url = this.postFriend + "/" + access_token + "/" + friendId;
    return this.http.post(url, {}, this.options)
      .map((res:Response) => {
        console.log(res);
        if (res.status) {
          return true;
        }
        return false;
      });
  }

  //todo: ERROR HANDLING?
  eventPost(eventType: string, eventId: string, userId: string): Observable<boolean> {
    var url = this.postEventActionUrl + "/" + eventType + "/" + eventId + "/" + userId;
    console.log(url);
    return this.http.post(url, {}, this.options)
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

  //ARE THESE USED ANYMORE? SHOULD BE DELETED?
  // postJoin(eventId: string, user_id: string): Observable<boolean> {
  //   var url = this.postJoinUrl + "/" + eventId + "/" + user_id;
  //   return this.http.post(url, {}, this.options)
  //     .map((res:Response) => {
  //       console.log(res);
  //       if (res) {
  //         return true;
  //       }
  //       return false;
  //     });
  //     //TODO: how the fuck do these catches work
  //     /*
  //     .catch(err => {
  //       console.log(err);
  //       return false;
  //     });*/
  // }
  // postDecline(eventId: string, access_token: string): Observable<boolean> {
  //   var url = this.postDeclineUrl + "/" + eventId + "/" + access_token;
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http.post(url, {}, options)
  //     .map((res:Response) => {
  //       console.log(res);
  //       if (res) {
  //         return true;
  //       }
  //       return false;
  //     });
  //     //TODO: how the fuck do these catches work
  //     /*
  //     .catch(err => {
  //       console.log(err);
  //       return false;
  //     });*/
  // }
  // postInterested(eventId: string, access_token: string): Observable<boolean> {
  //   var url = this.postInterestedUrl + "/" + eventId + "/" + access_token;
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http.post(url, {}, options)
  //     .map((res:Response) => {
  //       console.log(res);
  //       if (res) {
  //         return true;
  //       }
  //       return false;
  //     });
  // }

}