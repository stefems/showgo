/*
=====================================
Node Setup
=====================================
*/
const mongoose = require('mongoose');
const fs = require('fs');
const request = require('request');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
/*
=====================================
Mongoose Setup
=====================================
*/
var User = require("./models/user");
var Event = require("./models/event");
var Band = require("./models/band");
/*
=====================================
ENV Setup (for keys)
=====================================
*/
var env, access_token;
fs.stat(".env/.env.js", function(err, stat) {
  if(err == null) {
    env = require("/home/stefan/showstopper/showgo/mean-app/.env/.env.js");
    env.home = "http://45.55.156.114:4200"
  } 
  else if(err.code == 'ENOENT') {
    env = {
      facebookAppId: process.env.facebookAppId,
      facebookAppSecret: process.env.facebookAppSecret,
      googleKey: process.env.googleKey,
      googleId: process.env.googleId,
      soundcloudSecret: process.env.soundcloudSecret,
      home: "http://salty-citadel-53279.herokuapp.com/"
    };
  }
  access_token = env.facebookAppId + "|" + env.facebookAppSecret;
});



/* TODO
=====================================
- create a db entry for facebook venue pages
- capture the facebook venues into an array
- run getEvents() on each venue
=====================================
*/
var facebookVenuePages = ["HiDiveDenver"];
mongoose.connect('mongodb://localhost/events');
Event.remove({}, function(error, wut) {
	if (error) {
		console.log(error); 
	}
	else {
		User.remove({}, function(e, huh) {
			if (e) {
				console.log(e); 
			}
			else {
				getAllEvents(facebookVenuePages);
			}
		});
	}
	
});
//delete these two?
var getEvents = function(url) {
	/*
	=====================================
	Create a promise for creating all events
	- when an event is created, the then happens
	=====================================
	*/
	var getEventsPromise = new Promise((resolve, reject) => {
		request(url, function (error, response, body) {
			let events = JSON.parse(body).data;
			fetchEventInfo(events).then(function() {
			    console.log('all done');
			});
		});
			// for (let i = 0; i < events.length; i++) {
			// events.map(function(currentEvent, index) {
		// 		Event.findOne({eventId: events[i].id}, function(error, found) {
		// 			let currentEvent = events[i];
		// 			/*
		// 			=====================================
		// 			TODO: no updating feature for events
		// 			=====================================
		// 			*/
		// 			if (!error && found) {
		// 				//Update the event
		// 			}
		// 			else {
		// 				/*
		// 				=====================================
		// 				Creating the new event
		// 				=====================================
		// 				*/
		// 				let currentDate = new Date();
		// 				let month = parseInt(currentEvent.start_time.slice(5,7));
		// 				var monthNames = ["January", "February", "March", "April", "May", "June",
		// 								  "July", "August", "September", "October", "November", "December"
		// 								];
		// 				let eventDay = parseInt(currentEvent.start_time.slice(8,10));
		// 				//TODO: display hour in a more formatted way
		// 				let eventHour = currentEvent.start_time.slice(11,16);
		// 				let eventYear = parseInt(currentEvent.start_time.slice(0,4));
		// 				let eventMonth = monthNames[month-1];
		// 				let eventTime = {
		// 					eventHour: eventHour,
		// 					eventDay: eventDay,
		// 					eventYear: eventYear,
		// 					eventMonth: eventMonth,
		// 					start_time: currentEvent.start_time
		// 				};
		// 				let newEvent = new Event({
		// 					eventId: currentEvent.id,
		// 					eventName: currentEvent.name,
		// 					eventOwner: "",
		// 					eventPlace: currentEvent.place.location.street + " " + currentEvent.place.location.city + ", " + currentEvent.place.location.state,
		// 					eventCategory: "",
		// 					eventDescription: currentEvent.description,
		// 					eventTime: eventTime,
		// 					eventCancelled: currentEvent.is_cancelled,
		// 					eventVenue: currentEvent.place.name,
		// 					social: [],
		// 					bcEmbeds: [],
		// 					scEmbeds: [],
		// 					bands: []
		// 				});
		// 				/*
		// 				=====================================
		// 				Creating the new event
		// 				=====================================
		// 				*/
		// 				resolve(newEvent);
		// 			}
		// 		});
		// 	}
		// 	if (JSON.parse(body).paging.next) {
		//     	getEvents(JSON.parse(body).paging.next);         
		//     }
	});
	return getEventsPromise;
};

var saveEvent = function(currentEvent) {
	/*
	=====================================
	Creating the new event
	=====================================
	*/
	let currentDate = new Date();
	let month = parseInt(currentEvent.start_time.slice(5,7));
	var monthNames = ["January", "February", "March", "April", "May", "June",
					  "July", "August", "September", "October", "November", "December"
					];
	let eventDay = parseInt(currentEvent.start_time.slice(8,10));
	//TODO: display hour in a more formatted way
	let eventHour = currentEvent.start_time.slice(11,16);
	let eventYear = parseInt(currentEvent.start_time.slice(0,4));
	let eventMonth = monthNames[month-1];
	let eventTime = {
		eventHour: eventHour,
		eventDay: eventDay,
		eventYear: eventYear,
		eventMonth: eventMonth,
		start_time: currentEvent.start_time
	};
	let newEvent = new Event({
		eventId: currentEvent.id,
		eventName: currentEvent.name,
		eventOwner: "",
		eventPlace: currentEvent.place.location.street + " " + currentEvent.place.location.city + ", " + currentEvent.place.location.state,
		eventCategory: "",
		eventDescription: currentEvent.description,
		eventTime: eventTime,
		eventCancelled: currentEvent.is_cancelled,
		eventVenue: currentEvent.place.name,
		social: [],
		bcEmbeds: [],
		scEmbeds: [],
		bands: []
	});
	var saveEventPromise = new Promise((resolve, reject) => {
		newEvent.save(function(saveError) {
			if (saveError) {
				console.log(saveError);
			}
			else {
				console.log("saved: " + newEvent.eventName);
				//resolve(newEvent);
			}
		});
	});
	return saveEventPromise;
	//acquireBands(newEvent);
};

//not being used, delete?
function getAttending(event, urlGiven) {
	var getAttendingPromise = new Promise((resolve, reject) => {
		let url = urlGiven || "https://graph.facebook.com/" + event.eventId + "/attending?fields=name,picture&access_token=" + access_token;
		request(url, function (error, response, body) {
			let people = JSON.parse(body).data;
			// for (let i = 0; i < people.length; i++) {
			// 	let attendee = {
			// 		name: people[i].name,
			// 		fbId: people[i].id,
			// 		picture: people[i].picture.data.url
			// 	};
			// 	event.social.push(attendee);
			// }
			// event.social.concat(peopleAttending);
			//sendUserRequest(currentEvent, peopleAttending);
			//if we need to page to get more users
			if (JSON.parse(body).paging.next) {
				getAttending(event, JSON.parse(body).paging.next);  
		    }
		    else {
		    	resolve(event);
		    }
	  	});

	});
	return getAttendingPromise;

	// sendAttendenceRequest(event, url);
}

// def delete
function sendAttendenceRequest(currentEvent, url) {
	
}

//wat is this
function sendUserRequest(currentEvent, peopleAttending) {
	peopleAttending.forEach(function(item, index){
		let attendee = item;
		url = env.home + "/api/user/" + attendee.id;
		//send request to our backend to get the user
		request(url, function(e, r, b) {
			if (!e && !JSON.parse(b).error) {
				let newFriend = JSON.parse(b);
				//check for event here next
				currentEvent.social.push(newFriend);
				currentEvent.save(function(error) {
					if (error) {
						console.log(error);
						console.log("error when saving an attender");
					}
				});
			}
			else {
				console.log("request to get user info gave us trouble");
				console.log(JSON.parse(b).error);
			}
			
		});
	});
}

//delete?
function getProfileImages(event) {
	for (let i = 0; i < event.social.length; i ++) {
		let currentPerson = event.social[i];
		request("https://graph.facebook.com/" + currentPerson.fbId + "/picture?redirect=0", function(err, res, bod){
			if (!err && JSON.parse(bod).data && JSON.parse(bod).data.url) {
				var pictureUrl = JSON.parse(bod).data.url;
				//find in array
				currentPerson.picture = pictureUrl;
				event.save(function(error) {
					if (error) {
						console.log(error)
						console.log("failed to save image for " + person.fbId);
						// console.log(err);
					}
				});
			}
			else {
				console.log(err);
				console.log("request to get user image failed.");
			}
		});
	}
	for (let personIndex = 0; personIndex < event.social.length; personIndex++) {
		for (let index = 0; index < event.social.length; index++) {
			if (event.social[personIndex].fbId === event.social[index].fbId) {
				console.log("DUPLICATE PERSON IN EVENT FOUND");
				break;
			}
		}
	}
}

function acquireBands(eventPassedIn) {
	let facebookEventURL = "https://graph.facebook.com/v2.9/" + eventPassedIn.eventId + "/roles?access_token=" + access_token;
	request(facebookEventURL, function (error, response, body) {
  		let roles = JSON.parse(body).data;
  		//for each role
	  	for (let i = 0; i < roles.length; i++) {
	  		//search for band with same ID
	  		Band.findOne({fbId: roles[i].id}, function(err, found) {
	  			//band found
	  			if (!err && found) {
	  				addBandToEvent(found, eventPassedIn);
	  			}
	  			else {
	  				createNewBand(roles[i].id, eventPassedIn);
	  			}
	  		});
	  	}
	  	//TODO: uncomment to allow for this once the implementation is done
	  	// if (roles.length === 0) {
	  	// 	//get links from description
	  	// 	getLinksFromDescription(eventPassedIn);

	  	// }
	});
}

function addBandToEvent(band, event) {
	for (let i = 0; i < event.bands.length; i++) {
		if (event.bands[i].fbId === band.fbId) {
			return;
		}
	}
	event.bands.push(band);
	// event.save(function(err) {
	// 	if (err) {
	// 		console.log(err);
	// 		console.log("failed to save band " + band.fbId + " to event " + event.eventId);
	// 	}
	// 	else {
	// 		console.log("saved existing band " + band.fbId + " to event " + event.eventId);

	// 	}
	// });

	Event.findOneAndUpdate({fbId: event.eventId}, {$set:{bands: event.bands}}, function(error) {
		if (error) {
			console.log(error);
		}
		else {
			console.log("updated event " + event.eventId + " with band " + band.fbId);
		}
	});
}

function createNewBand(bandId, event) {
	getWebsite(bandId, event);
}

//TODO: tweak for lost lake/globe hall/larimer lounge
function getLinksFromDescription(eventArg) {
	//WILL NEED TO SEARCH FOR FB URLS AND SEE IF WE HAVE THOSE BANDS, OTHERWISE BEGIN THE SHIT

	// if (eventArg.eventDescription && eventArg.eventDescription.indexOf("bandcamp.com") !== -1) {
	// 	//get url
	// 	let beforeBC = eventArg.eventDescription.split("bandcamp.com")[0];
	// 	let urls = beforeBC.split("http");
	// 	let website = "http" + urls[urls.length-1] + "bandcamp.com";
	// 	//run function to acquire the embed
	// 	getbandcampEmbed(website, eventArg);
	// }
	// else if (eventArg.eventDescription && eventArg.eventDescription.indexOf("soundcloud.com") !== -1) {
	// 	//get url
	// 	let afterSC = eventArg.eventDescription.split("soundcloud.com/")[1];
	// 	let website = "https://soundcloud.com/" + afterSC.split(" ")[0];
	// 	console.log("soundcloud: " + website + "\n");
	// 	getsoundcloudEmbed(website, eventArg);
	// }
	// else {
	// 	//will need to search for facebook urls

	// }
}

function getWebsite(facebookPageId, event) {
	let facebookAboutURL = "https://graph.facebook.com/v2.9/" + facebookPageId + "?fields=website,name&access_token=" + access_token;
	request(facebookAboutURL, function (error, response, body) {
		if (!error) {
	  		response = JSON.parse(body);
	  		let website = response.website;
	  		let bandName = response.name;
	  		//bandcamp
	  		if (website && website.indexOf("bandcamp") !== -1) {
	  			let beforeBC = website.split("bandcamp.com")[0];
	  			let urls = beforeBC.split("http");
	  			website = "http" + urls[urls.length-1] + "bandcamp.com";
	  			//run function to acquire the embed
	 			getbandcampEmbed(facebookPageId, website, event);
	  		}
	  		// //soundcloud
	  		// else if (website && website.indexOf("soundcloud") !== -1)  {
	  		// 	let afterSC = website.split("soundcloud.com/")[1];
	  		// 	website = "https://soundcloud.com/" + afterSC.split(" ")[0];
	  		// 	getsoundcloudEmbed(facebookPageId, website, event);
	  		// }
	  		//custom website
	  		else if (website) {
	  			websiteLinkSearch(facebookPageId, response.website, event, bandName);
	  		}
	  		else {
	  			//no links were found, search google!
				googleSearchBand(facebookPageId, event, bandName);
	  		}
	  	}
	  	else {
	  		console.log(error);
	  	}
	});
}

function websiteLinkSearch(bandId, url, event, bandName) {
	var options = {
		url: url,
		headers: {
			"user-agent": "Chrome/51.0.2704.103"
		}
	};
	//consider sending another request by finding a link on the page related to music
	request(options, function (error, response, body) {
		if (!error) {
			try {
				const dom = new JSDOM(body);
				var aTags = dom.window.document.getElementsByTagName("a");
				for (let i = 0; i < aTags.length; i++) {
					if (aTags[i].getAttribute("href") && aTags[i].getAttribute("href").indexOf("bandcamp") !== -1) {
						getbandcampEmbed(bandId, aTags[i].getAttribute("href"), event);
						return;
					}
					// else if (aTags[i].getAttribute("href") && aTags[i].getAttribute("href").indexOf("soundcloud") !== -1) {
					// 	getsoundcloudEmbed(bandId, aTags[i].getAttribute("href"), event);
					// 	return;
					// }
				}
				//no links were found, search google!
				googleSearchBand(bandId, event, bandName);
			}
			catch (e) {
				console.log("JSDOM error " + options.url);
			}
		}
	});
}

function googleSearchBand(bandId, event, bandName) {
	console.log("googling: " + bandName + " bandcamp");
	let options = {
		url: "https://www.googleapis.com/customsearch/v1?key=" + env.googleKey + "&cx=" + env.googleId + "&q=" + bandName + "+bandcamp",
		headers: {
			"user-agent": "Chrome/51.0.2704.103"
		}
	};
	request(options, function(err, response, body) {
		if (!err && JSON.parse(body) && JSON.parse(body).searchInformation.totalResults > 0) {
			body = JSON.parse(body);
			for (let i = 0; i < body.items.length; i++) {
				if (body.items[i].link.indexOf("bandcamp.com")) {
					getbandcampEmbed(bandId, body.items[i].link, event);
					return;
				}
			}
			//never found a bc url
			//TODO: make a system for keeping track of which bands didn't end up with a bc link and ignore them for future searches
			// options = {
			// 	url: "https://www.googleapis.com/customsearch/v1?key=" + env.googleKey + "&cx=" + env.googleId + "&q=" + bandName + "+soundcloud",
			// 	headers: {
			// 		"user-agent": "Chrome/51.0.2704.103"
			// 	}
			// };
			// request(options, function(error, res, bod) {
			// 	if (!error && JSON.parse(bod).searchInformation.totalResults > 0) {
			// 		bod = JSON.parse(bod);
			// 		for (let i = 0; i < bod.items.length; i++) {
			// 			if (bod.items[i].link.indexOf("soundcloud.com")) {
			// 				getsoundcloudEmbed(bandId, bod.items[i].link, event);
			// 				return;
			// 			}
			// 		}

			// 	}
			// });
		}
		else {
			console.log(err);
		}
	});
}

//def delete
function getsoundcloudEmbed(bandId, url, event) {
	//send request to get the user's id
	let options = {
		url: "https://api.soundcloud.com/resolve/?url=" + url + "&client_id=" + env.soundcloudSecret,
		headers: {
			"user-agent": "Chrome/51.0.2704.103"
		}
	};
	request(options, function (error, response, body) {
		if (!error) {
			//get the id
			let id = JSON.parse(body).id;
			//send request to get a track
			let options = {
				url: "https://api.soundcloud.com/users/" + id + "/tracks?client_id=" + env.soundcloudSecret,
				headers: {
					"user-agent": "Chrome/51.0.2704.103"
				}
			};
			request(options, function (err, res, bod) {
				if (!err && JSON.parse(bod)[0]) {
					let track = JSON.parse(bod)[0].id;
					//event.scEmbeds.push(track);
					saveNewBandUpdateEvent(bandId, event, "", track);
					// mongoose.connect('mongodb://localhost/events');
					// event.save(function(e) {
					// 	mongoose.connection.close();
					// 	if (!e) {
					// 		console.log(e);
					// 	}
					// 	else {
					// 		saveBand(track);
					// 	}

					// });
				}
			});
		}
	});	
}

function getbandcampEmbed(bandId, url, event) {
	var options = {
		url: url,
		headers: {
			"user-agent": "Chrome/51.0.2704.103"
		}
	};
	request(options, function (error, response, body) {
		if (!error) {
			try {
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
						//
						albumId = "album=" + albumURL.split("/")[0];
					}
				}
				else if (content.indexOf("track") !== -1) {
					let albumURL = content.split("track=")[1];
					if (albumURL) {
						albumId = "track=" + albumURL.split("/")[0];
					}
				}
				else {
					let div = dom.window.document.getElementsByClassName("leftMiddleColumns")[0];
					let liList = div.getElementsByTagName("li");
					// albumId = "album=" + liList[0].getAttribute("data-item-id").split("-")[1];
					let data = liList[0].getAttribute("data-item-id").split("-");
					albumId = data[0] + "=" + data[1];
				}
				//event.bcEmbeds.push("https://bandcamp.com/EmbeddedPlayer/" + albumId + "/size=small/bgcol=ffffff/linkcol=0687f5/transparent=true/");
				// mongoose.connect('mongodb://localhost/events');
				// event.save(function(err) {
				// 	if (err) {
				// 		console.log("failed to save embed");
				// 		console.log(err);
				// 	}
				// 	else {
				// 		saveBand(bandId, "https://bandcamp.com/EmbeddedPlayer/" + albumId + "/size=small/bgcol=ffffff/linkcol=0687f5/transparent=true/");
				// 	}
				// });
				saveNewBandUpdateEvent(bandId, event, "https://bandcamp.com/EmbeddedPlayer/" + albumId + "/size=small/bgcol=ffffff/linkcol=0687f5/transparent=true/");
			}
			catch (e) {
				console.log("JSDOM error " + options.url);
			}
		}
		else {
			// console.log("URL error from website");
			//use same url but replace the album= with track=
		}
	});	
}

function saveNewBandUpdateEvent(bandId, event, bcEmbed, scEmbed) {
	Band.findOne({fbId: bandId}, function(error, found) {
		if (error) {
			console.log(error);
		}
		else if (found) {
			console.log("band " + bandId + " already in db...");
			console.log(found);
			addBandToEvent(found, event);
			// event.bands.push(found);
			// event.save(function(error) {
			// 	if (!error) {
			// 		console.log("saved new band " + newBand.fbId + " to event " + event.eventId);
			// 	}
			// 	else {
			// 		console.log(error);
			// 	}
			// });
		}
		else {
			var newBand = new Band({
			fbId: bandId,
			bcUrl: bcEmbed || "",
			scId: scEmbed || ""
		});
		newBand.save(function(err) {
			if (!err) {
				event.bands.push(newBand);
				event.save(function(error) {
					if (!error) {
						console.log("saved new band " + newBand.fbId + " to event " + event.eventId);
					}
				});
			}
			else {
			}
	});
		}
	});	
}

//delete?
function FindUser() {
	User.findOne({ "id": "", "events.eventId": "efeafeaf"}, function(err, userFound) {
      if(err) {
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

//delete?
function addUser() {
	var newUser = new User({
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

/*
=====================================
Event Seeding Process
1. getAllEvents() calls acquireEvents() for each venue
2. acquireEvents() recursively get the events
3. getEventPromiseArray() returns an array of promises for the event being saved to mongo
4. getPeople() is called for each event in order to recursively acquire the attendence
and save the event's social listing.
=====================================
*/
function getAllEvents(venues) {
	//get before date string for 2 months from now
	var untilValue;
	let date = new Date();
	if (date.getMonth() === 12 || date.getMonth() === 11) {
		//set the until to year++/2/15
		untilValue = (date.getFullYear + 2) + "-1-15";
	}
	else {
		untilValue = date.getFullYear() + "-" + (date.getMonth() + 2) + "-15";  
	}
	for (let i = 0; i < venues.length; i++) {
		let url = "https://graph.facebook.com/" + venues[i] + "/events?fields=is_cancelled,name,place,owner,description,start_time&until=" + untilValue + "&since=now&access_token=" + access_token;
		acquireEvents(url);
	}
}

function acquireEvents(url) {
	request(url, function (error, response, body) {
		let events = JSON.parse(body).data;
		Promise.all(getEventPromiseArray(events)).then(values => {
			for (let i = 0; i < values.length; i++) {
				let attendeeUrl = "https://graph.facebook.com/" + values[i].eventId + "/attending?fields=picture,name&access_token=" + access_token;
				getPeople(attendeeUrl, [], values[i]);
				acquireBands(values[i]);
			}			
		});
		if (JSON.parse(body).paging.next) {
			acquireEvents(JSON.parse(body).paging.next);
		}
	});
}

function getEventPromiseArray(events) {
	let promiseArray = [];
	for (let i = 0; i < events.length; i++) {
		//for each event, create and push a promise to create and save the event to mongo
		promiseArray.push(new Promise( (resolve) => {
			//create event
			let currentEvent = events[i];
			/*
			=====================================
			Creating the new event
			=====================================
			*/
			let currentDate = new Date();
			let month = parseInt(currentEvent.start_time.slice(5,7));
			var monthNames = ["January", "February", "March", "April", "May", "June",
							  "July", "August", "September", "October", "November", "December"
							];
			let eventDay = parseInt(currentEvent.start_time.slice(8,10));
			//TODO: display hour in a more formatted way
			let eventHour = currentEvent.start_time.slice(11,16);
			let eventYear = parseInt(currentEvent.start_time.slice(0,4));
			let eventMonth = monthNames[month-1];
			let eventTime = {
				eventHour: eventHour,
				eventDay: eventDay,
				eventYear: eventYear,
				eventMonth: eventMonth,
				start_time: currentEvent.start_time
			};
			let newEvent = new Event({
				eventId: currentEvent.id,
				eventName: currentEvent.name,
				eventOwner: "",
				eventPlace: currentEvent.place.location.street + " " + currentEvent.place.location.city + ", " + currentEvent.place.location.state,
				eventCategory: "",
				eventDescription: currentEvent.description,
				eventTime: eventTime,
				eventCancelled: currentEvent.is_cancelled,
				eventVenue: currentEvent.place.name,
				social: [],
				bcEmbeds: [],
				scEmbeds: [],
				bands: []
			});
			//save
			newEvent.save(function(saveError) {
				if (saveError) {
					console.log(saveError);
				}
				else {
					// console.log("saved: " + newEvent.eventName);
					resolve(newEvent);
				}
			});
		}));
	}
    return promiseArray;
}

function getPeople(url, array, event) {
	request(url, function (error, response, body) {
		if (!error && JSON.parse(body) && JSON.parse(body).paging && (JSON.parse(body).data.length > 0)) {
			let people = JSON.parse(body).data;
			for (let i = 0; i < people.length; i++) {
				let attendee = {
					name: people[i].name,
					fbId: people[i].id,
					picture: people[i].picture.data.url,
					isUser: false
				};
				array.push(attendee);
			}
			if (JSON.parse(body).paging.next) {
				getPeople(JSON.parse(body).paging.next, array, event);
			}
			else {
				event.social = array;
				event.save(function(e) {
					if (e) {
						console.log(e);
					}
				});
			}
		}
		else {

		}
	});
}