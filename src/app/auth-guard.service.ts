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
    if(this.authService.isLoggedIn){
      console.log("logged in, going to events");
      return true;
    }
    else {
      console.log("not logged in, going to splash");
      this.router.navigate(['/splash']);
      return false;
    }
  }
}