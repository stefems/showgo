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
  
}