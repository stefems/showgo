import { Component, OnInit, ViewChild, ViewChildren, EventEmitter, ElementRef, Input, QueryList, ContentChildren } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationEnd } from '@angular/router';
import { ApiService }      from './../api.service';
import { AuthService }      from './../auth.service';
import {EventComponent}				from './../event/event.component';
import {User} from '../user';
import {Event} from '../event'
import {EventsFilterPipe} from './../pipes/events-filter.pipe';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {


  public inviteOpen = false;
  public events = [];
  private userAccessToken = "";
  public filterArgs;
  private snackbar = null;
  private eventFilter = "";
  public currentEvent = new Event(0);
  @ViewChildren("eventComps") eventComps: QueryList<EventComponent>;
  @Input("user") user;
  @ViewChild('drawer') drawer: ElementRef;
  @ViewChild('socialDrawer') socialDrawer: ElementRef;
  @ViewChild('socialContainer') socialContainer: ElementRef;
  
  constructor(private router: Router, private apiService: ApiService, private authService: AuthService) {
    this.router.events.subscribe((val) => {
      this.eventFilter = val.url;
      switch (val.url) {
        case "/events/me":
          this.filterArgs = {type: "mine", events: this.user.events};
          break;
        case "/events/friends":
          this.filterArgs = {type: "friends", friends: this.user.friends};
          break;
        case "/events/all":
          this.filterArgs = null;
          break;
      }
    });

    this.authService.user().subscribe(response => {
      this.user = response;
    });
    this.apiService.getEvents().subscribe(response => {
      this.events = response;
    });
  }
  
  ngOnInit() {
    console.log("ngOnInit");
  }
  ngAfterViewInit() {
    console.log("ngAfterViewInit");
    let newsong = 'https://api.soundcloud.com/tracks/311739465';
    // let scId = this.soundcloudWidget.nativeElement.id;
    // let widget = SC.Widget(scId);
    // widget.bind(SC.Widget.Events.READY, function() {
    //   //widget.pause();
    //   widget.load(newsong);
    // });
    // this.snackbar = this.popup.nativeElement.querySelector("#snackbar");
  }

  public addFriend(event){
    if (event.isAdd) {
      console.log("adding");
      //use the api service to add this friend id to the user's friends list
      this.apiService.friendPost(event.friend, this.user.accessToken).subscribe(response => {
        //response will be true or false based on success
        if(response) {
          console.log(response);
          this.user.friends.push(event.friend);
          //for each event, update it
          let events = this.eventComps.toArray()
          for (let i = 0; i < events.length; i++) {
            events[i].updateAfterFriend(this.user.friends);
          }
        }
        else {
          console.log("friend not added");
        }
      });
    }
    else {
      console.log("removing");
      //use the api service to add this friend id to the user's friends list
      this.apiService.unfriendPost(event.friend, this.user.accessToken).subscribe(response => {
        //response will be true or false based on success
        if(response) {
          console.log(response);
          for (let i = 0; i < this.user.friends.length; i++) {
            if (this.user.friends[i].fbId == event.friend.fbId) {
              this.user.friends.splice(i, 1);
            }
          }
          //for each event, update it
          let events = this.eventComps.toArray()
          for (let i = 0; i < events.length; i++) {
            events[i].updateAfterFriend(this.user.friends);
          }
        }
        else {
        }
      });
    }

  }

  public inviteFriend(friend): void {
    console.log("trying to invite: "+ friend.name);
    /*
    //use the api service to add this friend id to the user's friends list
      this.apiService.friendPost(event.friend, this.user.accessToken).subscribe(response => {
        //response will be true or false based on success
        if(response) {
          console.log(response);
          this.user.friends.push(event.friend);
          //for each event, update it
          let events = this.eventComps.toArray()
          for (let i = 0; i < events.length; i++) {
            events[i].updateAfterFriend(this.user.friends);
          }
        }
        else {
          console.log("friend not added");
        }
      });
    */
  }

  public openSocial(event): void {
    this.currentEvent = event;
    this.socialDrawer.nativeElement.MaterialLayout.toggleDrawer();
    this.socialContainer.nativeElement.style.width="100%";
    this.socialContainer.nativeElement.style.height="100%";
    this.drawer.nativeElement.style.width="100%";
  }

  public closeSocial(): void {
    this.closeInvite();
    this.socialDrawer.nativeElement.MaterialLayout.toggleDrawer();
    this.drawer.nativeElement.style.width="240px";
    this.socialContainer.nativeElement.style.width="0";
    this.socialContainer.nativeElement.style.height="0";
  }

  public openInvite(): void {
    if (this.inviteOpen) {
      this.closeInvite();
    }
    else {
      this.inviteOpen = true;
    }

  }
  public closeInvite(): void {
    this.inviteOpen = false;
  }

  public filter(type): void {
    switch (type) {
      case "all":
        this.filterArgs = null;
        break;
      case "me":
        this.filterArgs = {type: "mine", events: this.user.events};
        break;
      case "friends":
        this.filterArgs = {type: "friends", friends: this.user.friends};
        break;
    }
  }
}