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
  	let initParams;
  	//if showgo.io is in use, use the prod app's id
  	if (window.location.href.indexOf("showgo.io") === -1) {
      initParams = {
	      appId: '1957677144454397',
	      xfbml: true,
	      version: 'v2.9'
      };
  	}
  	//else, use the dev app id
  	else {
  		initParams = {
	      appId: '634739066720402',
	      xfbml: true,
	      version: 'v2.8',
	    };
  	}
    // console.log(initParams.appId);
    this.fb.init(initParams);
    // this.fb.Event.subscribe('auth.statusChange', this.auth_status_change_callback);
  }
  auth_status_change_callback(response): void {
    console.log("auth_response_change_callback");
    console.log(response);
  }
}