import { Component, ViewChild, ElementRef, ViewEncapsulation} from '@angular/core';
import { AuthService }      from './auth.service';
import { ApiService }      from './api.service';
import { Subscription } from 'rxjs/Subscription';
import {User} from './user';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {FbloginService} from './fblogin.service';
import {FilterService} from './filter.service'
import {EventsComponent} from './events/events.component';
// import { FacebookService, LoginResponse } from 'ngx-facebook';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'
  ]
})
export class AppComponent {

  @ViewChild('main') main: ElementRef;
  @ViewChild('badge') badge: ElementRef;
  @ViewChild('drawer') drawer: ElementRef;
  @ViewChild("friendAlerts") friendAlerts: ElementRef;
  @ViewChild("inviteAlerts") inviteAlerts: ElementRef;
  title = 'ShowGo';
  loginStatus: boolean = false;
  subscription = Subscription;
  loginStatusObservable: boolean = false;
  user: any;
  hasScrolled = false;
  notifications = 0;
  public showFilterDiv = false;
  public genres = ['rock', 'indie', 'jazz', 'country', 'blues', 'soul', 'electronic', 'hip-hop', 'punk', 'metal', 'ambient', 'pop', 'shoegaze', 'experimental', 'garage', 'folk', 'psychedelic', 'lo-fi'];
  public venues = ['Hi-Dive', 'Globe Hall', 'Larimer Lounge', 'Lost Lake', "Marquis Theatre", "Gothic Theatre", "The Fillmore", "Summit Music Hall", "Nocturne", "Dazzle", "The Ogden", "Bluebird", '3 Kings', "Lion's Lair"];
  hideAlerts = true;

  
  constructor(private filterService: FilterService, private apiService: ApiService, private authService: AuthService, private router: Router){    
    this.authService.user().subscribe(response => {
      this.user = response;
      this.filterService.genres = this.user.genres;
      this.filterService.venues = this.user.venues;
      if (this.user.dbId !== "") {
        this.notifications = this.user.friendNotifications + this.user.inviteNotifications;
        this.friendAlerts.nativeElement.setAttribute("data-badge", this.user.friendNotifications);
        this.inviteAlerts.nativeElement.setAttribute("data-badge", this.user.inviteNotifications);
        this.badge.nativeElement.setAttribute("data-badge", this.notifications);
        this.hideAlerts = false;
        this.router.navigate(['/events']);
      }
    });
    this.router.events.subscribe((val) => {
      if (window.location.href.indexOf("about") !== -1) {
        this.main.nativeElement.style.overflow = "auto";
      }
      else {
        this.main.nativeElement.style.overflow = "hidden";
      }
    });
  }

  ngOnInit(){
    // console.log("app ngOnInit");
  }
  ngAfterViewInit() {
    // console.log("app ngAfterViewInit");

  }
  closeDrawer(): void {
    this.drawer.nativeElement.MaterialLayout.toggleDrawer();
  }
  saveUser(): void {
    console.log("app ts saveUser");
    this.apiService.saveUser(this.user).subscribe(response => {
      console.log(response);
    });
  }
  openFilters(): void {
    this.closeDrawer();
    this.showFilterDiv = true;
  }
  closeFilters(): void {
    this.showFilterDiv = false;
  }
  toggleGenre(genre): void {
    //apply genre
    if (this.user.genres.indexOf(genre) === -1) {
      this.user.genres.push(genre);
    }
    else {
      this.user.genres.splice(this.user.genres.indexOf(genre), 1);
    }
    this.filterService.genres = this.user.genres;
  }
  toggleVenue(venue): void {
    //apply venue
    if (this.user.venues.indexOf(venue) === -1) {
      this.user.venues.push(venue);
    }
    else {
      this.user.venues.splice(this.user.venues.indexOf(venue), 1);
    }
    this.filterService.venues = this.user.venues;

    //save this to the user
  }
  filter(type): void {
    // console.log("type: " + type);
    this.drawer.nativeElement.MaterialLayout.toggleDrawer();
    this.router.navigate(['/events/'+type]);
  }

  goToAbout(): void {
    this.drawer.nativeElement.MaterialLayout.toggleDrawer();
    this.router.navigate(['/about']);
  }

  friendAlertsNav(): void {
    //remove user friend notifications
    this.user.friendNotifications = 0;
    this.friendAlerts.nativeElement.setAttribute("data-badge", this.user.friendNotifications);
    this.badge.nativeElement.setAttribute("data-badge", this.user.inviteNotifications);
    this.apiService.clearNotifications(this.user.accessToken, "friend").subscribe(response => {
      // console.log(response);
    });
    this.router.navigate(['/friends/suggestions']);
  }
  inviteAlertsNav(): void {
    //remove user invite notifications
    this.user.inviteNotifications = 0;
    this.inviteAlerts.nativeElement.setAttribute("data-badge", this.user.inviteNotifications);
    this.badge.nativeElement.setAttribute("data-badge", this.user.friendNotifications);
    this.apiService.clearNotifications(this.user.accessToken, "event").subscribe(response => {
      // console.log(response);
    });
    this.router.navigate(['/events/invites']);
  }
  login(): void {
    // console.log("login()");
    this.authService.login();
  }

  logout(): void {
    this.hideAlerts = true;
    this.badge.nativeElement.removeAttribute("data-badge");
    // console.log("logout()");
    this.authService.logout();
    this.router.navigate(['/splash']);
  }

  home(): void {
    // console.log("home()");
    this.router.navigate(['/events/all']);
  }
}
