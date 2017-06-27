import { Component, ViewChild, ElementRef} from '@angular/core';
import { AuthService }      from './auth.service';
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

  @ViewChild('drawer') drawer: ElementRef;
  title = 'ShowGo';
  loginStatus: boolean = false;
  subscription = Subscription;
  loginStatusObservable: boolean = false;
  user: any;
  hasScrolled = false;

  
  constructor(private authService: AuthService, private router: Router, private fbloginService: FbloginService){    
    this.authService.user().subscribe(response => {
      this.user = response;
      if (this.user.dbId !== "") {
        this.router.navigate(['/events']);
      }
    });
  }

  ngOnInit(){
    console.log("app ngOnInit");
  }
  ngAfterViewInit() {
    console.log("app ngAfterViewInit");
  }
  
  filter(type): void {
    console.log("type: " + type);
    this.drawer.nativeElement.MaterialLayout.toggleDrawer();
    this.router.navigate(['/events/'+type]);
  }

  login(): void {
    console.log("login()");
    this.authService.login();
  }

  logout(): void {
    console.log("logout()");
    this.authService.logout();
    this.router.navigate(['/splash']);
  }

  home(): void {
    console.log("home()");
    this.router.navigate(['/']);
  }
}
