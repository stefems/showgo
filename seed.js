var mongoose = require('mongoose');
var request = require('request');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
//TODO: consider removal
var OAuth2 = require('oauth').OAuth2;

mongoose.connect('mongodb://localhost/events');
var User = require("./models/user");
var Event = require("./models/event");
var access_token = "EAACEdEose0cBAL9rZAl36FaHNVktkDXMzPiFo3jJqEIHNoRuHmjLTIUFJ8rZChXe6U1aKvDfu7HIXm8xXPZChIzownIw7D0KgJIgPdiHVJOOEPPPErksmZA40gu5ssFrYxpKeFItq3FDKKnOSsZBkZADAxm2WPcw5WmibZAFZAiSFwErXX5r9f0OpvhW7G0oF8YZD";


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
				social: [],
				embeds: []
			});
			getAttending(newEvent);
			acquireURL(newEvent);
		}
		//if we need to page to get more events
		if (response.paging) {
	    	getEvents(response.paging.next);         
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

//TODO: pagination happens here, might need to change this later (but honestly how many roles max will there be?)
function acquireURL(eventPassedIn) {
	let facebookEventURL = "https://graph.facebook.com/v2.9/" + eventPassedIn.eventId + "/roles?access_token=" + access_token;
	request(facebookEventURL, function (error, response, body) {
  		response = JSON.parse(body).data;
	  	for (let i = 0; i < response.length; i++) {
	  		//console.log(response[i].name);
	  		//get the id from each role and get their about string
	  		getAboutString(response[i].id, eventPassedIn);
	  	}
	});
}

function getAboutString(facebookPageId, event) {
	let facebookAboutURL = "https://graph.facebook.com/v2.9/" + facebookPageId + "?fields=website&access_token=" + access_token;
	request(facebookAboutURL, function (error, response, body) {
  		response = JSON.parse(body);
  		let website = response.website;
  		if (website && website.indexOf("bandcamp") !== -1) {
  			// console.log(website);
  			//run function to acquire the embed
 			getbandcampEmbed(response.website, event);
  		}
  		else {
  			// console.log("non-bandcamp site found");
  		}
	});
}

//TODO NEXT: modify the embed to contain the album url and track/album
function getbandcampEmbed(url, event) {
	var options = {
		url: url,
		headers: {
			"user-agent": "Chrome/51.0.2704.103"
		}
	};
	request(options, function (error, response, body) {
		if (!error) {
			const dom = new JSDOM(body);
			var metaTags = dom.window.document.getElementsByTagName("meta");
			let content = "";
			for (var i = 0; i < metaTags.length; i++) {
			    if (metaTags[i].getAttribute("property") == "og:video") {
			        content = metaTags[i].getAttribute("content");
			    }
			}
			let albumId = "";
			if (content !== "" && content.indexOf("track=") === -1) {
				let albumURL = content.split("album=")[1];
				if (albumURL) {
					albumId = "album=" + albumURL.split("/")[0];
				}
			}
			else if (content.indexOf("track") !== -1) {
				let albumURL = content.split("track=")[1];
				if (albumURL) {
					albumId = "album=" + albumURL.split("/")[0];
				}
			}
			else {
				let div = dom.window.document.getElementsByClassName("leftMiddleColumns")[0];
				let liList = div.getElementsByTagName("li");
				albumId = "track=" + liList[0].getAttribute("data-item-id").split("-")[1];
			}
			event.embeds.push('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/' + albumId + '/size=small/bgcol=ffffff/linkcol=0687f5/transparent=true/" seamless></iframe>');
			//console.log('\n<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/' + albumId + '/size=small/bgcol=ffffff/linkcol=0687f5/transparent=true/" seamless></iframe>');
			event.save(function(err) {
				if (err) {
					console.log("failed to save embed");
					console.log(err);
				}
				else {
					console.log(event.embeds);
				}
			});
		}
		else {
			// console.log("URL error from website");
			//use same url but replace the album= with track=
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
