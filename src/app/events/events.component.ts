import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService }      from './../api.service';
import { AuthService }      from './../auth.service';
import {EventComponent}				from './../event/event.component';
import {User} from '../user';
import {EventsFilterPipe} from './../pipes/events-filter.pipe';


// declare var SC:any;


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  public events = [];
  private userAccessToken = "";
  private user: any;
  public filterArgs;

  // @ViewChild('soundcloudWidget') soundcloudWidget: ElementRef;


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
  ngAfterViewInit() {
    // let newsong = 'https://api.soundcloud.com/tracks/311739465';
    // let scId = this.soundcloudWidget.nativeElement.id;
    // let widget = SC.Widget(scId);
    // widget.bind(SC.Widget.Events.READY, function() {
    //   //widget.pause();
    //   widget.load(newsong);
    // });
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
