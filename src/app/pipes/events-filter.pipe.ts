import { Pipe, PipeTransform } from '@angular/core';
import {FilterService} from '../filter.service'

@Pipe({
    name: 'eventsFilter',
    pure: false
})
export class EventsFilterPipe implements PipeTransform {

  constructor(private filterService: FilterService) {
  }

  transform(events: any[], filter): any {
    //
    if (this.filterService.genres.length !== 0 ) {
        events = events.filter((event) => {
            for (let bandIndex = 0; bandIndex < event.bands.length; bandIndex++) {
                for (let tagIndex = 0; tagIndex < event.bands[bandIndex].tags.length; tagIndex++) {
                    //if the tag is in the filter, this event should be kept, return
                    if (this.filterService.genres.indexOf(event.bands[bandIndex].tags[tagIndex]) !== -1) {
                        return true;
                    }
                }
            }
            return false;
        });
    }
    if (this.filterService.venues.length !== 0) {
        events = events.filter((event) => {
            for (let venueIndex = 0; venueIndex < this.filterService.venues.length; venueIndex++) {
                if (event.venue.indexOf(this.filterService.venues[venueIndex]) !== -1) {
                    return true;
                }
            }
            return false;
        });
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
        default: 
            return events;
    }

  }
}