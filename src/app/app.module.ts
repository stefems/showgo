import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, CanActivate } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogComponent } from './log/log.component';
import { PostsComponent } from './posts/posts.component';
import { EventsComponent } from './events/events.component';
import { AuthGuard }                from './auth-guard.service';
import { AuthService }      from './auth.service';
import { ApiService }      from './api.service';
import { EventComponent } from './event/event.component';
import {FbloginService}  from './fblogin.service';
import { FacebookModule } from 'ngx-facebook';




// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'log',
    pathMatch: "full"
  },
  {
    path: 'events',
    component: EventsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'log',
    component: LogComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LogComponent,
    LoginComponent,
    PostsComponent,
    EventsComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FacebookModule.forRoot(),
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [AuthGuard, AuthService, ApiService, FbloginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
