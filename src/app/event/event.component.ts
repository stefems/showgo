import { Component, OnInit, Input } from '@angular/core';
import { ApiService }      from './../api.service';
import { FriendBubbleComponent }      from './../friend-bubble/friend-bubble.component';
import {BcPlayerComponent} from './../bc-player/bc-player.component';


@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

	@Input("event") event;
	@Input("user") user;

	public showFriends = false;
	public joined = false
	public interest = false;
	public ignored = false;
	public buttonsEnabled: boolean = true;

	constructor(private apiService: ApiService) {
		//TODO: when the event component is being generated we need to look at the user's shows in order to set the
		//  joined/interested/ignored booleans appropriately
	}
	ngOnInit() {

	}

	public toggleFriends() {
		this.showFriends = !this.showFriends;
	}

	public addFriend(eventTriggered){
		//use the api service to add this friend id to the user's friends list
		this.apiService.friendPost(eventTriggered, this.user.accessToken).subscribe(response => {
			//response will be true or false based on success
			if(response) {
				console.log("friend added");
				this.user.friends.push(eventTriggered);
			}
			else {
				console.log("friend not added");
			}
		});
	}
	
	public changeUser(actionType) {
		console.log("adding/updating user event: " + actionType + " " + this.event.fbId);
		let found = false;
		//find the event that needs to be changed
		for (let i = 0; i < this.user.events.length; i++) {
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
	}

	public eventAction(eventType: string) {
		//disable the buttons
		this.buttonsEnabled = false;
		let undo = false;
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
			this.apiService.eventPost("ignore", this.event.fbId, this.user.dbId).subscribe(response => {
				if(response) {
					//show that the ignore has happened
					this.joined = false;
					this.interest = false;
					this.ignored = true;
					//after button changes have been made
					this.buttonsEnabled = true;
					//make changes to the user ... is this sent to all users?
					this.changeUser(eventType);
				}
				else {
					console.log("event post failed.");
					//make note that the action has not happened
				}
			});
		}
		else {
			//otherwise we'll need to add the event to the corresponding listing
			this.apiService.eventPost(eventType, this.event.fbId, this.user.dbId).subscribe(response => {
				if(response) {
					if (eventType === "join") {
						//show that the RSVP has happened
						this.joined = true;
						this.interest = false;
						this.ignored = false;
					}
					else {
						//show that the interested has happened
						this.joined = false;
						this.interest = true;
						this.ignored = false;
					}
					//after button changes have been made
					this.buttonsEnabled = true;
					this.changeUser(eventType);
				}
				else {
					//make note that the action has not happened
				}
			});
		}
	}
	
}
