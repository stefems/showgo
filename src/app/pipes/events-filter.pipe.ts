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
        let eventADate = new Date(eventA.time);
        let eventBDate = new Date(eventB.time);
        return (eventADate < eventBDate) ? -1 : (eventADate > eventBDate) ? 1 : 0;
    });

    //if no filter nor events
    if (!events || !filter) {
        return events;
    }
    switch (filter.type) {
    //if the filter arg is friends
    case "friends":
        return events.filter(function(event) {
            for (let i = 0; i < filter.friends.length; i++) {
                for (let eventPerson = 0; eventPerson < event.social.length; eventPerson++) {
                    if (event.social[eventPerson].fbId === filter.friends[i].fbId) {
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
                    return true;
                }
            }
            return false;
        });
    }
    //         //go through the friends list
    //         for (let i = 0; i < filter.friends.length; i++) {
    //             for (let eventIndex = 0; eventIndex < events.length; eventIndex++) {
    //                 if (events[eventIndex].social.indexOf(filter.friends[i]) !== -1) {
    //                     filtered.push(events)
    //                 }
    //             }
            
    //         }
    // }	
  }
}