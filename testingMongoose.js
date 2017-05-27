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
Event.find({}, function(err, found) {
	if (err) {
		return console.log(err); 
	}
	console.log(found);
});
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
  else {
  	User.find({}, function(err, found) {
		if (err) {
			return console.log(err); 
		}
		console.log(found);
	});
  }
});
	let newEvent = new Event({
		eventId: "",
		eventName: "",
		eventOwner: "",
		eventPlace: "",
		eventCategory: "",
		eventDescription: "",
		eventTime: {},
		eventCancelled: false,
		eventVenue: "",
		social: [],
		bcEmbeds: [],
		scEmbeds: [],
		bands: []
	});
	newEvent.save(function(err) {
		if (!err) {
			Event.find({}, function(err, found) {
				if (!err) {
					console.log(found);
				}
				else {
					console.log(err);
				}
			})
		}
	})
