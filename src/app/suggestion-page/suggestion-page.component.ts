import { Component, OnInit } from '@angular/core';
import { AuthService }      from './../auth.service';
import { ApiService }      from './../api.service';



@Component({
  selector: 'app-suggestion-page',
  templateUrl: './suggestion-page.component.html',
  styleUrls: ['./suggestion-page.component.css']
})
export class SuggestionPageComponent implements OnInit {

	public user;
	constructor(private authService: AuthService, private apiService: ApiService) {
		this.authService.user().subscribe(response => {
			this.user = response;	
		});
	}

	ngOnInit() {
	
	}

	public addFriend(event){
		if (event.isAdd) {
		  // console.log("adding");
		  // console.log(event.friend);
		  //use the api service to add this friend id to the user's friends list
		  this.apiService.friendPost(event.friend, this.user.accessToken).subscribe(response => {
		    //response will be true or false based on success
		    if(response) {
		      this.user.friends.push(response.friend);
		      //pass the user access_token and the friendId that should be removed from the suggestions
		      this.apiService.friendSuggestionDelete(this.user.accessToken, response.friend.fbId).subscribe(res => {
		      	if (res) {
		      		this.user.friendSuggestions.splice(this.user.friendSuggestions.indexOf(response.friend), 1);
		      	}
		      });
		      //for each event, update it
		      // let events = this.eventComps.toArray()
		      // for (let i = 0; i < events.length; i++) {
		      //   events[i].updateAfterFriend(this.user.friends);
		      // }
		      // this.apiService.findUser(event.friend.fbId).subscribe(response => {
		      //   if (response) {
		      //     // console.log("added friend is a user");
		      //   }
		      //   else {
		      //     // console.log("added friend is not a user");
		      //     this.showInviteUser(event.friend.name);
		      //   }
		      // });
		    }
		    else {
		      console.log("friend not added");
		    }
		  });
		}/*
		else {
		  // console.log("removing");
		  //use the api service to add this friend id to the user's friends list
		  this.apiService.unfriendPost(event.friend, this.user.accessToken).subscribe(response => {
		    //response will be true or false based on success
		    if(response) {
		      for (let i = 0; i < this.user.friends.length; i++) {
		        if (this.user.friends[i].fbId == event.friend.fbId) {
		          this.user.friends.splice(i, 1);
		        }
		      }
		      //for each event, update it
		      // let events = this.eventComps.toArray()
		      // for (let i = 0; i < events.length; i++) {
		      //   events[i].updateAfterFriend(this.user.friends);
		      // }
		    }
		  });
		}*/
  	}
}
