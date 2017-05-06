var mongoose = require('mongoose');
var request = require('request');
//TODO: consider removal
var OAuth2 = require('oauth').OAuth2;

mongoose.connect('mongodb://localhost/events');
var User = require("./models/user");
var Event = require("./models/event");

getEvents();

//todo: fix date issues (not getting most recent events)
function getEvents(url) {
	let facebookEventURL = url || "https://graph.facebook.com/HiDiveDenver/events?access_token=EAAbaFry5xwwBABKAW5OSsMNDotuO5SCPjfHCuNQvhzh0ZCZBvvAntv68KtyjMVndZBqI1rZCcrK8AzPqFNaMvvwPoHyWBnsxSojbWPd2UQZCoGAr52ZB8oVJwXenUPTOZAh8IaGL0LTnJ4j4WpLKEcandfiOIlF4NAZD";
	//send request to api
	request(facebookEventURL, function (error, response, body) {
		let events = JSON.parse(body).data;
		//for each event acquired in the response
		for (let i = 0; i < events.length; i++) {
			console.log(events[i].name);
			let currentDate = new Date();
			let month = parseInt(events[i].start_time.slice(5,7));
			var monthNames = ["January", "February", "March", "April", "May", "June",
							  "July", "August", "September", "October", "November", "December"
							];
			let eventDay = parseInt(events[i].start_time.slice(8,10));
			//TODO: display hour in a more formatted way
			let eventHour = events[i].start_time.slice(11,16);

			let eventYear = parseInt(events[i].start_time.slice(0,4));
			if (currentDate.getDate() > eventDay) {
				if ((currentDate.getMonth() + 1) >= month ) {
					if (currentDate.getFullYear() >= eventYear) {
						console.log("reached upcoming.");
						return;
					}
				}
			}
			let eventMonth = monthNames[month-1];
			let eventTime = {
				eventHour: eventHour,
				eventDay: eventDay,
				eventYear: eventYear,
				eventMonth: eventMonth
			};
			let newEvent = new Event({
				eventId: events[i].id,
				eventName: events[i].name,
				eventOwner: events[i].owner,
				eventPlace: events[i].place.location.street + " " + events[i].place.location.city + ", " + events[i].place.location.state,
				eventCategory: events[i].category,
				eventDescription: events[i].description,
				eventTime: eventTime,
				eventCancelled: events[i].is_cancelled,
				eventVenue: events[i].place.name
			});
			newEvent.save(function(err) {
              if(err) {
                console.log(err);  // handle errors!
              }
            });
		}
		//if we need to page to get more events
		if (response.paging) {
	    	getEvents(response.paging.next);         
	    }  
	});
}


