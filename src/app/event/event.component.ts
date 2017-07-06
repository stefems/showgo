import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ApiService }      from './../api.service';
import { FriendBubbleComponent }      from './../friend-bubble/friend-bubble.component';
import {BcPlayerComponent} from './../bc-player/bc-player.component';
import { Event } from './../event';

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

	@Input("event") event;
	@Input("user") user;
	@ViewChild("linkText") linkText;
	@Output()
  	socialSender:EventEmitter<Event> = new EventEmitter<Event>();
  	@Output()
  	copyLinkSender:EventEmitter<string> = new EventEmitter<string>();
  	

	public showFriends = false;
	public copyTextHidden = false;
	public showBands = false;
	public joined = false
	public interest = false;
	public ignored = false;
	public buttonsEnabled: boolean = true;
	public friendString = "";

	constructor(private apiService: ApiService) {

	}
	ngAfterViewInit() {
		// console.log("event ngOnInit");
	}
	ngOnInit() {
		//renders the event action status on the panel
		for (let i = 0; i < this.user.events.length; i++) {
			if (this.user.events[i].eventId === this.event.fbId) {
				switch (this.user.events[i].actionType) {
					case "join":
						this.joined = true;
						break;
					case "interested":
						this.interest = true;
						break;
					case "ignore":
						this.ignored = true;
						break;
				}
			}
		}
		let friendsGoing = [];
		//for each attendee, is that a friend
		for (let i = 0; i < this.event.social.length; i++) {
			this.event.social[i].isFriend = false;
			//for each friend
			for (let j = 0; j < this.user.friends.length; j++) {
				if (this.user.friends[j].fbId === this.event.social[i].fbId) {
					this.event.social[i].isFriend = true;
					let friend = this.event.social[i];
					friendsGoing.push(this.event.social[i].name);
					//remove friend from social list
					this.event.social.splice(i, 1);
					//push friend to front of social list
					this.event.social.unshift(friend);
					break;
				}
			}
		}
		switch (friendsGoing.length) {
			case 0:
				break;
			case 1:
				this.friendString = friendsGoing[0] + " is going.";
				break;
			case 2:
				this.friendString = friendsGoing[0] + " and " + friendsGoing[1] + " are going.";
				break;
			default:
				this.friendString = friendsGoing[0] + ", " + friendsGoing[1] + " and " + (friendsGoing.length - 2) + " more.";
				break;
		}
		this.event.friendString = this.friendString;
		// console.log("event ngOnInit");
	}

	public toggleBands() {
		this.showBands = !this.showBands;
	}



	public updateAfterFriend(friendList): void {
		let friendsGoing = [];
		this.user.friends = friendList;
		//for each attendee, is that a friend
		for (let i = 0; i < this.event.social.length; i++) {
			this.event.social[i].isFriend = false;
			//for each friend
			for (let j = 0; j < this.user.friends.length; j++) {
				if (this.user.friends[j].fbId === this.event.social[i].fbId) {
					this.event.social[i].isFriend = true;
					let friend = this.event.social[i];
					friendsGoing.push(this.event.social[i].name);
					//remove friend from social list
					this.event.social.splice(i, 1);
					//push friend to front of social list
					this.event.social.unshift(friend);
					break;
				}
			}
		}
		switch (friendsGoing.length) {
			case 0:
				break;
			case 1:
				this.friendString = friendsGoing[0] + " is going.";
				break;
			case 2:
				this.friendString = friendsGoing[0] + " and " + friendsGoing[1] + " are going.";
				break;
			default:
				this.friendString = friendsGoing[0] + ", " + friendsGoing[1] + " and " + (friendsGoing.length - 2) + " more.";
				break;
		}
		this.event.friendString = this.friendString;
		// this.socialSender.emit(this.event);
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
	public copyLink() {
		this.copyLinkSender.emit("facebook.com/" + this.event.fbId);
	}

	public openSocial() {
		console.log("emitting " + this.event.name);
		this.socialSender.emit(this.event);
	}

	public eventAction(eventType: string) {
		//disable the buttons
		this.buttonsEnabled = false;
		// this.calImage.nativeElement.style.color = "rgba(0,0,0,.26)";
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
					// this.calImage.nativeElement.style.color = "white";
					//make changes to the user ... is this sent to all users?
					this.changeUser(eventType);
					// this.popupSender.emit("You're not interested in " + this.event.eventName + " on facebook.");
				}
				else {
					//make note that the action has not happened
					// this.popupSender.emit("We had an issue with this event action.");
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
						// this.popupSender.emit("You've rsvp'd for " + this.event.eventName + " on facebook.");
					}
					else {
						//show that the interested has happened
						this.joined = false;
						this.interest = true;
						this.ignored = false;
						// this.popupSender.emit("You're interested in " + this.event.eventName + " on facebook.");
					}
					//after button changes have been made
					this.buttonsEnabled = true;
					// this.calImage.nativeElement.style.color = "white";
					this.changeUser(eventType);
				}
				else {
					//make note that the action has not happened
					// this.popupSender.emit("We had an issue with this event action.");
				}
			});
		}
	}
	
}
