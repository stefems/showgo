import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, CanActivate } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PostsComponent } from './posts/posts.component';
import { EventsComponent } from './events/events.component';
import { AuthGuard }                from './auth-guard.service';
import { AuthService }      from './auth.service';



// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'events',
    pathMatch: "full"
  },
  {
    path: 'events',
    component: EventsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PostsComponent,
    EventsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
