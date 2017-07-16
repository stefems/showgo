import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'friend-invite',
  templateUrl: './friend-invite.component.html',
  styleUrls: ['./friend-invite.component.css']
})
export class FriendInviteComponent implements OnInit {
	@Output()
  	inviteSender:EventEmitter<string> = new EventEmitter();
	@Input("friend") friend;
	private inviteSent: boolean = false;
	private buttonText: string = "Invite";

	constructor() { }

	ngOnInit() {
	}

	public invite(): void {
		//disable button
		this.buttonText = "Invited";
		this.inviteSent = true;
		this.inviteSender.emit(this.friend);
	}

}
