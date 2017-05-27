webpackJsonp([1,4],{

/***/ 1021:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(449);


/***/ }),

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(761);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_facebook__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_delay__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_delay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_delay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_toPromise__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__user__ = __webpack_require__(582);
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
        // private statusObservableSource = new Subject<boolean>(); 
        // statusObservable = this.statusObservableSource.asObservable();
        // private userObservableSource = new Subject<User>(); 
        // userObservable = this.userObservableSource.asObservable();
        // private user = this.userObservableSource.asObservable();
        // private checkLoginUrl = "http://45.55.156.114:3000/loginCheck";
        this.getUserUrl = "http://45.55.156.114:3000/api/getUser";
        this.isLoggedIn = false;
        this.currentUser = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["BehaviorSubject"](new __WEBPACK_IMPORTED_MODULE_8__user__["a" /* User */](0));
    }
    AuthService.prototype.user = function () {
        return this.currentUser.asObservable();
    };
    AuthService.prototype.getUser = function (fbId, access_token) {
        var _this = this;
        return this.http.get(this.getUserUrl + "/" + fbId + "/" + access_token)
            .flatMap(function (res) {
            // console.log("getUser() in auth service");
            // console.log(res.json());
            //TODO: unhappy path CURRENTLY TESTING HERE
            if (!res.json().error) {
                _this.currentUser.next(new __WEBPACK_IMPORTED_MODULE_8__user__["a" /* User */](res.json()));
                _this.isLoggedIn = true;
                return _this.currentUser.asObservable();
            }
            else {
                console.log("user login failed.");
                return _this.currentUser.asObservable();
            }
        });
    };
    AuthService.prototype.loggedIn = function () {
        return this.isLoggedIn;
    };
    AuthService.prototype.logout = function () {
        this.currentUser.next(new __WEBPACK_IMPORTED_MODULE_8__user__["a" /* User */](0));
        this.isLoggedIn = false;
    };
    AuthService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_ngx_facebook__["b" /* FacebookService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_ngx_facebook__["b" /* FacebookService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]) === 'function' && _b) || Object])
    ], AuthService);
    return AuthService;
    var _a, _b;
}());
//# sourceMappingURL=/home/stefan/showstopper/showgo/mean-app/src/auth.service.js.map

/***/ }),

/***/ 252:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_delay__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_delay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_delay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Subject__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__event__ = __webpack_require__(572);
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
        this.postEventActionUrl = "http://45.55.156.114:3000/api/eventAction";
        this.postJoinUrl = "http://45.55.156.114:3000/api/join";
        this.postDeclineUrl = "http://45.55.156.114:3000/api/decline";
        this.postInterestedUrl = "http://45.55.156.114:3000/api/interested";
        this.postFriend = "http://45.55.156.114:3000/api/friend";
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ 'Content-Type': 'application/json' });
        this.options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: this.headers });
    }
    ApiService.prototype.friendPost = function (friendId, access_token) {
        var url = this.postFriend + "/" + access_token + "/" + friendId;
        return this.http.post(url, {}, this.options)
            .map(function (res) {
            if (!res.json().error) {
                return true;
            }
            return false;
        });
    };
    //todo: ERROR HANDLING?
    ApiService.prototype.eventPost = function (eventType, eventId, userId) {
        var url = this.postEventActionUrl + "/" + eventType + "/" + eventId + "/" + userId;
        return this.http.post(url, {}, this.options)
            .map(function (res) {
            if (!res.json().error) {
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
    ApiService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === 'function' && _a) || Object])
    ], ApiService);
    return ApiService;
    var _a;
}());
//# sourceMappingURL=/home/stefan/showstopper/showgo/mean-app/src/api.service.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_facebook__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_do__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_delay__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_delay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_delay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise__ = __webpack_require__(188);
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

/***/ 448:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 448;


/***/ }),

/***/ 449:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(536);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(583);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(568);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/home/stefan/showstopper/showgo/mean-app/src/main.js.map

/***/ }),

/***/ 566:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddFriendsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AddFriendsComponent = (function () {
    function AddFriendsComponent() {
    }
    AddFriendsComponent.prototype.ngOnInit = function () {
    };
    AddFriendsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
            selector: 'app-add-friends',
            template: __webpack_require__(749),
            styles: [__webpack_require__(738)]
        }), 
        __metadata('design:paramtypes', [])
    ], AddFriendsComponent);
    return AddFriendsComponent;
}());
//# sourceMappingURL=/home/stefan/showstopper/showgo/mean-app/src/add-friends.component.js.map

/***/ }),

/***/ 567:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_service__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subscription__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subscription___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subscription__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(172);
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
    function AppComponent(authService, router) {
        var _this = this;
        this.authService = authService;
        this.router = router;
        this.title = 'showgo';
        this.loginStatus = false;
        this.subscription = __WEBPACK_IMPORTED_MODULE_2_rxjs_Subscription__["Subscription"];
        this.loginStatusObservable = false;
        this.authService.user().subscribe(function (response) {
            // console.log("app constructor()");
            // console.log(response);
            _this.user = response;
        });
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.prototype.logout = function () {
        this.authService.logout();
        this.router.navigate(['/']);
    };
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(750),
            styles: [__webpack_require__(739)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], AppComponent);
    return AppComponent;
    var _a, _b;
}());
//# sourceMappingURL=/home/stefan/showstopper/showgo/mean-app/src/app.component.js.map

/***/ }),

/***/ 568:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(527);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(567);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login_component__ = __webpack_require__(577);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__log_log_component__ = __webpack_require__(576);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__posts_posts_component__ = __webpack_require__(580);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__events_events_component__ = __webpack_require__(574);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__auth_guard_service__ = __webpack_require__(569);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__auth_service__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__api_service__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__event_event_component__ = __webpack_require__(573);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__fblogin_service__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ngx_facebook__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__add_friends_add_friends_component__ = __webpack_require__(566);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__friend_bubble_friend_bubble_component__ = __webpack_require__(575);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pipes_events_filter_pipe__ = __webpack_require__(578);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pipes_safe_pipe__ = __webpack_require__(579);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__bc_player_bc_player_component__ = __webpack_require__(571);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__sc_player_sc_player_component__ = __webpack_require__(581);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__band_band_component__ = __webpack_require__(570);
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
                __WEBPACK_IMPORTED_MODULE_13__event_event_component__["a" /* EventComponent */],
                __WEBPACK_IMPORTED_MODULE_16__add_friends_add_friends_component__["a" /* AddFriendsComponent */],
                __WEBPACK_IMPORTED_MODULE_17__friend_bubble_friend_bubble_component__["a" /* FriendBubbleComponent */],
                __WEBPACK_IMPORTED_MODULE_18__pipes_events_filter_pipe__["a" /* EventsFilterPipe */],
                __WEBPACK_IMPORTED_MODULE_19__pipes_safe_pipe__["a" /* SafePipe */],
                __WEBPACK_IMPORTED_MODULE_20__bc_player_bc_player_component__["a" /* BcPlayerComponent */],
                __WEBPACK_IMPORTED_MODULE_21__sc_player_sc_player_component__["a" /* ScPlayerComponent */],
                __WEBPACK_IMPORTED_MODULE_22__band_band_component__["a" /* BandComponent */]
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

/***/ 569:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(420);
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

/***/ 570:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BandComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BandComponent = (function () {
    function BandComponent() {
        this.scReady = false;
        this.playing = false;
    }
    BandComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.band.bcUrl !== "") {
            this.bc = true;
            this.scReady = false;
        }
        else {
            this.widget = SC.Widget("soundcloud_widget");
            this.widget.bind(SC.Widget.Events.READY, function () {
                _this.scReady = true;
                _this.widget.play();
            });
        }
    };
    BandComponent.prototype.playTrack = function () {
        var _this = this;
        if (this.playing) {
            ////change button to play
            this.widget.pause();
        }
        else {
            this.widget.load('https://api.soundcloud.com/tracks/' + this.band.scId);
            this.widget.bind(SC.Widget.Events.READY, function () {
                //change button to pause
                _this.widget.play();
                _this.playing = true;
            });
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* Input */])("band"), 
        __metadata('design:type', Object)
    ], BandComponent.prototype, "band", void 0);
    BandComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
            selector: 'band',
            template: __webpack_require__(751),
            styles: [__webpack_require__(740)]
        }), 
        __metadata('design:paramtypes', [])
    ], BandComponent);
    return BandComponent;
}());
//# sourceMappingURL=/home/stefan/showstopper/showgo/mean-app/src/band.component.js.map

/***/ }),

/***/ 571:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BcPlayerComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BcPlayerComponent = (function () {
    function BcPlayerComponent() {
    }
    BcPlayerComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* ViewChild */])('iframe'), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ElementRef */]) === 'function' && _a) || Object)
    ], BcPlayerComponent.prototype, "iframe", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* Input */])("embed"), 
        __metadata('design:type', Object)
    ], BcPlayerComponent.prototype, "embed", void 0);
    BcPlayerComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
            selector: 'bc-player',
            template: __webpack_require__(752),
            styles: [__webpack_require__(741)]
        }), 
        __metadata('design:paramtypes', [])
    ], BcPlayerComponent);
    return BcPlayerComponent;
    var _a;
}());
//# sourceMappingURL=/home/stefan/showstopper/showgo/mean-app/src/bc-player.component.js.map

/***/ }),

/***/ 572:
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
        this.social = inputJson.social;
        this.bcEmbeds = inputJson.bcEmbeds;
        this.scEmbeds = inputJson.scEmbeds;
        this.bands = inputJson.bands;
        //use the id to get from DB to populate other data
    }
    return Event;
}());
//# sourceMappingURL=/home/stefan/showstopper/showgo/mean-app/src/event.js.map

/***/ }),

/***/ 573:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_service__ = __webpack_require__(252);
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
        this.showFriends = false;
        this.joined = false;
        this.interest = false;
        this.ignored = false;
        this.buttonsEnabled = true;
        //TODO: when the event component is being generated we need to look at the user's shows in order to set the
        //  joined/interested/ignored booleans appropriately
    }
    EventComponent.prototype.ngOnInit = function () {
    };
    EventComponent.prototype.toggleFriends = function () {
        this.showFriends = !this.showFriends;
    };
    EventComponent.prototype.addFriend = function (eventTriggered) {
        var _this = this;
        //use the api service to add this friend id to the user's friends list
        this.apiService.friendPost(eventTriggered, this.user.accessToken).subscribe(function (response) {
            //response will be true or false based on success
            if (response) {
                console.log("friend added");
                _this.user.friends.push(eventTriggered);
            }
            else {
                console.log("friend not added");
            }
        });
    };
    EventComponent.prototype.changeUser = function (actionType) {
        console.log("adding/updating user event: " + actionType + " " + this.event.fbId);
        var found = false;
        //find the event that needs to be changed
        for (var i = 0; i < this.user.events.length; i++) {
            if (this.user.events[i].eventId === this.event.fbId) {
                this.user.events[i].actionType = actionType;
                found = true;
            }
        }
        if (!found) {
            //add the new event to the user
            this.user.events.push({
                eventId: this.event.fbId,
                actionType: actionType,
            });
        }
    };
    EventComponent.prototype.eventAction = function (eventType) {
        var _this = this;
        //disable the buttons
        this.buttonsEnabled = false;
        var undo = false;
        switch (eventType) {
            case "join":
                if (this.joined) {
                    undo = true;
                }
                break;
            case "interested":
                if (this.interest) {
                    undo = true;
                }
                break;
            case "ignore":
                undo = true;
                break;
        }
        if (undo) {
            console.log("undoing/ignoring");
            //by default we need to add the event to ignore
            this.apiService.eventPost("ignore", this.event.fbId, this.user.dbId).subscribe(function (response) {
                if (response) {
                    //show that the ignore has happened
                    _this.joined = false;
                    _this.interest = false;
                    _this.ignored = true;
                    //after button changes have been made
                    _this.buttonsEnabled = true;
                    //make changes to the user ... is this sent to all users?
                    _this.changeUser(eventType);
                }
                else {
                    console.log("event post failed.");
                }
            });
        }
        else {
            //otherwise we'll need to add the event to the corresponding listing
            this.apiService.eventPost(eventType, this.event.fbId, this.user.dbId).subscribe(function (response) {
                if (response) {
                    if (eventType === "join") {
                        //show that the RSVP has happened
                        _this.joined = true;
                        _this.interest = false;
                        _this.ignored = false;
                    }
                    else {
                        //show that the interested has happened
                        _this.joined = false;
                        _this.interest = true;
                        _this.ignored = false;
                    }
                    //after button changes have been made
                    _this.buttonsEnabled = true;
                    _this.changeUser(eventType);
                }
                else {
                }
            });
        }
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
            template: __webpack_require__(753),
            styles: [__webpack_require__(742)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__api_service__["a" /* ApiService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__api_service__["a" /* ApiService */]) === 'function' && _a) || Object])
    ], EventComponent);
    return EventComponent;
    var _a;
}());
//# sourceMappingURL=/home/stefan/showstopper/showgo/mean-app/src/event.component.js.map

/***/ }),

/***/ 574:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_service__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(120);
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
        var _this = this;
        this.apiService = apiService;
        this.authService = authService;
        this.events = [];
        this.userAccessToken = "";
        this.authService.user().subscribe(function (response) {
            _this.user = response;
        });
        this.apiService.getEvents().subscribe(function (response) {
            _this.events = response;
        });
    }
    EventsComponent.prototype.ngOnInit = function () {
    };
    EventsComponent.prototype.ngAfterViewInit = function () {
        var newsong = 'https://api.soundcloud.com/tracks/311739465';
        var scId = this.soundcloudWidget.nativeElement.id;
        var widget = SC.Widget(scId);
        widget.bind(SC.Widget.Events.READY, function () {
            //widget.pause();
            widget.load(newsong);
        });
    };
    EventsComponent.prototype.filterFriends = function () {
        //set the filter args to friends
        this.filterArgs = { type: "friends", friends: this.user.friends };
    };
    EventsComponent.prototype.filterNone = function () {
        //set the filter args to friends
        this.filterArgs = null;
    };
    EventsComponent.prototype.filterMine = function () {
        //set the filter args to friends
        this.filterArgs = { type: "mine", events: this.user.events };
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* ViewChild */])('soundcloudWidget'), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ElementRef */]) === 'function' && _a) || Object)
    ], EventsComponent.prototype, "soundcloudWidget", void 0);
    EventsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
            selector: 'app-events',
            template: __webpack_require__(754),
            styles: [__webpack_require__(743)]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__api_service__["a" /* ApiService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__api_service__["a" /* ApiService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === 'function' && _c) || Object])
    ], EventsComponent);
    return EventsComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/home/stefan/showstopper/showgo/mean-app/src/events.component.js.map

/***/ }),

/***/ 575:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FriendBubbleComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FriendBubbleComponent = (function () {
    function FriendBubbleComponent() {
        this.idSender = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* EventEmitter */]();
    }
    FriendBubbleComponent.prototype.ngOnInit = function () {
    };
    FriendBubbleComponent.prototype.addFriend = function () {
        //get the id of the friend
        this.idSender.emit(this.friend.fbId);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* Output */])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* EventEmitter */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* EventEmitter */]) === 'function' && _a) || Object)
    ], FriendBubbleComponent.prototype, "idSender", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* Input */])("friend"), 
        __metadata('design:type', Object)
    ], FriendBubbleComponent.prototype, "friend", void 0);
    FriendBubbleComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
            selector: 'friend-bubble',
            template: __webpack_require__(755),
            styles: [__webpack_require__(744)]
        }), 
        __metadata('design:paramtypes', [])
    ], FriendBubbleComponent);
    return FriendBubbleComponent;
    var _a;
}());
//# sourceMappingURL=/home/stefan/showstopper/showgo/mean-app/src/friend-bubble.component.js.map

/***/ }),

/***/ 576:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fblogin_service__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_facebook__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(172);
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
        //todo: use this to prevent error:
        this.fb.getLoginStatus()
            .then(function (response) {
            if (response.status === 'connected') {
                var access_token = response.authResponse.accessToken;
                var fbId = response.authResponse.userID;
                _this.authService.getUser(fbId, access_token).subscribe(function (res) {
                    // console.log(res);
                    //RES received isn't been handled...
                    if (res.dbId !== "") {
                        _this.router.navigate(['/events']);
                    }
                    else {
                        _this.message = "Failed to log into facebook. Can you try again?";
                    }
                });
            }
            else {
                _this.fb.login()
                    .then(function (response) {
                    console.log("login()");
                    console.log(response);
                    if (response.authResponse) {
                        var access_token = response.authResponse.accessToken;
                        var fbId = response.authResponse.userID;
                        _this.authService.getUser(fbId, access_token).subscribe(function (res) {
                            console.log("getUser()");
                            console.log(res);
                            //RES received else isn't been handled...
                            if (res.dbId !== "") {
                                _this.router.navigate(['/events']);
                            }
                            else {
                                _this.message = "Failed to log into facebook. Can you try again?";
                            }
                        });
                    }
                })
                    .catch(function (error) { return console.error(error); });
            }
        });
    };
    LogComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
            selector: 'app-log',
            template: __webpack_require__(756),
            styles: [__webpack_require__(745)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_ngx_facebook__["b" /* FacebookService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_ngx_facebook__["b" /* FacebookService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__fblogin_service__["a" /* FbloginService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__fblogin_service__["a" /* FbloginService */]) === 'function' && _d) || Object])
    ], LogComponent);
    return LogComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/home/stefan/showstopper/showgo/mean-app/src/log.component.js.map

/***/ }),

/***/ 577:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
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
            template: __webpack_require__(757),
            styles: [__webpack_require__(746)]
        }), 
        __metadata('design:paramtypes', [])
    ], LoginComponent);
    return LoginComponent;
}());
//# sourceMappingURL=/home/stefan/showstopper/showgo/mean-app/src/login.component.js.map

/***/ }),

/***/ 578:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventsFilterPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EventsFilterPipe = (function () {
    function EventsFilterPipe() {
    }
    /*
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
*/
    EventsFilterPipe.prototype.transform = function (events, filter) {
        //if no filter nor events
        if (!events || !filter) {
            return events;
        }
        switch (filter.type) {
            //if the filter arg is friends
            case "friends":
                return events.filter(function (event) {
                    for (var i = 0; i < filter.friends.length; i++) {
                        for (var eventPerson = 0; eventPerson < event.social.length; eventPerson++) {
                            if (event.social[eventPerson].fbId === filter.friends[i]) {
                                return true;
                            }
                        }
                    }
                    return false;
                });
            case "mine":
                return events.filter(function (event) {
                    // console.log(event);
                    //for each user event
                    for (var i = 0; i < filter.events.length; i++) {
                        //is the current event on that list?
                        // console.log(filter.events[i]);
                        if ((event.fbId === filter.events[i].eventId) && (filter.events[i].actionType !== "ignore")) {
                            return true;
                        }
                    }
                    return false;
                });
        }
        //         //go through the friends list
        //         for (let i = 0; i < filter.friends.length; i++) {
        //             for (let eventIndex = 0; eventIndex < events.length; eventIndex++) {
        //                 if (events[eventIndex].social.indexOf(filter.friends[i]) !== -1) {
        //                     filtered.push(events)
        //                 }
        //             }
        //         }
        // }	
    };
    EventsFilterPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Pipe */])({
            name: 'eventsFilter',
            pure: false
        }), 
        __metadata('design:paramtypes', [])
    ], EventsFilterPipe);
    return EventsFilterPipe;
}());
//# sourceMappingURL=/home/stefan/showstopper/showgo/mean-app/src/events-filter.pipe.js.map

/***/ }),

/***/ 579:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(117);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SafePipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SafePipe = (function () {
    function SafePipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafePipe.prototype.transform = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    SafePipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Pipe */])({ name: 'safe' }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]) === 'function' && _a) || Object])
    ], SafePipe);
    return SafePipe;
    var _a;
}());
//# sourceMappingURL=/home/stefan/showstopper/showgo/mean-app/src/safe.pipe.js.map

/***/ }),

/***/ 580:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
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
            template: __webpack_require__(758),
            styles: [__webpack_require__(747)]
        }), 
        __metadata('design:paramtypes', [])
    ], PostsComponent);
    return PostsComponent;
}());
//# sourceMappingURL=/home/stefan/showstopper/showgo/mean-app/src/posts.component.js.map

/***/ }),

/***/ 581:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScPlayerComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ScPlayerComponent = (function () {
    function ScPlayerComponent() {
        this.scReady = false;
        this.playing = false;
    }
    ScPlayerComponent.prototype.ngOnInit = function () {
        var _this = this;
        var scId = "soundcloud_widget";
        this.widget = SC.Widget(scId);
        var ready = this.scReady;
        this.widget.bind(SC.Widget.Events.READY, function () {
            _this.scReady = true;
            _this.widget.play();
        });
    };
    ScPlayerComponent.prototype.playTrack = function () {
        var _this = this;
        if (this.playing) {
            ////change button to play
            this.widget.pause();
        }
        else {
            this.widget.load('https://api.soundcloud.com/tracks/' + this.track);
            this.widget.bind(SC.Widget.Events.READY, function () {
                //change button to pause
                _this.widget.play();
            });
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* Input */])("trackId"), 
        __metadata('design:type', Object)
    ], ScPlayerComponent.prototype, "track", void 0);
    ScPlayerComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
            selector: 'sc-player',
            template: __webpack_require__(759),
            styles: [__webpack_require__(748)]
        }), 
        __metadata('design:paramtypes', [])
    ], ScPlayerComponent);
    return ScPlayerComponent;
}());
//# sourceMappingURL=/home/stefan/showstopper/showgo/mean-app/src/sc-player.component.js.map

/***/ }),

/***/ 582:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = (function () {
    function User(inputJson) {
        this.venues = [];
        this.accessToken = "";
        this.displayName = "";
        this.ignoredList = [];
        this.friends = [];
        this.events = [];
        if (inputJson !== 0) {
            this.dbId = inputJson._id;
            this.displayName = inputJson.name;
            this.ignoredList = inputJson.show_ignored;
            this.venues = inputJson.venue_pages;
            this.accessToken = inputJson.access_token;
            this.friends = inputJson.friends;
            this.events = inputJson.events;
        }
        else {
            this.dbId = "";
            this.displayName = "";
            this.ignoredList = [];
            this.venues = [];
            this.accessToken = "";
        }
    }
    User.prototype.createUser = function (dbId) {
        console.log(dbId);
    };
    return User;
}());
//# sourceMappingURL=/home/stefan/showstopper/showgo/mean-app/src/user.js.map

/***/ }),

/***/ 583:
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

/***/ 738:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 739:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 740:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 741:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 742:
/***/ (function(module, exports) {

module.exports = ".clicked {\r\n\tbackground-color: green;\r\n}\r\n"

/***/ }),

/***/ 743:
/***/ (function(module, exports) {

module.exports = "#soundcloud_widget {\r\n\tdisplay: none;\r\n}"

/***/ }),

/***/ 744:
/***/ (function(module, exports) {

module.exports = "\r\nspan {\r\n\tcursor: pointer;\r\n\tbackground-color: red;\r\n}"

/***/ }),

/***/ 745:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 746:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 747:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 748:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 749:
/***/ (function(module, exports) {

module.exports = "<p>\n  add-friends works!\n</p>\n"

/***/ }),

/***/ 750:
/***/ (function(module, exports) {

module.exports = "<h1>{{title}}</h1>\n<button (click)=\"logout()\">Log out</button>\n<h2>{{user.displayName}}</h2>\n<router-outlet></router-outlet>"

/***/ }),

/***/ 751:
/***/ (function(module, exports) {

module.exports = "<button *ngIf=\"scReady\" (click)=\"playTrack()\">play track</button>\n<iframe *ngIf=\"bc\" style=\"border: 0; width: 100%; height: 42px;\" [src]=\"band.bcUrl | safe\" seamless></iframe>\n\n"

/***/ }),

/***/ 752:
/***/ (function(module, exports) {

module.exports = "<p>{{embed}}</p>\n<iframe #iframe style=\"border: 0; width: 100%; height: 42px;\" [src]=\"embed | safe\" seamless></iframe>\n\n"

/***/ }),

/***/ 753:
/***/ (function(module, exports) {

module.exports = "<div data>\n\t<ul>\n\t\t<li>{{event.name}}</li>\n\t\t<li>{{event.fbId}}</li>\n\t\t<li>{{event.dbId}}</li>\n\t\t<li>{{event.venue}}</li>\n\t\t<li>{{event.location}}</li>\n\t\t<li>{{event.timeString}}</li>\n\t</ul>\n\t<button (click)=\"eventAction('ignore')\" [disabled]=\"!buttonsEnabled\" [ngClass]=\"{'clicked': ignored }\">Ignore Event</button>\n\t<button (click)=\"eventAction('join')\" [disabled]=\"!buttonsEnabled\" [ngClass]=\"{'clicked': joined }\">Join Event</button>\n\t<button (click)=\"eventAction('interested')\" [disabled]=\"!buttonsEnabled\" [ngClass]=\"{'clicked': interest }\">Interested In Event</button>\n\t<button (click)=\"toggleFriends()\">Show Attendence</button>\n\t<div *ngIf=\"showFriends\" >\n\t<ul *ngFor=\"let friend of event.social\">\n\t\t<friend-bubble (idSender)=\"addFriend($event)\" [friend]=\"friend\"></friend-bubble>\n\t</ul>\n\t</div>\n\t<!--div *ngFor=\"let embed of event.bcEmbeds\">\n\t\t<bc-player [embed]=\"embed\"></bc-player>\n\t</div>\n\t<div *ngFor=\"let trackId of event.scEmbeds\">\n\t\t<sc-player [trackId]=\"trackId\"></sc-player>\n\t</div-->\n\t<div *ngFor=\"let band of event.bands\">\n\t\t<band [band]=\"band\"></band>\n\t\t<!--bc-player [embed]=\"embed\"></bc-player-->\n\t</div>\n</div>\n"

/***/ }),

/***/ 754:
/***/ (function(module, exports) {

module.exports = "<h1>Events</h1>\n<button (click)=\"filterFriends()\">friends filter</button>\n<button (click)=\"filterNone()\">no filter</button>\n<button (click)=\"filterMine()\">my events</button>\n<event *ngFor=\"let event of events | eventsFilter:filterArgs\" [event]=\"event\" [user]=\"user\"></event>\n\n<iframe #soundcloudWidget id=\"soundcloud_widget\"\n  src=\"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/317619385&auto_play=false\"\n  width=\"420\"\n  height=\"120\"\n  frameborder=\"no\">\n</iframe>\n"

/***/ }),

/***/ 755:
/***/ (function(module, exports) {

module.exports = "<span (click)=\"addFriend()\">{{friend.name}} <img src={{friend.picture}}/> </span>\n"

/***/ }),

/***/ 756:
/***/ (function(module, exports) {

module.exports = "<h2>{{message}}</h2>\n<button (click)=\"loginWithFacebook()\">Log in via facebook, please!</button>\n"

/***/ }),

/***/ 757:
/***/ (function(module, exports) {

module.exports = "<p>\n  Login:\n</p>\n <a href=\"/auth/facebook\">Sign in with Facebook</a>\n"

/***/ }),

/***/ 758:
/***/ (function(module, exports) {

module.exports = "<p>\n  posts works!\n</p>\n"

/***/ }),

/***/ 759:
/***/ (function(module, exports) {

module.exports = "\r\n<button *ngIf=\"scReady\" (click)=\"playTrack()\">play track</button>"

/***/ })

},[1021]);
//# sourceMappingURL=main.bundle.map