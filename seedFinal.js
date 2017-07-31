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
//add back in 
var facebookVenuePages = ["hidivedenver", "FillmoreAuditorium", "MarquisTheater", "gothictheatre", "ogdentheatre", "lostlakedenver", "larimerlounge", "globehalldenver"];
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/events');
fs.stat(".env/.env.js", function(err, stat) {
	if(err == null) {
		env = require("/home/stefan/showstopper/showgo/mean-app/.env/.env.js");
		env.home = "http://45.55.156.114:4200";
	} 
	else if(err.code == 'ENOENT') {
		env = {
		  facebookAppId: process.env.facebookAppId,
		  facebookAppSecret: process.env.facebookAppSecret,
		  googleKey: process.env.googleKey,
		  googleId: process.env.googleId,
		  soundcloudSecret: process.env.soundcloudSecret,
		  home: "www.showgo.io",
		  googleKey2: "AIzaSyCK0QT71eCOSAfsw6ZRTFZVpI6iy3rd6qs",
		  googleKey3: "015328260581123791867:bq9w7iv0day",
		  googleKey4: "AIzaSyBhwiNZ9FZaZeuQSJffTqFiqQgUziSoN5U",
		  googleId2: "015328260581123791867:7iaxxgaqpmc",
		  googleId3: "AIzaSyBLeZAHg-F4E3D05XYg4ONsNHwJ3SLRlGE",
		  googleId4: "015328260581123791867:z8msazjlkjq"
		};
	}
	access_token = env.facebookAppId + "|" + env.facebookAppSecret;
	Event.remove({}, function(error, wut) {
		if (error) {
			console.log(error); 
		}
		else {
			getAllEvents(facebookVenuePages);
		}
	});
});




/*
ADD COMMENT< DONT DELETE
*/
function addBandToEvent(band, event) {
	for (let i = 0; i < event.bands.length; i++) {
		if (event.bands[i].fbId === band.fbId) {
			return;
		}
	}
	// event.bands.push(band);
	Event.findOne({eventId: event.eventId}, function(eventFindError, eventFound) {
		if (eventFindError) {
			console.log(eventFindError);
		}
		else if (eventFound){
			eventFound.bands.push(band);
			eventFound.save(function(eventSaveNewBandError) {
				if (!eventSaveNewBandError) {
					console.log("updated event " + event.eventName + " with band " + band.fbId);
				}
				else {
					console.log("failed to save the event " + event.eventName + " with band " + band.fbId);
				}
			});
		}
		else {
			console.log("event was not found when trying to add a band to it.");
		}
	});
}

/*
ADD COMMENT< DONT DELETE
*/
function createNewBand(bandId, event, resolve) {
	getWebsite(bandId, event, resolve);
}

//TODO: tweak for lost lake/globe hall/larimer lounge
function getLinksFromDescription(eventArg) {
	//WILL NEED TO SEARCH FOR FB URLS AND SEE IF WE HAVE THOSE BANDS, OTHERWISE BEGIN THE SHIT
}

/*
ADD COMMENT< DONT DELETE
*/
function getWebsite(facebookPageId, event, resolve) {
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
	 			getbandcampEmbed(facebookPageId, website, event, resolve);
	  		}
	  		//custom website
	  		else if (website) {
	  			websiteLinkSearch(facebookPageId, response.website, event, bandName, resolve);
	  		}
	  		else {
	  			//no links were found, search google!
				googleSearchBand(facebookPageId, event, bandName, resolve);
	  		}
	  	}
	  	else {
	  		console.log(error);
	  		// resolve();
	  	}
	});
}

/*
dont delete
*/
function websiteLinkSearch(bandId, url, event, bandName, resolve) {
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
						getbandcampEmbed(bandId, aTags[i].getAttribute("href"), event, resolve);
						return;
					}
					// else if (aTags[i].getAttribute("href") && aTags[i].getAttribute("href").indexOf("soundcloud") !== -1) {
					// 	getsoundcloudEmbed(bandId, aTags[i].getAttribute("href"), event);
					// 	return;
					// }
				}
				//no links were found, search google!
				googleSearchBand(bandId, event, bandName, resolve);
			}
			catch (e) {
				console.log("JSDOM error " + options.url);
				// resolve();
			}
		}
	});
}

/*
dont delete
*/
function googleSearchBand(bandId, event, band, options, resolve) {
	if (!options) {
		let bandName = band.replace(/ /g, "+");
		if (bandName.charAt(bandName.length-1) === "+") {
			bandName = bandName.slice(0, bandName.length-1);
		}
		bandName = "%22"+ bandName + "%22";
		options = {
			url: "https://www.googleapis.com/customsearch/v1?key=" + env.googleKey2 + "&cx=" + env.googleId2 + "&q=" + bandName + "+bandcamp",
			headers: {
				"user-agent": "Chrome/51.0.2704.103"
			}
		};
	}
	request(options, function(err, response, body) {
		if (!err && !JSON.parse(body).error && JSON.parse(body) && JSON.parse(body).items && JSON.parse(body).searchInformation) {
			body = JSON.parse(body);
			for (let i = 0; i < body.items.length; i++) {
				if (body.items[i].link.indexOf("bandcamp.com") !== -1) {
					getbandcampEmbed(bandId, body.items[i].link, event, resolve);
					return;
				}
			}
			console.log("never found a url for band: " + band);
			// resolve();
		}
		else if (!err) {
			console.log("exhausted key.");
			// resolve();
		}
		// else {
		// 	//replace id and key to #2
		// 	if (env.googleKey !== env.googleKey2 && env.googleKey !== env.googleKey3) {
		// 		console.log("limit reached on key#1, attempting to use another.\n" + band);
		// 		options = {
		// 			url: "https://www.googleapis.com/customsearch/v1?key=" + env.googleKey2 + "&cx=" + env.googleId2 + "&q=" + bandName + "+bandcamp",
		// 			headers: {
		// 				"user-agent": "Chrome/51.0.2704.103"
		// 			}
		// 		};
		// 		googleSearchBand(bandId, event, bandName, options);
		// 	}
		// 	//replace id and key to #3
		// 	else if (env.googleKey === env.googleKey2) {
		// 		console.log("limit reached on key#2, attempting to use another.\n" + band);
		// 		options = {
		// 			url: "https://www.googleapis.com/customsearch/v1?key=" + env.googleKey3 + "&cx=" + env.googleId3 + "&q=" + bandName + "+bandcamp",
		// 			headers: {
		// 				"user-agent": "Chrome/51.0.2704.103"
		// 			}
		// 		};
		// 		googleSearchBand(bandId, event, bandName, options);
		// 	}
		// 	else {
		// 		console.log("exhausted all keys.\n"+band);
		// 	}
		// }
	});
}

/*
dont delete
*/
function getbandcampEmbed(bandId, url, event, resolve) {
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
				saveNewBandUpdateEvent(bandId, event, "https://bandcamp.com/EmbeddedPlayer/" + albumId + "/size=small/bgcol=ffffff/linkcol=0687f5/transparent=true/", resolve);
			}
			catch (e) {
				console.log("JSDOM error " + options.url);
				// resolve();
			}
		}
		else {
			// resolve();
			// console.log("URL error from website");
			//use same url but replace the album= with track=
		}
	});	
}

/*
dont delete
*/
function saveNewBandUpdateEvent(bandId, event, bcEmbed, resolve) {
	Band.findOne({fbId: bandId}, function(error, found) {
		if (error) {
			console.log(error);
			// resolve();
		}
		else if (found) {
			// console.log("band " + bandId + " already in db...");
			//addBandToEvent(found, event);
			console.log("resolved band: " + found.fbId + " for event: " + eventPassedIn.eventName);
			resolve(found);
		}
		else {
			bcEmbed = bcEmbed || "";
			var newBand = new Band({
				fbId: bandId,
				bcUrl: bcEmbed
			});
			newBand.save(function(err) {
				if (!err) {
			  		console.log("resolved band: " + found.fbId + " for event: " + eventPassedIn.eventName);
					resolve(newBand);
					//addBandToEvent(newBand, event);
				}
				else {
					console.log("failed to save the new band to the db.");
					// resolve();
				}
			});
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
5. acquireBands() is also called for each event in order to get the bands to attach onto
each event.
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
		if (!error && body && JSON.parse(body).data && JSON.parse(body).paging) {
			let events = JSON.parse(body).data;
			Promise.all(getEventPromiseArray(events)).then(values => {
				let attendeeUrl = "https://graph.facebook.com/" + values[0].eventId + "/attending?fields=picture,name&access_token=" + access_token;
				for (let i = 0; i < values.length; i++) {
					let attendeeUrl = "https://graph.facebook.com/" + values[i].eventId + "/attending?fields=picture,name&access_token=" + access_token;
					let currentEventPromise = values[i];
					let getPeoplePromise = new Promise( (resolve, reject) => {
						getPeople(attendeeUrl, [], currentEventPromise, resolve, reject);
					});
					getPeoplePromise.then(eventToSave => {
						Promise.all(acquireBandsPromiseArray(eventToSave)).then(bandsToAdd => {
							console.log("total resolved bands: ")
							console.log(bandsToAdd);
							console.log("for event: " + eventToSave.eventName);
							for (let i = 0; i < bandsToAdd.length; i++) {
								if (bandsToAdd[i]) {
									eventToSave.bands.push(bandsToAdd);
								}
							}
							eventToSave.save(function(finalEventSaveError) {
								if (finalEventSaveError) {
									console.log("failed to save event.");
									console.log(finalEventSaveError);
								}
								else {
									console.log("event " + eventToSave.eventName + " saved with " + eventToSave.bands.length + " bands added.");
								}
							});
						});
					});
				}			
			});
			if (JSON.parse(body).paging.next) {
				acquireEvents(JSON.parse(body).paging.next);
			}
		}
		else if (error) {
			console.log(error);
		}
	});
}
/*
=====================================
acquireBands() is called for each event
1. Use the "with" tag if not ll
=====================================
*/
function acquireBandsPromiseArray(eventPassedIn) {
	let bandsPromiseArray = [];
	let facebookEventURL = "https://graph.facebook.com/v2.9/" + eventPassedIn.eventId + "/roles?access_token=" + access_token;
	if (eventPassedIn.eventVenue === "Larimer Lounge" || 
		eventPassedIn.eventVenue === "Lost Lake" ||
		eventPassedIn.eventVenue === "Globe Hall")
	{
		let bandNames = eventPassedIn.eventName.split("/");
		bandNames.splice(bandNames.length - 1, 1);
		bandNames.forEach(function(band) {
			bandsPromiseArray.push(new Promise( (resolve) => {
		  		Band.findOne({fbId: band}, function(err, found) {
		  			//band found
		  			if (!err && found) {
		  				console.log("resolved band: " + found.fbId + " for event: " + eventPassedIn.eventName);
		  				resolve(found);
		  			}
		  			else {
		  				//----->
		  				// console.log("need to create a band for this event.");
		  				googleSearchBand(band, eventPassedIn, band, null, resolve);
		  			}
				});
			}));
		});
	}
	//not lost lake, larimer lounge, globe hall
	else {
		request(facebookEventURL, function (error, response, body) {
	  		let roles = JSON.parse(body).data;
	  		//for each role
		  	for (let i = 0; i < roles.length; i++) {
		  		bandsPromiseArray.push(new Promise( (resolve) => {
			  		//search for band with same ID
			  		Band.findOne({fbId: roles[i].id}, function(err, found) {
			  			//band found
			  			if (!err && found) {
			  				console.log("resolved band: " + found.fbId + " for event: " + eventPassedIn.eventName);
			  				resolve(found);
			  				//addBandToEvent(found, eventPassedIn);
			  			}
			  			else {
			  				//--->
			  				createNewBand(roles[i].id, eventPassedIn, resolve);
			  			}
			  		});
			  	}));
		  	}
		});
	}
	return bandsPromiseArray;
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
					resolve(newEvent);
				}
			});
		}));
	}
    return promiseArray;
}

function getPeople(url, array, event, resolve, reject) {
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
				getPeople(JSON.parse(body).paging.next, array, event, resolve, reject);
			}
			else {
				if (array) {
					event.social = array;
					resolve(event);
				}
				else {
					console.log("rejected, undefined social for event " + event.eventName);
					reject();
				}
			}
		}
		else {
			event.social = array;
			resolve(event);
		}
	});
}