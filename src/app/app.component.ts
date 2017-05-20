import { Component } from '@angular/core';
import { AuthService }      from './auth.service';
import { Subscription } from 'rxjs/Subscription';
import {User} from './user';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'showgo';
  loginStatus: boolean = false;
  subscription = Subscription;
  loginStatusObservable: boolean = false;
  user: any;

  
  constructor(private authService: AuthService, private router: Router){    
    this.authService.user().subscribe(response => {
      // console.log("app constructor()");
      // console.log(response);
      this.user = response;
    });
  }
  
  ngOnInit(){

  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
