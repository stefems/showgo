import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService }      from './../api.service';
import { AuthService }      from './../auth.service';
import {EventComponent}				from './../event/event.component';
import {User} from '../user';
import {EventsFilterPipe} from './../pipes/events-filter.pipe';


declare var SC:any;


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
  private snackbar = null;

  @ViewChild('popup') popup: ElementRef;
  @ViewChild('soundcloudWidget') soundcloudWidget: ElementRef;
  @ViewChild('filterFriend') filterFriend: ElementRef;
  @ViewChild('filterMe') filterMe: ElementRef;
  @ViewChild('filterAll') filterAll: ElementRef;
  @ViewChild('filterFriend2') filterFriend2: ElementRef;
  @ViewChild('filterMe2') filterMe2: ElementRef;
  @ViewChild('filterAll2') filterAll2: ElementRef;


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
    let newsong = 'https://api.soundcloud.com/tracks/311739465';
    let scId = this.soundcloudWidget.nativeElement.id;
    let widget = SC.Widget(scId);
    widget.bind(SC.Widget.Events.READY, function() {
      //widget.pause();
      widget.load(newsong);
    });
    this.snackbar = this.popup.nativeElement.querySelector("#snackbar");
  }

  public triggerPopup(event): void {
    let data = {message: event};
    setInterval(() => {
      this.snackbar = this.popup.nativeElement.querySelector("#snackbar");
      if (this.snackbar) {
        this.snackbar.MaterialSnackbar.showSnackbar(data);
      }
      else {
        console.log("still undefined");
      } 
     }, 3000);
    console.log(this.snackbar);
  }

  public filter(type): void {
    this.filterAll.nativeElement.style.textDecoration = 'none';
    this.filterAll2.nativeElement.style.textDecoration = 'none';
    this.filterMe.nativeElement.style.textDecoration = 'none';
    this.filterMe2.nativeElement.style.textDecoration = 'none';
    this.filterFriend.nativeElement.style.textDecoration = 'none';
    this.filterFriend2.nativeElement.style.textDecoration = 'none';

    switch (type) {
      case "all":
        this.filterAll.nativeElement.style.textDecoration = 'underline';
        this.filterAll2.nativeElement.style.textDecoration = 'underline';
        this.filterArgs = null;
        break;
      case "me":
        this.filterMe.nativeElement.style.textDecoration = 'underline';
        this.filterMe2.nativeElement.style.textDecoration = 'underline';
        this.filterArgs = {type: "mine", events: this.user.events};
        break;
      case "friends":
        this.filterFriend.nativeElement.style.textDecoration = 'underline';
        this.filterFriend2.nativeElement.style.textDecoration = 'underline';
        this.filterArgs = {type: "friends", friends: this.user.friends};
        break;
    }
  }
}