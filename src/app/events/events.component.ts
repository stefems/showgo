import { Component, OnInit, ViewChild, ViewChildren, EventEmitter, ElementRef, Input, QueryList, ContentChildren, ViewEncapsulation} from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationEnd } from '@angular/router';
import { ApiService }      from './../api.service';
import { AuthService }      from './../auth.service';
import {EventComponent}				from './../event/event.component';
import {User} from '../user';
import {Event} from '../event'
import {EventsFilterPipe} from './../pipes/events-filter.pipe';

declare var componentHandler:any;

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  public loaded = true;
  public eventsLoaded = false;
  public inviteOpen = false;
  public events = [];
  public eventsToShow = 10;
  public copyLinkText = "";
  public copyTextActive;
  private userAccessToken = "";
  public filterArgs;
  private snackbar = null;
  private eventFilter = "";
  public currentEvent = new Event(0);
  public interval;
  private currentScroll;
  private time = 0;
  @ViewChild("show") show;
  @ViewChild("eventsContainer") eventsContainer: ElementRef;;
  @ViewChildren("eventComps") eventComps: QueryList<EventComponent>;
  @Input("user") user;
  @ViewChild('drawer') drawer: ElementRef;
  @ViewChild('socialDrawer') socialDrawer: ElementRef;
  @ViewChild('socialContainer') socialContainer: ElementRef;
  
  constructor(private router: Router, private apiService: ApiService, private authService: AuthService) {
    // setInterval(function() {
    //   this.time++;
    //   console.log(this.time);
    // }.bind(this), 1000);
    
    this.filterArgs = {type: "", events: [], totalEventCount: this.eventsToShow};
    
    // console.log("constructor");
    this.router.events.subscribe((val) => {
      // console.log(val);
      this.eventFilter = val.url;
      // console.log("eventsfilter set at " + this.time);
      switch (val.url) {
        case "/events/me":
          this.filterArgs = {type: "mine", events: this.user.events, totalEventCount: this.eventsToShow};
          break;
        case "/events/friends":
          this.filterArgs = {type: "friends", friends: this.user.friends, totalEventCount: this.eventsToShow};
          break;
        case "/events/invites":
          this.filterArgs = {type: "invites", eventInvites: this.user.eventInvites, totalEventCount: this.eventsToShow};
          break;
        case "/events/all":
          default:
          this.filterArgs = {totalEventCount: this.eventsToShow};
          break;
      }
    });

    this.authService.user().subscribe(response => {
      // console.log(response);
      this.user = response;
    });
    this.apiService.getEvents().subscribe(response => {
      // console.log(response);
      this.events = response;
      this.eventsLoaded = true;
      // console.log("events received at " + this.time);
    });
  }
  public loadMoreEvents(): void {
    if (this.filterArgs) {
      this.filterArgs.totalEventCount+=10;
    }
    else {
      this.filterArgs = {type: "", eventInvites: [], totalEventCount: 20};
    }
    console.log('loadmoreEvents() ' + this.filterArgs.totalEventCount);
  }

  public detectLoad(): void{
    //removed these after removing snackbar this.showCopyText && this.showCopyText.nativeElement && this.showCopyText.nativeElement.MaterialSnackbar
    if(this.socialDrawer && this.socialDrawer.nativeElement && this.socialDrawer.nativeElement.MaterialLayout) {
      // console.log("loaded!");
      this.loaded = true;
      clearInterval(this.interval);
    }
    else {
      componentHandler.upgradeDom();
      // console.log("not yet loaded");
    }
  }

  ngOnInit() {
    // console.log("ngOnInit");
  }

  public copyText(): void {
    // this.linkText.nativeElement.select();
    // if (document.execCommand("copy")) {
    //   this.showCopyText.nativeElement.querySelector("button").innerHTML = "Copied";
    // }
  }

  public openLinkCopier(eventUrl): void {
    // this.copyTextActive = true;
    // this.copyLinkText = eventUrl;
    // let data = { 
    //   message: '',
    //   timeout: 50000,
    //   actionHandler: this.copyText.bind(this),
    //   actionText: 'Copy'
    // };
    // this.showCopyText.nativeElement.MaterialSnackbar.showSnackbar(data);
  }

  ngAfterViewInit() {
    // console.log("ngAfterViewInit");
    // this.interval = setInterval(this.detectLoad.bind(this), 2000);
    this.eventsContainer.nativeElement.addEventListener("scroll", () => {
      //if they're the same and the scroll value isn't at the top, that
      //  means that they reached the bottom.
      if (this.eventsContainer.nativeElement.scrollTop > (this.eventsContainer.nativeElement.scrollHeight - this.eventsContainer.nativeElement.offsetHeight) && this.eventsContainer.nativeElement.scrollTop !== 0) {
        console.log("attempting to emit.");
        this.loadMoreEvents();
      }
    }); 
  }

  public showInviteUser(friendName) {
    // this.copyTextActive = false;
    // let data = { 
    //   message: "You're now tracking " + friendName + ", but they're not using ShowGo. Would you like to send them a message to join our app?",
    //   timeout: 5000
    // };
    // this.showCopyText.nativeElement.MaterialSnackbar.showSnackbar(data);
  }

  public addFriend(event){
    if (event.isAdd) {
      // console.log("adding");
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
      // console.log("removing");
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
        // console.log(response);
        //update the button to be grayed out
        this.user.invitesSent.push({
          eventId: this.currentEvent.fbId,
          friendInvited: friend.fbId
        });
        // console.log(this.user.invitesSent);
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

//REMOVE THIS?
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