import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FacebookService, InitParams } from 'ngx-facebook';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/toPromise';
import { Subject }    from 'rxjs/Subject';


declare var FB: any;


@Injectable()
export class FbloginService {

  public fb: any;

  constructor (private http: Http, public fbNgx: FacebookService) {
    this.fb = FB;
  	let initParams: InitParams;
  	//if showgo.io is in use, use the prod app's id
  	// if (window.location.href.indexOf("ShowGo.io") === -1) {
      // console.log("prod");
  		initParams = {
	      appId: '1928641050691340',
	      xfbml: true,
	      version: 'v2.9',
        status: true
    	};
  	// }
  	//else, use the dev app id
  	// else {
   //    console.log("dev");
  	// 	initParams = {
	  //     appId: '634739066720402',
	  //     xfbml: true,
	  //     version: 'v2.8',
	  //   };
  	// }
    // fb.init(initParams);
    this.fb.init(initParams);
    this.fb.Event.subscribe('auth.statusChange', this.auth_status_change_callback);
  }
  auth_status_change_callback(response): void {
    console.log("auth_response_change_callback");
    console.log(response);
  }
}