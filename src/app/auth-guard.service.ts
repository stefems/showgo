import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { AuthService }      from './auth.service';
import {Observable} from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthGuard implements CanActivate {

  loginStatus: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return this.authService.login().map(response => { 
    //   if (response) {
    //     return true;
    //   } 
    //   else {
    //     this.router.navigate(['/login']);
    //     return false;
    //   }
    // });
    if(this.authService.isLoggedIn){
      return true;
    }
    else {
      this.router.navigate(['/log']);
      return false;
    }
  }
}