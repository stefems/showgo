import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ApiService }      from './../api.service';

@Component({
  selector: 'friend-bubble',
  templateUrl: './friend-bubble.component.html',
  styleUrls: ['./friend-bubble.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FriendBubbleComponent implements OnInit {
	public nameShown: string = "";
	@Output()
  	idSender:EventEmitter<any> = new EventEmitter();
	@Input("friend") friend;
	@Input("suggestion") suggestion;

	constructor(private apiService: ApiService) {
		
	}

	ngOnInit() {
		if (this.suggestion) {
			this.apiService.userGet(this.friend.fbId).subscribe(response => {
				if (response) {
					if (response.name.length >= 20 ) {
						this.nameShown = response.name.substring(0, 19);
						this.nameShown = this.nameShown + "...";
					}
					else {
						this.nameShown = response.name;
					}
					this.friend.name = response.name;
					this.friend.picture = response.picture;
					this.friend.fbId = response.fbId;
				}
		    });
		}
		else if (this.friend.name) {
			if (this.friend.name.length >= 20 ) {
				this.nameShown = this.friend.name.substring(0, 19);
				this.nameShown = this.nameShown + "...";
			}
			else {
				this.nameShown = this.friend.name;
			}
		}
		
	}

	public addFriend(): void {
		//get the id of the friend
		this.idSender.emit({friend: this.friend, isAdd: true});
	}

	public removeFriend(): void {
		this.idSender.emit({friend: this.friend, isAdd: false});
	}
}
