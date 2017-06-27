import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'friend-bubble',
  templateUrl: './friend-bubble.component.html',
  styleUrls: ['./friend-bubble.component.css']
})
export class FriendBubbleComponent implements OnInit {
	@Output()
  	idSender:EventEmitter<any> = new EventEmitter();
	@Input("friend") friend;

	constructor() {
	}

	ngOnInit() {
	}

	public addFriend(): void {
		//get the id of the friend
		this.idSender.emit({friend: this.friend, isAdd: true});
	}

	public removeFriend(): void {
		this.idSender.emit({friend: this.friend, isAdd: false});
	}
}
