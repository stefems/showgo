import { Component, OnInit } from '@angular/core';
import { ApiService }      from './../api.service';
import { AuthService }      from './../auth.service';
import {EventComponent}				from './../event/event.component';
import {User} from '../user';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  private events = [];
  private userAccessToken = "";
  private user: any;

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

}
