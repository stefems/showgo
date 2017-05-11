import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FacebookService, InitParams } from 'ngx-facebook';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/toPromise';
import { Subject }    from 'rxjs/Subject';


@Injectable()
export class FbloginService {

  constructor (private http: Http, private fb: FacebookService) {
    let initParams: InitParams = {
      appId: '1928641050691340',
      xfbml: true,
      version: 'v2.9'
    };

    fb.init(initParams);
  }
}