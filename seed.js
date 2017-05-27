var mongoose = require('mongoose');
const env = require("./.env/.env.js");
var request = require('request');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

var User = require("./models/user");
var Event = require("./models/event");
var Band = require("./models/band");

//TODO: systematic way to get access token for when this is scheduled
var access_token = "EAACEdEose0cBAPEsY7PZBzWdfhFxnNed2G3yxNQmPeJKuDbA4uhFSE8Wc3g6nh6NxfPjzCemeCLHOZCdxa5USBmdsSudd9YZBfRovDg6mABeliZB4yy0gFKXARa0U8rHAY9no7IDkySVWuQVF1cauKTskR1EuflI7EhvREga5YsvPSoxsERL";
//TODO: replace with DB venues
var venues = [];

mongoose.connect('mongodb://localhost/events');
Event.remove({}, function(err, wut) {
	if (err) {
		return console.log(err); 
	}
	console.log("removal of events.");
	Band.remove({}, function(error, huh) {
		if (!error) {
			getEvents();
		}
		else {
			console.log(error);
		}
	});
	
});

//todo: fix date issues (not getting most recent events)
function getEvents(url) {
	let facebookEventURL = url || "https://graph.facebook.com/HiDiveDenver/events?fields=name,place,owner,description&access_token=" + access_token;
	//send request to api
	request(facebookEventURL, function (error, response, body) {
		let events = JSON.parse(body).data;
		//for each event acquired in the response
		for (let i = 0; i < events.length; i++) {
			Event.findOne({eventId: events[i].id}, function(error, found) {
				//event exists
				if (!error && found) {
					//Update the event

				}
				//create new event
				else {
					createEvent(events[i]);
				}
			});
		}
		//if we need to page to get more events
		if (response.paging) {
	    	getEvents(response.paging.next);         
	    }
	});
}

function createEvent(eventPassedIn) {
	let currentDate = new Date();
	let month = parseInt(eventPassedIn.start_time.slice(5,7));
	var monthNames = ["January", "February", "March", "April", "May", "June",
					  "July", "August", "September", "October", "November", "December"
					];
	let eventDay = parseInt(eventPassedIn.start_time.slice(8,10));
	//TODO: display hour in a more formatted way
	let eventHour = eventPassedIn.start_time.slice(11,16);

	let eventYear = parseInt(eventPassedIn.start_time.slice(0,4));
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
		eventId: eventPassedIn.id,
		eventName: eventPassedIn.name,
		eventOwner: "",
		eventPlace: eventPassedIn.place.location.street + " " + eventPassedIn.place.location.city + ", " + eventPassedIn.place.location.state,
		eventCategory: "",
		eventDescription: eventPassedIn.description,
		eventTime: eventTime,
		eventCancelled: false,
		eventVenue: eventPassedIn.place.name,
		social: [],
		bcEmbeds: [],
		scEmbeds: [],
		bands: []
	});
	getAttending(newEvent);
	acquireBands(newEvent);

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
		if (response && response.next) {
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
	  	if (roles.length === 0) {
	  		//get links from description
	  		getLinksFromDescription(eventPassedIn);

	  	}
	});
}

function addBandToEvent(band, event) {
	for (let i = 0; i < event.bands.length; i++) {
		if (event.bands[i].fbId === band.fbId) {
			return;
		}
	}
	event.bands.push(band);
	event.save(function(err) {
		if (err) {
			console.log(err);
			console.log("failed to save band " + band.fbId + " to event " + event.eventId);
		}
		else {

		}
	});
}

function createNewBand(bandId, event) {
	getWebsite(bandId, event);
}

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
	  		//soundcloud
	  		else if (website && website.indexOf("soundcloud") !== -1)  {
	  			let afterSC = website.split("soundcloud.com/")[1];
	  			website = "https://soundcloud.com/" + afterSC.split(" ")[0];
	  			getsoundcloudEmbed(facebookPageId, website, event);
	  		}
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
					else if (aTags[i].getAttribute("href") && aTags[i].getAttribute("href").indexOf("soundcloud") !== -1) {
						getsoundcloudEmbed(bandId, aTags[i].getAttribute("href"), event);
						return;
					}
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
	let options = {
		url: "https://www.googleapis.com/customsearch/v1?key=" + env.googleKey + "&cx=" + env.googleId + "&q=" + bandName + "+bandcamp",
		headers: {
			"user-agent": "Chrome/51.0.2704.103"
		}
	};
	request(options, function(err, response, body) {
		if (!err && JSON.parse(body).searchInformation.totalResults > 0) {
			body = JSON.parse(body);
			for (let i = 0; i < body.items.length; i++) {
				if (body.items[i].link.indexOf("bandcamp.com")) {
					getbandcampEmbed(bandId, body.items[i].link, event);
					return;
				}
			}
			options = {
				url: "https://www.googleapis.com/customsearch/v1?key=" + env.googleKey + "&cx=" + env.googleId + "&q=" + bandName + "+soundcloud",
				headers: {
					"user-agent": "Chrome/51.0.2704.103"
				}
			};
			request(options, function(error, res, bod) {
				if (!error && JSON.parse(bod).searchInformation.totalResults > 0) {
					bod = JSON.parse(bod);
					for (let i = 0; i < bod.items.length; i++) {
						if (bod.items[i].link.indexOf("soundcloud.com")) {
							getsoundcloudEmbed(bandId, bod.items[i].link, event);
							return;
						}
					}

				}
			});
		}
	});
}
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
					albumId = "album=" + liList[0].getAttribute("data-item-id").split("-")[1];
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

function getProfileImages(event) {
	for (let i = 0; i < event.social.length; i ++) {
		let currentPerson = event.social[i];
		getImage(event, currentPerson);
	}
}

function saveNewBandUpdateEvent(bandId, event, bcEmbed, scEmbed) {
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
					console.log("saved band " + newBand.fbId + " to event " + event.eventId);
				}
			});
		}
		else {
		}
	});
}

function getImage(event, person) {
	request("https://graph.facebook.com/" + person.fbId + "/picture?redirect=0", function(err, res, bod){
		if (!err && JSON.parse(bod).data && JSON.parse(bod).data.url) {
			let pictureUrl = JSON.parse(bod).data.url;
			//find in array
			person.picture = pictureUrl;
			event.save(function(err) {
				if (err) {
					console.log("failed to save image");
					// console.log(err);
				}
				else {

				}
			});
		}
	});
}

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
