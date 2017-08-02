import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'eventsFilter',
    pure: false
})
export class EventsFilterPipe implements PipeTransform {
	/*
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
*/
  transform(events: any[], filter): any {

    //always do a date filter
    events = events.sort(function(eventA, eventB) {
        var a = eventA.time.split(/[^0-9]/);
        var b = eventB.time.split(/[^0-9]/);
        let eventADate = new Date(a[0],a[1]-1,a[2],a[3],a[4],a[5]);
        let eventBDate = new Date(b[0],b[1]-1,b[2],b[3],b[4],b[5]);
        return (eventADate < eventBDate) ? -1 : (eventADate > eventBDate) ? 1 : 0;
    });


    //if no filter nor events
    if (!events || !filter) {
        return events;
    }
    switch (filter.type) {
        case "friends":
            return events.filter(function(event) {
                for (let i = 0; i < filter.friends.length; i++) {
                    for (let eventPerson = 0; eventPerson < event.social.length; eventPerson++) {
                        if (event.social[eventPerson].fbId === filter.friends[i].fbId) {
                            event.invitedByNames = "";
                            return true;
                        }
                    }
                }
                return false;
            });
        case "mine":
            return events.filter(function(event) {
                // console.log(event);
                //for each user event
                for (let i = 0; i < filter.events.length; i++) {
                    //is the current event on that list?
                    if ( (event.fbId === filter.events[i].eventId) && (filter.events[i].actionType !== "ignore") ) {
                        event.invitedByNames = "";
                        return true;
                    }
                }
                return false;
            });
        case "invites":
            return events.filter(function(event) {
                event.invitedByNames = "";
                //for each event invite
                for (let i = 0; i < filter.eventInvites.length; i++) {
                    //is the current event on that list?
                    if ( event.fbId === filter.eventInvites[i].event) {
                        for (let name = 0; name < filter.eventInvites[i].invitedByNames.length; name++ ) {
                            if (event.invitedByNames === "") {
                                event.invitedByNames = filter.eventInvites[i].invitedByNames[name];
                            }
                            else {
                                event.invitedByNames = event.invitedByNames + ", " + filter.eventInvites[i].invitedByNames[name];
                            }
                        }
                        event.invitedByNames += " invited you.";
                        return true;
                    }
                }
                return false;
            });
    }
  }
}