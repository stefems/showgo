import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'inviteFriendsFilter',
    pure: false
})
export class InviteFriendsFilter implements PipeTransform {

	transform(friends: any[], invitesAndEvent): any {
		return friends.filter(function(friend) {
            if (friend.isUser === false) {
                // console.log("friend is not a user and cannot be invited");
                return false;
            }
            //for each person in the invite listing
            for (let j = 0; j < invitesAndEvent.event.social.length; j++) {
                //if the friend is already in the going listing
                if (friend.fbId === invitesAndEvent.event.social[j].fbId) {
                    // console.log("friend already going");
                    return false;
                } 
            }
            //for each of the invites the user has sent
            for (let i = 0; i < invitesAndEvent.invites.length; i++) {
                //if the friend is on the invite list and it's the same event
                if ( (friend.fbId === invitesAndEvent.invites[i].friendInvited) && (invitesAndEvent.event.fbId === invitesAndEvent.invites[i].eventId) ) {
                    // console.log("friend has already been invited");
                    return false;
                }
            }
            // console.log("invites: " + invitesAndEvent.invites.length + " social: " + invitesAndEvent.event.social.length);
            return true;
        });
	}
}