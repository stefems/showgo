import { Component, ViewChild, ElementRef} from '@angular/core';
import { AuthService }      from './auth.service';
import { ApiService }      from './api.service';
import { Subscription } from 'rxjs/Subscription';
import {User} from './user';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {FbloginService} from './fblogin.service';
import {EventsComponent} from './events/events.component';
// import { FacebookService, LoginResponse } from 'ngx-facebook';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
  hideAlerts = true;

  
  constructor(private apiService: ApiService, private authService: AuthService, private router: Router, private fbloginService: FbloginService){    
    this.authService.user().subscribe(response => {
      this.user = response;
      if (this.user.dbId !== "") {
        this.notifications = this.user.friendNotifications + this.user.inviteNotifications;
        this.friendAlerts.nativeElement.setAttribute("data-badge", this.user.friendNotifications);
        this.inviteAlerts.nativeElement.setAttribute("data-badge", this.user.inviteNotifications);
        this.badge.nativeElement.setAttribute("data-badge", this.notifications);
        this.hideAlerts = false;
        this.router.navigate(['/events']);
      }
    });
  }

  ngOnInit(){
    // console.log("app ngOnInit");
  }
  ngAfterViewInit() {
    // console.log("app ngAfterViewInit");
  }
  
  filter(type): void {
    // console.log("type: " + type);
    this.drawer.nativeElement.MaterialLayout.toggleDrawer();
    this.router.navigate(['/events/'+type]);
  }
  friendAlertsNav(): void {
    //remove user friend notifications
    this.user.friendNotifications = 0;
    this.friendAlerts.nativeElement.setAttribute("data-badge", this.user.friendNotifications);
    this.badge.nativeElement.setAttribute("data-badge", this.user.inviteNotifications);
    this.router.navigate(['/friends/suggestions']);
  }
  inviteAlertsNav(): void {
    //remove user invite notifications
    this.user.inviteNotifications = 0;
    this.inviteAlerts.nativeElement.setAttribute("data-badge", this.user.inviteNotifications);
    this.badge.nativeElement.setAttribute("data-badge", this.user.friendNotifications);
    this.apiService.clearNotifications(this.user.accessToken, "event").subscribe(response => {
      console.log(response);
    });
    this.router.navigate(['/events/invites']);
  }
  login(): void {
    console.log("login()");
    this.authService.login();
  }

  logout(): void {
    this.hideAlerts = true;
    this.badge.nativeElement.removeAttribute("data-badge");
    console.log("logout()");
    this.authService.logout();
    this.router.navigate(['/splash']);
  }

  home(): void {
    console.log("home()");
    this.router.navigate(['/']);
  }
}
