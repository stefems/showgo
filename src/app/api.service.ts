import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import {BehaviorSubject} from "rxjs/Rx";
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/toPromise';


import {User} from './user';
import {Event} from './event';

@Injectable()
export class ApiService {

  private eventsObservableSource = new Subject<Event[]>(); 
  eventsObservable = this.eventsObservableSource.asObservable();
  private getEventsUrl = "/api/events";
  private postEventActionUrl = "/api/eventAction";
  private postFriend = "/api/friend";
  private postUnfriend = "/api/unfriend";
  private postFriendInvite = "/api/friendInvite";
  private getFindUser = '/api/findUser';
  private getUser = '/api/user';
  private clearNotifs = '/api/clearNotifs';
  private deleteSuggestion = '/api/suggestion';
  private saveUserUrl = '/api/saveUser';

  public headers = new Headers({ 'Content-Type': 'application/json' });
  public options = new RequestOptions({ headers: this.headers });

  private eventsProvided: BehaviorSubject<Event[]> = new BehaviorSubject([]);

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor (private http: Http) {
    this.loadEvents(16).subscribe(res => {
      // console.log("api service load events res");
      // console.log(res);
      this.eventsProvided.next(res);
    });
  }


  clearNotifications(access_token: string, isFriend: string): Observable<boolean> {
    let url = this.clearNotifs + "/" + access_token + "/" + isFriend;
    return this.http.post(url, {}, this.options)
      .map((res:Response) => {
        // console.log(res);
        if (!res.json().error) {
          return true;
        }
        else {
          return false;
        }
    });
  }
  saveUser(user): Observable<any> {
    let url = this.saveUserUrl;
    let body = JSON.stringify(user);
    console.log("api saveUser");
    return this.http.post(url, body, this.options)
      .map((res:Response) => {
        console.log(res);
        if (!res.json().error) {
          console.log("success");
          return true;
        }
        else {
          console.log("error")
          return false;
        }
      });
  }

  friendSuggestionDelete(access_token: string, friendId: string): Observable<boolean> {
    let url = this.deleteSuggestion + "/" + access_token + "/" + friendId;
    // console.log(url);
    return this.http.delete(url, this.options)
      .map((res:Response) => {
        // console.log(res);
        if (!res.json().error) {
          return true;
        }
        else {
          return false;
        }
    });
  }

  userGet(fbId): Observable<any> {
    return this.http.get(this.getUser + "/" + fbId)
      .map((res:Response) => {
        // console.log(res);
        if (!res.json().error) {
          return res.json();
        }
        else {
          console.log("null friend");
          return null;
        }
    });
    //look for db for user with this id
      //if found, return the picture and name
      //if not found, send requests to backend
  }

  friendPost(friend, access_token: string): Observable<any> {
    let url = this.postFriend + "/" + access_token + "/" + friend.fbId;
    let body = JSON.stringify(friend);
    return this.http.post(url, body, this.options)
      .map((res:Response) => {
        if (!res.json().error) {
          return res.json();
        }
        return false;
      });
  }
  
  friendInvitePost(friend, eventId, access_token: string): Observable<boolean> {
    //if fbid is a user, send a showgo notification, otherwise tack the invite onto the friend object
    let url = this.postFriendInvite + "/" + eventId + "/" + friend.fbId;
    return this.http.post(url, JSON.stringify({access_token: access_token}), this.options)
      .map((res:Response) => {
        if (!res.json().error) {
          return true;
        }
        else {
          console.log(res.json().error);
        }
        return false;
      });
  }

  unfriendPost(friend, access_token: string): Observable<boolean> {
    let url = this.postUnfriend + "/" + access_token + "/" + friend.fbId;
    let body = JSON.stringify(friend);
    return this.http.post(url, body, this.options)
      .map((res:Response) => {
        if (!res.json().error) {
          return true;
        }
        else {
          console.log(res.json().error)
        }
        return false;
      });
  }

  //todo: ERROR HANDLING?
  eventPost(eventType: string, eventId: string, userId: string): Observable<boolean> {
    var url = this.postEventActionUrl + "/" + eventType + "/" + eventId + "/" + userId + "/" + localStorage.getItem("showgoUserAT");
    return this.http.post(url, {}, this.options)
      .map((res:Response) => {
        if (!res.json().error) {
          return true;
        }
        else {
          console.log(res.json().error);
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
    return this.eventsProvided.asObservable();
  }

  loadEvents(last): Observable<Event[]> {
    return this.http.get(this.getEventsUrl+"/"+last)
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

  loadMoreEvents(lastEventToLoad): void {
    console.log("loadMoreEvents() " + lastEventToLoad);
    this.loadEvents(lastEventToLoad).subscribe(res => {
      // console.log("api service load events res");
      // console.log(res);
      this.eventsProvided.next(res);
    });
  }

  findUser(friendId): Observable<boolean> {
    return this.http.get(this.getFindUser + "/" + friendId)
      .map((res:Response) => {
        if (!res.json().error) {
          return true;
        }
        else {
          return false;
        }
      });
  }
}