var mongoose = require('mongoose');
var request = require('request');
//TODO: consider removal
var OAuth2 = require('oauth').OAuth2;

mongoose.connect('mongodb://localhost/events');
var User = require("./models/user");
var Event = require("./models/event");
var access_token = "EAACEdEose0cBACM6kRnBvqAHHK6ZCbZCdwQpLfBkt4eSZCYvp2DwWVViEMXP5mLNLfsZAG4McLENVs9pefZCYpFR83Cxk3bu2iwGGR96OLmZABlnZCuDU1uPEfzqUtv47nGVo6trDkjq3CzrhcKAbldQHl26zC9i5vitOBAKoM1hNSd66JIPTUU";

Event.remove({}, function(err, book) {
  if (err) { return console.log(err); };
  console.log("removal of events.");
  getEvents();
});


//todo: fix date issues (not getting most recent events)
function getEvents(url) {
	let facebookEventURL = url || "https://graph.facebook.com/HiDiveDenver/events?fields=name,place,owner,description&access_token=" + access_token;
	//send request to api
	request(facebookEventURL, function (error, response, body) {
		let events = JSON.parse(body).data;
		//for each event acquired in the response
		for (let i = 0; i < events.length; i++) {
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
				eventOwner: "",
				eventPlace: events[i].place.location.street + " " + events[i].place.location.city + ", " + events[i].place.location.state,
				eventCategory: "",
				eventDescription: events[i].description,
				eventTime: eventTime,
				eventCancelled: false,
				eventVenue: events[i].place.name,
				social: []
			});
			getAttending(newEvent);
			// newEvent.save(function(err) {
   //            if(err) {
   //            	console.log("event save error");
   //              console.log(err);  // handle errors!
   //            }
   //            else {
   //            }

   //          });
		}
		//if we need to page to get more events
		if (response.paging) {
	    	getEvents(response.paging.next);         
	    }
	    else {
	    	//beginAttendenceAcquisition();
	    }
	});
}
function beginAttendenceAcquisition() {
	//get events from mongo
	Event.find({}, function(err, found) {
		if (err){
			console.log("beginAttendenceAcquisition() mongo find error");
		}
		else {
			for (let i = 0; i < found.length; i++) {
				getAttending(found[i].eventId);
			}
		}
	});
}
function getAttending(event, urlGiven) {
	let url = urlGiven || "https://graph.facebook.com/" + event.eventId + "/attending?access_token=" + access_token;
	request(url, function (error, response, body) {
  		response = JSON.parse(body).paging;
		let peopleAttending = JSON.parse(body).data;
		for(let i = 0; i < peopleAttending.length; i++) {
			let newFriend = {
				name: peopleAttending[i].name,
				picture: "",
				fbId: peopleAttending[i].id
			};
			event.social.push(newFriend);
		}
		//if we need to page to get more users
		if (response.next) {
			getAttending(event, response.next);  
	    }
	    else {
	    	event.save(function(err){
				if (err) {
					console.log("event save error in get attending");
					console.log(err);
				}
				else {
					//launch the get profile image portion
	    			getProfileImages(event);
				}
			}); 
	    	
	    }
  	});
}

function getProfileImages(event) {
	for (let i = 0; i < event.social.length; i ++) {
		let currentPerson = event.social[i];
		getImage(event, currentPerson);
	}
}
function getImage(event, person) {
	request("https://graph.facebook.com/"+person.fbId + "/picture?redirect=0", function(err, res, bod){
		let pictureUrl = JSON.parse(bod).data.url;
		//find in array
		person.picture = pictureUrl;
		event.save(function(err) {
			if (err) {
				console.log("failed to save image");
				console.log(err);
			}
			else {
				console.log("--------------------");
				console.log(event);
				console.log("--------------------");
			}
		});
	});
}

function FindUser() {
	User.findOne({ "id": "", "events.eventId": "efeafeaf"}, function(err, userFound) {
      if(err) {
        mongoose.connection.close();
        console.log(err);  // handle errors!
        res.json({error: "mongoose connection error"});
      }
      //event is already in user's events list, let's change the action type on the event
      if (!err && userFound !== null) {
        console.log("found the user by the event in their list");
        
      }
      //event is not in user's list. Let's create that object and add it.
      else {
      	console.log("event not found in user");
      }
  });
}

function addUser() {
	let newUser = new User({
	  oauthID: 21412515,
	  name: "events user",
	  created: new Date(),
	  access_token: "wsefe",
	  friends: [],
	  events: [{
	    "eventId": "efeafeaf",
	    "actionType": "join"
	  }, {"eventId": "1232",
	    "actionType": "join"}, {"eventId": "12144",
	    "actionType": "join"}],
	  venue_pages: [],
	  shows_going: [],
	  shows_interested: [],
	  shows_ignored: [],
	  id: "1241421"
	});
	newUser.save(function(err) {
	  if(err) {
	    console.log(err);  // handle errors!
	  }
	});
}
