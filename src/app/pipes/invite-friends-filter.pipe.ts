import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'inviteFriendsFilter',
    pure: false
})
export class InviteFriendsFilter implements PipeTransform {

	transform(friends: any[], invitesAndEvent): any {
        console.log(invitesAndEvent.invites);
		return friends.filter(function(friend) {
            if (friend.isUser === false) {
                return false;
            }
            else {
                //for each of the invites the user has sent
                for (let i = 0; i < invitesAndEvent.invites.length; i++) {
                    //if the friend is on the invite list and it's the same event
                    if (friend.fbId === invitesAndEvent.invites[i].friendInvited && invitesAndEvent.event === invitesAndEvent.invites[i].eventId) {
                        return false;
                    }
                }
                return true;
            }
        });
	}
}