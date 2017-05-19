import { Component, OnInit, Input } from '@angular/core';
import { ApiService }      from './../api.service';
import { FriendBubbleComponent }      from './../friend-bubble/friend-bubble.component';


@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

	@Input("event") event;
	@Input("user") user;

	private joined = false
	private interest = false;
	private ignored = false;
	private buttonsEnabled: boolean = true;

	constructor(private apiService: ApiService) {
		//TODO: when the event component is being generated we need to look at the user's shows in order to set the
		//  joined/interested/ignored booleans appropriately
	}
	ngOnInit() {
	}
	public addFriend(eventTriggered){
		//use the api service to add this friend id to the user's friends list
		this.apiService.friendPost(eventTriggered, this.user.accessToken).subscribe(response => {
			if(response) {
				console.log(response);
			}
			else {
			}
		});

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
				if (this.ignored) {
					undo = true;
				}
				break;
		}
		if (undo) {
			//by default we need to add the event to ignore
			this.apiService.eventPost("ignore", this.event.fbId, this.user.dbId).subscribe(response => {
				console.log("eventPost() ignore in ts");
				console.log(response);
				if(response) {
					//show that the ignore has happened
					this.joined = false;
					this.interest = false;
					this.ignored = true;
					//after button changes have been made
					this.buttonsEnabled = true;
				}
				else {
					//make note that the action has not happened
				}
			});
		}
		else {
			//otherwise we'll need to add the event to the corresponding listing
			this.apiService.eventPost(eventType, this.event.fbId, this.user.dbId).subscribe(response => {
				console.log("eventPost() post in ts");
				console.log(response);
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
				}
				else {
					//make note that the action has not happened
				}
			});
		}
	}
	
}
