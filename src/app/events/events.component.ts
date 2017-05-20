import { Component, OnInit } from '@angular/core';
import { ApiService }      from './../api.service';
import { AuthService }      from './../auth.service';
import {EventComponent}				from './../event/event.component';
import {User} from '../user';
import {EventsFilterPipe} from './../pipes/events-filter.pipe';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  private events = [];
  private userAccessToken = "";
  private user: any;
  private filterArgs;

  constructor(private apiService: ApiService, private authService: AuthService) {
    this.authService.user().subscribe(response => {
      this.user = response;
    });
    this.apiService.getEvents().subscribe(response => {
      this.events = response;
    });
  }

  ngOnInit() {
  }

  public filterFriends(): void {
    //set the filter args to friends
    this.filterArgs = {type: "friends", friends: this.user.friends};
  }
  public filterNone(): void {
    //set the filter args to friends
    this.filterArgs = null;
  }
  public filterMine(): void {
    //set the filter args to friends
    this.filterArgs = {type: "mine", events: this.user.events};
  }
}
