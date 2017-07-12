const mongoose = require('mongoose');
var User = require("./models/user");
var Event = require("./models/event");
var Band = require("./models/band");

mongoose.connect('mongodb://localhost/events');

Event.find({}, function(error, docs) {
	if (error) {
		console.log(error); 
	}
	else {
		//for each event
		for (let event = 0; event < docs.length; event++) {
			//for each person
			for (let personIndex = 0; personIndex < docs[event].social.length; personIndex++) {
				//for each person
				for (let index = 0; index < docs[event].social.length; index++) {
					console.log(docs[event].social[personIndex].name + " " + docs[event].social[index].name);
					// if (docs[event].social[personIndex].fbId === docs[event].social[index].fbId) {
					// 	console.log(docs[event].eventName);
					// 	break;
					// }
				}
			}
		}
	}
});