import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ApiService }      from './../api.service';
// import { FriendBubbleComponent }      from './../friend-bubble/friend-bubble.component';
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
  	socialSender:EventEmitter<any> = new EventEmitter();
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
	public invitedByNames = "";
	public socialPreview = [];
	public socialPreviewExtra = "";
	public address: string = "";
	public tagString = "";

	constructor(private apiService: ApiService) {
	}
	ngAfterViewInit() {
		let address;
		address = encodeURIComponent(this.event.location);
		address = "https://maps.google.com/maps?daddr="+address+ "&travelmode=driving&dir_action=navigate";
		this.address = address;
	}
	ngOnInit() {
		this.event.bands.forEach((band) => {
			for (let i = 0; i < band.tags.length; i++) {
				// console.log(band.tags[i]);
				if (this.tagString === "") {
					this.tagString = band.tags[i];
				}
				else {
					this.tagString += ", " + band.tags[i];
				}
			}
		});
		this.tagString 
		this.invitedByNames = this.event.invitedByNames || "";
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
				this.friendString = friendsGoing[0] + ", " + friendsGoing[1] + " +" + (friendsGoing.length - 2);
				break;
		}
		this.event.friendString = this.friendString;
		let peopleToShow = 8;
		if (window.innerWidth > 480) {
			peopleToShow = 14;
		}
		this.socialPreview = this.event.social.slice(0, peopleToShow);
		if (this.event.social.length > peopleToShow) {
			this.socialPreviewExtra = "+" + (this.event.social.length-peopleToShow);
		}
	}

	public toggleBands() {
		this.showBands = !this.showBands;
	}
	public openDirections() {
		window.open(this.address);
	}

	public updateAfterFriend(friendList): void {
		let friendsGoing = [];
		this.user.friends = friendList;
		//for each attendee, is that a friend
		for (let i = 0; i < this.event.social.length; i++) {
			this.event.social[i].isFriend = false;
			// console.log(this.event.social[i].name);
			//for each friend
			for (let j = 0; j < this.user.friends.length; j++) {
				if (this.user.friends[j].fbId === this.event.social[i].fbId) {
					this.event.social[i].isFriend = true;
					let friend = this.event.social[i];
					friendsGoing.push(friend.name);
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
				this.friendString = "";
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
		// console.log(this.event.friendString);
		// this.socialSender.emit(this.event);
	}	
	
	public changeUser(actionType) {
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

	public openSocial(invite) {
		// console.log("emitting " + this.event.name);
		invite = invite || false;
		this.socialSender.emit({event: this.event, isInvite: invite});
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
			// console.log("undoing/ignoring");
			eventType = "ignore"
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
					//make changes to the user
					for (let i = 0; i < this.event.social.length; i++) {
						if (this.event.social[i].picture === this.user.picture) {
							this.event.social.splice(i, 1);
						}
					}
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
						let shouldAdd = true;
						for (let i = 0; i < this.event.social.length; i++) {
							if (this.event.social[i].picture === this.user.picture) {
								shouldAdd = false;
								break;
							}
						}	
						if (shouldAdd) {
							this.event.social.push({
								name: this.user.displayName,
								picture: this.user.picture,
								fbId: this.user.fbId
							});
							if (this.socialPreview.length < 8) {
								this.socialPreview.push({
									name: this.user.displayName,
									picture: this.user.picture,
									fbId: this.user.fbId
								});
							}
						}
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
