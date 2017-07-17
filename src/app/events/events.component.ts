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
  public copyLinkText = "";
  public copyTextActive;
  private userAccessToken = "";
  public filterArgs;
  private snackbar = null;
  private eventFilter = "";
  public currentEvent = new Event(0);
  public interval;
  @ViewChild("show") show;
  @ViewChild("showCopyText") showCopyText;
  @ViewChild("linkText") linkText;
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
        case "/events/invites":
          this.filterArgs = {type: "invites", eventInvites: this.user.eventInvites};
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
  public detectLoad(): void{
    if(this.socialDrawer && this.socialDrawer.nativeElement && this.socialDrawer.nativeElement.MaterialLayout) {
      console.log("loaded!");
      clearInterval(this.interval);
    }
    else {
      console.log("not yet loaded");
    }
  }

  ngOnInit() {
  }

  public copyText(): void {
    this.linkText.nativeElement.select();
    if (document.execCommand("copy")) {
      this.showCopyText.nativeElement.querySelector("button").innerHTML = "Copied";
    }
  }
  public openLinkCopier(eventUrl): void {
    this.copyTextActive = true;
    this.copyLinkText = eventUrl;
    let data = { 
      message: '',
      timeout: 50000,
      actionHandler: this.copyText.bind(this),
      actionText: 'Copy'
    };
    this.showCopyText.nativeElement.MaterialSnackbar.showSnackbar(data);
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit");
    this.interval = setInterval(this.detectLoad.bind(this), 5000);
    // let newsong = 'https://api.soundcloud.com/tracks/311739465';
    // let scId = this.soundcloudWidget.nativeElement.id;
    // let widget = SC.Widget(scId);
    // widget.bind(SC.Widget.Events.READY, function() {
    //   //widget.pause();
    //   widget.load(newsong);
    // });
  }
  public dontShowInviteUser() {
    // this.dontInviteUser = false;
  }

  public showInviteUser(friendName) {
    this.copyTextActive = false;
    let data = { 
      message: "You're now tracking " + friendName + ", but they're not using ShowGo. Would you like to send them a message to join our app?",
      timeout: 5000
    };
    this.showCopyText.nativeElement.MaterialSnackbar.showSnackbar(data);
  }

  public addFriend(event){
    if (event.isAdd) {
      console.log("adding");
      console.log(event.friend);
      //use the api service to add this friend id to the user's friends list
      this.apiService.friendPost(event.friend, this.user.accessToken).subscribe(response => {
        //response will be true or false based on success
        if(response) {
          this.user.friends.push(response.friend);
          //for each event, update it
          let events = this.eventComps.toArray()
          for (let i = 0; i < events.length; i++) {
            events[i].updateAfterFriend(this.user.friends);
          }
          this.apiService.findUser(event.friend.fbId).subscribe(response => {
            if (response) {
              // console.log("added friend is a user");
            }
            else {
              // console.log("added friend is not a user");
              this.showInviteUser(event.friend.name);
            }
          });
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
    // //use the api service to add this friend id to the user's friends list
    this.apiService.friendInvitePost(friend, this.currentEvent.fbId, this.user.accessToken).subscribe(response => {
      //response will be true or false based on success
      if(response) {
        console.log(response);
        //update the button to be grayed out
        this.user.invitesSent.push({
          eventId: this.currentEvent.fbId,
          friendInvited: friend.fbId
        });
        console.log(this.user.invitesSent);
      }
      else {
        console.log("friend invite failed");
      }
      
    });
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