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


	constructor() { }

	ngOnInit() {
	}

	public invite(): void {
		console.log("inviting");
		this.inviteSender.emit(this.friend);
	}

}
