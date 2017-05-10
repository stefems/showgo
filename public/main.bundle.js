webpackJsonp([1,4],{

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_facebook__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_do__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_delay__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_delay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_delay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Subject__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__user__ = __webpack_require__(534);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var AuthService = (function () {
    function AuthService(fb, http) {
        this.fb = fb;
        this.http = http;
        this.statusObservableSource = new __WEBPACK_IMPORTED_MODULE_7_rxjs_Subject__["Subject"]();
        this.statusObservable = this.statusObservableSource.asObservable();
        this.userObservableSource = new __WEBPACK_IMPORTED_MODULE_7_rxjs_Subject__["Subject"]();
        this.userObservable = this.userObservableSource.asObservable();
        this.isLoggedIn = false;
        this.user = null;
        this.checkLoginUrl = "http://45.55.156.114:3000/loginCheck";
        this.getUserUrl = "http://45.55.156.114:3000/api/getUser";
    }
    // login(): Promise<boolean> {
    //   return this.http.get(this.checkLoginUrl)
    //     .toPromise()
    //     .then(response => response.json().status)
    //     .catch(err => console.log(err));
    // }
    AuthService.prototype.login = function () {
        return this.http.get(this.checkLoginUrl)
            .map(function (res) { return res.json().status; });
    };
    AuthService.prototype.getUser = function (fbId, access_token) {
        var _this = this;
        if (this.isLoggedIn) {
            return this.user;
        }
        else if (fbId === "" || access_token === "") {
            return { "id": "1" };
        }
        else {
            var currentUser = this.user;
            return this.http.get(this.getUserUrl + "/" + fbId + "/" + access_token)
                .map(function (res) {
                console.log("getUser() in auth service");
                console.log(res.json());
                if (!res.json().error) {
                    currentUser = new __WEBPACK_IMPORTED_MODULE_8__user__["a" /* User */](res.json());
                    _this.isLoggedIn = true;
                    return currentUser;
                }
                else {
                    return { "id": "1" };
                }
            })
                .toPromise();
        }
    };
    AuthService.prototype.loggedIn = function () {
        return this.isLoggedIn;
    };
    AuthService.prototype.logout = function () {
        this.user = null;
        this.isLoggedIn = false;
    };
    AuthService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_ngx_facebook__["b" /* FacebookService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2_ngx_facebook__["b" /* FacebookService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === 'function' && _b) || Object])
    ], AuthService);
    return AuthService;
    var _a, _b;
}());
//# sourceMappingURL=/home/stefan/showstopper/showgo/mean-app/src/auth.service.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_delay__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_delay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_delay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Subject__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__event__ = __webpack_require__(528);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ApiService = (function () {
    function ApiService(http) {
        this.http = http;
        this.eventsObservableSource = new __WEBPACK_IMPORTED_MODULE_6_rxjs_Subject__["Subject"]();
        this.eventsObservable = this.eventsObservableSource.asObservable();
        this.getEventsUrl = "http://45.55.156.114:3000/api/events";
        this.postJoinUrl = "http://45.55.156.114:3000/api/join";
        this.postDeclineUrl = "http://45.55.156.114:3000/api/decline";
        this.postInterestedUrl = "http://45.55.156.114:3000/api/interested";
    }
    // login(): Promise<boolean> {
    //   return this.http.get(this.checkLoginUrl)
    //     .toPromise()
    //     .then(response => response.json().status)
    //     .catch(err => console.log(err));
    // }
    ApiService.prototype.getEvents = function () {
        return this.http.get(this.getEventsUrl)
            .map(function (res) {
            var eventArray = [];
            for (var i = 0; i < res.json().length; i++) {
                var newEvent = new __WEBPACK_IMPORTED_MODULE_7__event__["a" /* Event */](res.json()[i]);
                eventArray.push(newEvent);
            }
            res.json();
            return eventArray;
        });
    };
    ApiService.prototype.postJoin = function (eventId, user_id) {
        var url = this.postJoinUrl + "/" + eventId + "/" + user_id;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post(url, {}, options)
            .map(function (res) {
            console.log(res);
            if (res) {
                return true;
            }
            return false;
        });
        //TODO: how the fuck do these catches work
        /*
        .catch(err => {
          console.log(err);
          return false;
        });*/
    };
    ApiService.prototype.postDecline = function (eventId, access_token) {
        var url = this.postDeclineUrl + "/" + eventId + "/" + access_token;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post(url, {}, options)
            .map(function (res) {
            console.log(res);
            if (res) {
                return true;
            }
            return false;
        });
        //TODO: how the fuck do these catches work
        /*
        .catch(err => {
          console.log(err);
          return false;
        });*/
    };
    ApiService.prototype.postInterested = function (eventId, access_token) {
        var url = this.postInterestedUrl + "/" + eventId + "/" + access_token;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post(url, {}, options)
            .map(function (res) {
            console.log(res);
            if (res) {
                return true;
            }
            return false;
        });
    };
    ApiService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === 'function' && _a) || Object])
    ], ApiService);
    return ApiService;
    var _a;
}());
//# sourceMappingURL=/home/stefan/showstopper/showgo/mean-app/src/api.service.js.map

/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_facebook__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_do__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_delay__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_delay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_delay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FbloginService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var FbloginService = (function () {
    function FbloginService(http, fb) {
        this.http = http;
        this.fb = fb;
        var initParams = {
            appId: '1928641050691340',
            xfbml: true,
            version: 'v2.9'
        };
        fb.init(initParams);
    }
    FbloginService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ngx_facebook__["b" /* FacebookService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2_ngx_facebook__["b" /* FacebookService */]) === 'function' && _b) || Object])
    ], FbloginService);
    return FbloginService;
    var _a, _b;
}());
//# sourceMappingURL=/home/stefan/showstopper/showgo/mean-app/src/fblogin.service.js.map

/***/ }),

/***/ 407:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 407;


/***/ }),

/***/ 408:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(535);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(526);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/home/stefan/showstopper/showgo/mean-app/src/main.js.map

/***/ }),

/***/ 525:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_service__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subscription__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subscription___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subscription__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(authService) {
        this.authService = authService;
        this.title = 'showgo';
        this.loginStatus = false;
        this.subscription = __WEBPACK_IMPORTED_MODULE_2_rxjs_Subscription__["Subscription"];
        this.loginStatusObservable = false;
        this.welcomeMessage = "";
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
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(696),
            styles: [__webpack_require__(690)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__auth_service__["a" /* AuthService */]) === 'function' && _a) || Object])
    ], AppComponent);
    return AppComponent;
    var _a;
}());
//# sourceMappingURL=/home/stefan/showstopper/showgo/mean-app/src/app.component.js.map

/***/ }),

/***/ 526:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(525);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login_component__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__log_log_component__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__posts_posts_component__ = __webpack_require__(533);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__events_events_component__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__auth_guard_service__ = __webpack_require__(527);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__auth_service__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__api_service__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__event_event_component__ = __webpack_require__(529);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__fblogin_service__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ngx_facebook__ = __webpack_require__(164);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
















// Define the routes
var ROUTES = [
    {
        path: '',
        redirectTo: 'log',
        pathMatch: "full"
    },
    {
        path: 'events',
        component: __WEBPACK_IMPORTED_MODULE_9__events_events_component__["a" /* EventsComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_10__auth_guard_service__["a" /* AuthGuard */]],
    },
    {
        path: 'log',
        component: __WEBPACK_IMPORTED_MODULE_7__log_log_component__["a" /* LogComponent */]
    }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_7__log_log_component__["a" /* LogComponent */],
                __WEBPACK_IMPORTED_MODULE_6__login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_8__posts_posts_component__["a" /* PostsComponent */],
                __WEBPACK_IMPORTED_MODULE_9__events_events_component__["a" /* EventsComponent */],
                __WEBPACK_IMPORTED_MODULE_13__event_event_component__["a" /* EventComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_15_ngx_facebook__["a" /* FacebookModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot(ROUTES) // Add routes to the app
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_10__auth_guard_service__["a" /* AuthGuard */], __WEBPACK_IMPORTED_MODULE_11__auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_12__api_service__["a" /* ApiService */], __WEBPACK_IMPORTED_MODULE_14__fblogin_service__["a" /* FbloginService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/home/stefan/showstopper/showgo/mean-app/src/app.module.js.map

/***/ }),

/***/ 527:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(706);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(705);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AuthGuard = (function () {
    function AuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
        this.loginStatus = false;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        // return this.authService.login().map(response => { 
        //   if (response) {
        //     return true;
        //   } 
        //   else {
        //     this.router.navigate(['/login']);
        //     return false;
        //   }
        // });
        if (this.authService.isLoggedIn) {
            return true;
        }
        else {
            this.router.navigate(['/log']);
            return false;
        }
    };
    AuthGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], AuthGuard);
    return AuthGuard;
    var _a, _b;
}());
//# sourceMappingURL=/home/stefan/showstopper/showgo/mean-app/src/auth-guard.service.js.map

/***/ }),

/***/ 528:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Event; });
var Event = (function () {
    //TODO: add this shit, yo
    function Event(inputJson) {
        this.name = inputJson.eventName;
        this.venue = inputJson.eventVenue;
        this.fbId = inputJson.eventId;
        this.dbId = inputJson._id;
        this.location = inputJson.eventPlace;
        this.timeString = inputJson.eventTime.eventMonth + " " + inputJson.eventTime.eventDay + " at " + inputJson.eventTime.eventHour;
        //use the id to get from DB to populate other data
    }
    return Event;
}());
//# sourceMappingURL=/home/stefan/showstopper/showgo/mean-app/src/event.js.map

/***/ }),

/***/ 529:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_service__ = __webpack_require__(221);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EventComponent = (function () {
    function EventComponent(apiService) {
        this.apiService = apiService;
        this.joined = false;
        this.interest = false;
        this.ignored = false;
        this.buttonsEnabled = true;
        //TODO: when the event component is being generated we need to look at the user's shows in order to set the
        //  joined/interested/ignored booleans appropriately
    }
    EventComponent.prototype.ngOnInit = function () {
    };
    EventComponent.prototype.join = function () {
        var _this = this;
        console.log("join()");
        //disable the buttons
        this.buttonsEnabled = false;
        //if we haven't yet joined
        if (!this.joined) {
            //subscribe w/ event id in order to hit the backend w/ id for joining	
            this.apiService.postJoin(this.event.fbId, this.user.dbId).subscribe(function (response) {
                if (response) {
                    //show that the RSVP has happened
                    _this.joined = true;
                    _this.interest = false;
                    _this.ignored = false;
                    //after button changes have been made
                    _this.buttonsEnabled = true;
                }
                else {
                }
            });
        }
        else {
            this.ignore();
        }
    };
    EventComponent.prototype.interested = function () {
        var _this = this;
        console.log("interested()");
        //disable the buttons
        this.buttonsEnabled = false;
        if (!this.interest) {
            //subscribe w/ event id in order to hit the backend w/ id for joining	
            this.apiService.postInterested(this.event.fbId, this.user.accessToken).subscribe(function (response) {
                if (response) {
                    //show that the interested has happened
                    _this.interest = true;
                    _this.ignored = false;
                    _this.joined = false;
                    //after button changes have been made
                    _this.buttonsEnabled = true;
                }
                else {
                }
            });
        }
        else {
            this.ignore();
        }
    };
    EventComponent.prototype.ignore = function () {
        var _this = this;
        //subscribe w/ event id in order to hit the backend w/ id for joining	
        this.apiService.postDecline(this.event.fbId, this.user.accessToken).subscribe(function (response) {
            if (response) {
                //show that the RSVP has happened
                _this.joined = false;
                _this.interest = false;
                _this.ignored = true;
                //after button changes have been made
                _this.buttonsEnabled = true;
            }
            else {
            }
        });
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* Input */])("event"), 
        __metadata('design:type', Object)
    ], EventComponent.prototype, "event", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* Input */])("user"), 
        __metadata('design:type', Object)
    ], EventComponent.prototype, "user", void 0);
    EventComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
            selector: 'event',
            template: __webpack_require__(697),
            styles: [__webpack_require__(691)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__api_service__["a" /* ApiService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__api_service__["a" /* ApiService */]) === 'function' && _a) || Object])
    ], EventComponent);
    return EventComponent;
    var _a;
}());
//# sourceMappingURL=/home/stefan/showstopper/showgo/mean-app/src/event.component.js.map

/***/ }),

/***/ 530:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_service__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(105);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EventsComponent = (function () {
    function EventsComponent(apiService, authService) {
        this.apiService = apiService;
        this.authService = authService;
        this.events = [];
        this.userAccessToken = "";
        // authService.getUser().subscribe(response => {
        //   this.user = response;
        // });
        // apiService.getEvents().subscribe(response => { 
        //    this.events = response; 
        //  });
    }
    EventsComponent.prototype.ngOnInit = function () {
    };
    EventsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
            selector: 'app-events',
            template: __webpack_require__(698),
            styles: [__webpack_require__(692)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__api_service__["a" /* ApiService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__api_service__["a" /* ApiService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === 'function' && _b) || Object])
    ], EventsComponent);
    return EventsComponent;
    var _a, _b;
}());
//# sourceMappingURL=/home/stefan/showstopper/showgo/mean-app/src/events.component.js.map

/***/ }),

/***/ 531:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fblogin_service__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_facebook__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(217);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LogComponent = (function () {
    function LogComponent(authService, router, fb, fbloginService) {
        this.authService = authService;
        this.router = router;
        this.fb = fb;
        this.fbloginService = fbloginService;
        this.user = null;
        this.message = "Please login!";
    }
    LogComponent.prototype.ngOnInit = function () {
    };
    LogComponent.prototype.loginWithFacebook = function () {
        var _this = this;
        this.fb.login()
            .then(function (response) {
            console.log("login()");
            if (response.authResponse) {
                var access_token = response.authResponse.accessToken;
                var fbId = response.authResponse.userID;
                _this.authService.getUser(fbId, access_token).then(function (authResponse) {
                    console.log("getUser()");
                    if (authResponse.id != "1") {
                        _this.router.navigate(['/events']);
                    }
                    else {
                        _this.message = "Failed to log into facebook. Can you try again?";
                    }
                });
            }
        })
            .catch(function (error) { return console.error(error); });
    };
    LogComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
            selector: 'app-log',
            template: __webpack_require__(699),
            styles: [__webpack_require__(693)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_ngx_facebook__["b" /* FacebookService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_ngx_facebook__["b" /* FacebookService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__fblogin_service__["a" /* FbloginService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__fblogin_service__["a" /* FbloginService */]) === 'function' && _d) || Object])
    ], LogComponent);
    return LogComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/home/stefan/showstopper/showgo/mean-app/src/log.component.js.map

/***/ }),

/***/ 532:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LoginComponent = (function () {
    function LoginComponent() {
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
            selector: 'app-login',
            template: __webpack_require__(700),
            styles: [__webpack_require__(694)]
        }), 
        __metadata('design:paramtypes', [])
    ], LoginComponent);
    return LoginComponent;
}());
//# sourceMappingURL=/home/stefan/showstopper/showgo/mean-app/src/login.component.js.map

/***/ }),

/***/ 533:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PostsComponent = (function () {
    function PostsComponent() {
    }
    PostsComponent.prototype.ngOnInit = function () {
    };
    PostsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
            selector: 'app-posts',
            template: __webpack_require__(701),
            styles: [__webpack_require__(695)]
        }), 
        __metadata('design:paramtypes', [])
    ], PostsComponent);
    return PostsComponent;
}());
//# sourceMappingURL=/home/stefan/showstopper/showgo/mean-app/src/posts.component.js.map

/***/ }),

/***/ 534:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = (function () {
    function User(inputJson) {
        this.venues = [];
        this.accessToken = "";
        this.displayName = "";
        this.ignoredList = [];
        this.dbId = inputJson._id;
        this.displayName = inputJson.name;
        this.ignoredList = inputJson.show_ignored;
        this.venues = inputJson.venue_pages;
        this.accessToken = inputJson.access_token;
        //use the id to get from DB to populate other data
    }
    User.prototype.createUser = function (dbId) {
        console.log(dbId);
    };
    return User;
}());
//# sourceMappingURL=/home/stefan/showstopper/showgo/mean-app/src/user.js.map

/***/ }),

/***/ 535:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=/home/stefan/showstopper/showgo/mean-app/src/environment.js.map

/***/ }),

/***/ 690:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 691:
/***/ (function(module, exports) {

module.exports = ".clicked {\r\n\tbackground-color: green;\r\n}\r\n"

/***/ }),

/***/ 692:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 693:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 694:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 695:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 696:
/***/ (function(module, exports) {

module.exports = "<h1>\n\t<span>{{title}}</span><span><button (click)=\"logout()\">Log out</button></span>\n</h1>\n<h2>{{welcomeMessage}}</h2>\n<router-outlet></router-outlet>"

/***/ }),

/***/ 697:
/***/ (function(module, exports) {

module.exports = "<div data>\n\t<ul>\n\t\t<li>{{event.name}}</li>\n\t\t<li>{{event.fbId}}</li>\n\t\t<li>{{event.dbId}}</li>\n\t\t<li>{{event.venue}}</li>\n\t\t<li>{{event.location}}</li>\n\t\t<li>{{event.timeString}}</li>\n\t</ul>\n\t<button (click)=\"ignore()\" [disabled]=\"!buttonsEnabled\" [ngClass]=\"{'clicked': ignored }\">Ignore Event</button>\n\t<button (click)=\"join()\" [disabled]=\"!buttonsEnabled\" [ngClass]=\"{'clicked': joined }\">Join Event</button>\n\t<button (click)=\"interested()\" [disabled]=\"!buttonsEnabled\" [ngClass]=\"{'clicked': interest }\">Interested In Event</button>\n</div>\n"

/***/ }),

/***/ 698:
/***/ (function(module, exports) {

module.exports = "<h1>Events</h1>\n<ul *ngFor=\"let event of events\">\n\t<event [event]=\"event\" [user]=\"user\"></event>\n</ul>\n"

/***/ }),

/***/ 699:
/***/ (function(module, exports) {

module.exports = "<h2>{{message}}</h2>\n<button (click)=\"loginWithFacebook()\">Log in via facebook, please!</button>\n"

/***/ }),

/***/ 700:
/***/ (function(module, exports) {

module.exports = "<p>\n  Login:\n</p>\n <a href=\"/auth/facebook\">Sign in with Facebook</a>\n"

/***/ }),

/***/ 701:
/***/ (function(module, exports) {

module.exports = "<p>\n  posts works!\n</p>\n"

/***/ }),

/***/ 727:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(408);


/***/ })

},[727]);
//# sourceMappingURL=main.bundle.map