import { Component, OnInit } from '@angular/core';
import { AuthService }      from '../auth.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {FbloginService} from '../fblogin.service';
import { FacebookService, LoginResponse } from 'ngx-facebook';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private fb: FacebookService, private fbloginService: FbloginService) { }

  ngOnInit() {
  }
  login(): void {
    this.authService.login();
  }

}
