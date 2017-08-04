const mongoose = require('mongoose');
var Event = require("./models/event");
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/events');


Event.find({}).sort('eventTime.start_time').exec(function(eventsFoundError, eventsFound) {
	if (eventsFound && !eventsFoundError) {
		eventsFound.forEach(function(event) {
			console.log(event.eventTime.eventHour + " " + event.eventTime.eventDay + " " + event.eventTime.eventMonth);
		});
	}
	else {
		console.log(eventsFoundError);
	}
});