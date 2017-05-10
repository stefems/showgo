import { Component, OnInit, Input } from '@angular/core';
import { ApiService }      from './../api.service';


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

	public join() {
		console.log("join()");
		//disable the buttons
		this.buttonsEnabled = false;
		//if we haven't yet joined
		if (!this.joined) {
			//subscribe w/ event id in order to hit the backend w/ id for joining	
			this.apiService.postJoin(this.event.fbId, this.user.dbId).subscribe(response => {
				if(response) {
					//show that the RSVP has happened
					this.joined = true;
					this.interest = false;
					this.ignored = false;

					//after button changes have been made
					this.buttonsEnabled = true;
				}
				else {
					//make note that the RSVP has not happened
				}
			});
		}
		else {
			this.ignore();
		}
	}

	public interested() {
		console.log("interested()");
		//disable the buttons
		this.buttonsEnabled = false;
		if (!this.interest) {
			//subscribe w/ event id in order to hit the backend w/ id for joining	
			this.apiService.postInterested(this.event.fbId, this.user.accessToken).subscribe(response => {
				if(response) {
					//show that the interested has happened
					this.interest = true;
					this.ignored = false;
					this.joined = false;

					//after button changes have been made
					this.buttonsEnabled = true;
					//hit the db to update the value
				}
				else {
					//make note that the RSVP has not happened
				}
			});
		}
		else {
			this.ignore();
		}
	}

	public ignore() {
		//subscribe w/ event id in order to hit the backend w/ id for joining	
		this.apiService.postDecline(this.event.fbId, this.user.accessToken).subscribe(response => {
			if(response) {
				//show that the RSVP has happened
				this.joined = false;
				this.interest = false;
				this.ignored = true;

				//after button changes have been made
				this.buttonsEnabled = true;
				//hit the db to update the value
			}
			else {
				//make note that the RSVP has not happened
			}
		});
	}

}
