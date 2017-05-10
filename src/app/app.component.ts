import { Component } from '@angular/core';
import { AuthService }      from './auth.service';
import { Subscription } from 'rxjs/Subscription';
import {User} from './user';

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
  welcomeMessage = "";
  
  constructor(private authService: AuthService){
    this.user = this.authService.getUser("", "");
    this.user.displayName = "please login!";
    this.welcomeMessage = "Hello, " + this.user.displayName;
  }
  // constructor(private authService: AuthService) {
  // 	authService.login().subscribe(response => { 
  //     this.loginStatus = response; 
  //     if (this.loginStatus) {
  //       authService.getUser().subscribe(response => {
  //         console.log(response);
  //         this.user = response;
  //         this.welcomeMessage = "Hi, " + this.user.displayName;
  //       });
  //     }
  //   });
  // }
  
  ngOnInit(){

  }
}
