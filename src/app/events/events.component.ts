import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
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

  public events = [];
  private userAccessToken = "";
  public filterArgs;
  private snackbar = null;
  private eventFilter = "";
  public currentSocial = new Event(0);
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
    
  }
  ngAfterViewInit() {
    let newsong = 'https://api.soundcloud.com/tracks/311739465';
    // let scId = this.soundcloudWidget.nativeElement.id;
    // let widget = SC.Widget(scId);
    // widget.bind(SC.Widget.Events.READY, function() {
    //   //widget.pause();
    //   widget.load(newsong);
    // });
    // this.snackbar = this.popup.nativeElement.querySelector("#snackbar");
  }

  public openSocial(event): void {
    console.log("closing social");
    this.currentSocial = event;
    this.socialDrawer.nativeElement.MaterialLayout.toggleDrawer();
    this.socialContainer.nativeElement.style.width="100%";
    this.socialContainer.nativeElement.style.height="100%";
    this.drawer.nativeElement.style.width="100%";
  }

  public closeSocial(): void {
    console.log("closing social");
    this.socialDrawer.nativeElement.MaterialLayout.toggleDrawer();
    this.socialContainer.nativeElement.style.width="0";
    this.socialContainer.nativeElement.style.height="0";
    this.drawer.nativeElement.style.width="240px";
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